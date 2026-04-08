import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserEntity } from '@/lib/types';

interface AuthState {
  user: UserEntity | null;
  accessToken: string | null;
  refreshToken: string | null;
  deviceToken: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  
  // MFA related temporary state
  mfaToken: string | null;
  setupToken: string | null;
  
  setAuth: (data: { user: UserEntity; accessToken: string; refreshToken: string; deviceToken?: string }) => void;
  setMfaToken: (token: string) => void;
  setSetupToken: (token: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setDeviceToken: (token: string) => void;
  setHasHydrated: (hydrated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      deviceToken: typeof window !== 'undefined' ? localStorage.getItem('deviceToken') : null,
      isAuthenticated: false,
      hasHydrated: false,
      mfaToken: null,
      setupToken: null,

      setAuth: (data) => set({ 
        user: data.user, 
        accessToken: data.accessToken, 
        refreshToken: data.refreshToken, 
        deviceToken: data.deviceToken || null,
        isAuthenticated: true,
        mfaToken: null,
        setupToken: null
      }),

      setMfaToken: (token) => set({ mfaToken: token }),
      
      setSetupToken: (token) => set({ setupToken: token }),

      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken, isAuthenticated: true }),

      setDeviceToken: (token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('deviceToken', token);
        }
        set({ deviceToken: token });
      },

      setHasHydrated: (hasHydrated) => set({ hasHydrated }),

      logout: () => {
        if (typeof window !== 'undefined') {
          // We keep deviceToken for MFA bypass on next login
          // but clear sensitive tokens
        }
        set({ 
          user: null, 
          accessToken: null, 
          refreshToken: null, 
          isAuthenticated: false,
          hasHydrated: true,
          mfaToken: null,
          setupToken: null
        });
      },
    }),
    {
      name: 'verdant-auth',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({ 
        user: state.user, 
        accessToken: state.accessToken, 
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);
