import api from './axios';
import type { Permission, CreatePermissionDto, UpdatePermissionDto } from '@/lib/types';

export const permissionsApi = {
  getAll: async (): Promise<Permission[]> => {
    const res = await api.get('/permissions');
    return res.data;
  },

  getById: async (id: string): Promise<Permission> => {
    const res = await api.get(`/permissions/${id}`);
    return res.data;
  },

  create: async (dto: CreatePermissionDto): Promise<Permission> => {
    const res = await api.post('/permissions', dto);
    return res.data;
  },

  update: async (id: string, dto: UpdatePermissionDto): Promise<Permission> => {
    const res = await api.patch(`/permissions/${id}`, dto);
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/permissions/${id}`);
  },
};
