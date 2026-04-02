import { create } from 'zustand';
import { rolesApi } from '@/lib/api/roles';
import { permissionsApi } from '@/lib/api/permissions';
import type { Role, Permission, CreateRoleDto, UpdateRoleDto } from '@/lib/types';

interface RolesState {
  roles: Role[];
  allPermissions: Permission[];
  isLoading: boolean;
  error: string | null;

  fetchRoles: () => Promise<void>;
  fetchAllPermissions: () => Promise<void>;
  createRole: (dto: CreateRoleDto) => Promise<void>;
  updateRole: (id: string, dto: UpdateRoleDto) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
  syncPermissions: (roleId: string, selectedIds: string[]) => Promise<void>;
}

export const useRolesStore = create<RolesState>((set, get) => ({
  roles: [],
  allPermissions: [],
  isLoading: false,
  error: null,

  fetchRoles: async () => {
    set({ isLoading: true, error: null });
    try {
      const roles = await rolesApi.getAll();
      set({ roles });
    } catch {
      set({ error: 'Failed to load roles' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAllPermissions: async () => {
    try {
      const allPermissions = await permissionsApi.getAll();
      set({ allPermissions });
    } catch {
      // silently fail — not critical to roles loading
    }
  },

  createRole: async (dto) => {
    const created = await rolesApi.create(dto);
    set((state) => ({ roles: [...state.roles, created] }));
  },

  updateRole: async (id, dto) => {
    const updated = await rolesApi.update(id, dto);
    set((state) => ({
      roles: state.roles.map((r) => (r.id === id ? updated : r)),
    }));
  },

  deleteRole: async (id) => {
    await rolesApi.remove(id);
    set((state) => ({ roles: state.roles.filter((r) => r.id !== id) }));
  },

  /**
   * Diff the current assigned permissions against the desired set,
   * then assign additions and revoke removals in parallel.
   */
  syncPermissions: async (roleId, selectedIds) => {
    const role = get().roles.find((r) => r.id === roleId);
    if (!role) return;

    const currentIds = role.rolePermissions.map((rp) => rp.permission.id);
    const toAdd = selectedIds.filter((id) => !currentIds.includes(id));
    const toRemove = currentIds.filter((id) => !selectedIds.includes(id));

    await Promise.all([
      toAdd.length ? rolesApi.assignPermissions(roleId, { permissionIds: toAdd }) : Promise.resolve(),
      ...toRemove.map((pid) => rolesApi.revokePermission(roleId, pid)),
    ]);

    // Re-fetch this role to get the updated rolePermissions list
    const updated = await rolesApi.getById(roleId);
    set((state) => ({
      roles: state.roles.map((r) => (r.id === roleId ? updated : r)),
    }));
  },
}));
