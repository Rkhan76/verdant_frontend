import api from './axios';
import type { MemberUser, CreateMemberDto, UpdateMemberDto, UserStatus } from '@/lib/types';

export const membersApi = {
  getAll: async (role?: 'SUPERADMIN' | 'ADMIN'): Promise<MemberUser[]> => {
    const res = await api.get('/users/members', { params: role ? { role } : undefined });
    return res.data;
  },

  create: async (dto: CreateMemberDto): Promise<MemberUser> => {
    const res = await api.post('/users/members', dto);
    return res.data;
  },

  update: async (id: string, dto: UpdateMemberDto): Promise<MemberUser> => {
    const res = await api.patch(`/users/members/${id}`, dto);
    return res.data;
  },

  updateStatus: async (id: string, status: UserStatus): Promise<MemberUser> => {
    const res = await api.patch(`/users/members/${id}/status`, { status });
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/users/members/${id}`);
  },
};
