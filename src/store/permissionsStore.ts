import { create } from 'zustand';
import { permissionsApi } from '@/lib/api/permissions';
import type { Permission, CreatePermissionDto, UpdatePermissionDto } from '@/lib/types';

interface PermissionsState {
  permissions: Permission[];
  isLoading: boolean;
  error: string | null;

  fetchPermissions: () => Promise<void>;
  createPermission: (dto: CreatePermissionDto) => Promise<void>;
  updatePermission: (id: string, dto: UpdatePermissionDto) => Promise<void>;
  deletePermission: (id: string) => Promise<void>;
}

export const usePermissionsStore = create<PermissionsState>((set) => ({
  permissions: [],
  isLoading: false,
  error: null,

  fetchPermissions: async () => {
    set({ isLoading: true, error: null });
    try {
      const permissions = await permissionsApi.getAll();
      set({ permissions });
    } catch {
      set({ error: 'Failed to load permissions' });
    } finally {
      set({ isLoading: false });
    }
  },

  createPermission: async (dto) => {
    const created = await permissionsApi.create(dto);
    set((state) => ({ permissions: [...state.permissions, created] }));
  },

  updatePermission: async (id, dto) => {
    const updated = await permissionsApi.update(id, dto);
    set((state) => ({
      permissions: state.permissions.map((p) => (p.id === id ? updated : p)),
    }));
  },

  deletePermission: async (id) => {
    await permissionsApi.remove(id);
    set((state) => ({
      permissions: state.permissions.filter((p) => p.id !== id),
    }));
  },
}));
