import api from './axios';
import type {
  Role,
  CreateRoleDto,
  UpdateRoleDto,
  RolePermission,
  AssignPermissionsDto,
} from '@/lib/types';

export const rolesApi = {
  getAll: async (): Promise<Role[]> => {
    const res = await api.get('/roles');
    return res.data;
  },

  getById: async (id: string): Promise<Role> => {
    const res = await api.get(`/roles/${id}`);
    return res.data;
  },

  create: async (dto: CreateRoleDto): Promise<Role> => {
    const res = await api.post('/roles', dto);
    return res.data;
  },

  update: async (id: string, dto: UpdateRoleDto): Promise<Role> => {
    const res = await api.patch(`/roles/${id}`, dto);
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/roles/${id}`);
  },

  assignPermissions: async (
    roleId: string,
    dto: AssignPermissionsDto,
  ): Promise<RolePermission[]> => {
    const res = await api.post(`/roles/${roleId}/permissions`, dto);
    return res.data;
  },

  revokePermission: async (roleId: string, permissionId: string): Promise<void> => {
    await api.delete(`/roles/${roleId}/permissions/${permissionId}`);
  },
};
