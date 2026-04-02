import { create } from 'zustand';
import { membersApi } from '@/lib/api/members';
import type { MemberUser, CreateMemberDto, UpdateMemberDto, UserStatus } from '@/lib/types';

interface MembersState {
  members: MemberUser[];
  isLoading: boolean;
  error: string | null;

  fetchMembers: (role?: 'SUPERADMIN' | 'ADMIN') => Promise<void>;
  createMember: (dto: CreateMemberDto) => Promise<void>;
  updateMember: (id: string, dto: UpdateMemberDto) => Promise<void>;
  updateMemberStatus: (id: string, status: UserStatus) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
}

export const useMembersStore = create<MembersState>((set) => ({
  members: [],
  isLoading: false,
  error: null,

  fetchMembers: async (role) => {
    set({ isLoading: true, error: null });
    try {
      const members = await membersApi.getAll(role);
      set({ members });
    } catch {
      set({ error: 'Failed to load members' });
    } finally {
      set({ isLoading: false });
    }
  },

  createMember: async (dto) => {
    const created = await membersApi.create(dto);
    set((state) => ({ members: [created, ...state.members] }));
  },

  updateMember: async (id, dto) => {
    const updated = await membersApi.update(id, dto);
    set((state) => ({
      members: state.members.map((m) => (m.id === id ? updated : m)),
    }));
  },

  updateMemberStatus: async (id, status) => {
    const updated = await membersApi.updateStatus(id, status);
    set((state) => ({
      members: state.members.map((m) => (m.id === id ? updated : m)),
    }));
  },

  deleteMember: async (id) => {
    await membersApi.remove(id);
    set((state) => ({ members: state.members.filter((m) => m.id !== id) }));
  },
}));
