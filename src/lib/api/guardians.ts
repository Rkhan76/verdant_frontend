import api from './axios';

export interface Guardian {
  id: string;
  name: string;
  phone: string | null;
}

export const guardiansApi = {
  searchGuardians: async (search?: string): Promise<Guardian[]> => {
    const params = new URLSearchParams();
    if (search) {
      params.append('search', search);
    }
    const response = await api.get<Guardian[]>(
      `/guardians${params.toString() ? `?${params.toString()}` : ''}`,
    );
    return response.data;
  },
};
