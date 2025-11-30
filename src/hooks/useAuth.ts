import type UserInterface from '@/types/UserInterface';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: UserInterface | null;
  token: string | null;
  isInitialized: boolean;
  setUser: (user: UserInterface | null) => void;
  setToken: (token: string | null) => void;
  login: (user: UserInterface, token: string) => void;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isInitialized: false,
      setUser: (user): void => set({ user }),
      setToken: (token): void => set({ token }),
      login: (user, token): void => {
        set({ user, token });
        // Сохраняем токен в localStorage для совместимости
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('accessToken', token);
        }
      },
      logout: async (): Promise<void> => {
        try {
          await fetch('/api/auth/logout', {
            method: 'POST',
          });
        }
        catch (error) {
          console.error('Logout error:', error);
        }
        finally {
          set({ user: null, token: null });
          if (typeof window !== 'undefined') {
            window.localStorage.removeItem('accessToken');
          }
        }
      },
      initialize: async (): Promise<void> => {
        if (get().isInitialized) {
          return;
        }

        set({ isInitialized: true });

        try {
          // Сначала проверяем токен из zustand store
          let tokenToCheck = get().token;

          // Если токена нет в store, проверяем localStorage для обратной совместимости
          if (!tokenToCheck && typeof window !== 'undefined') {
            tokenToCheck = window.localStorage.getItem('accessToken');
            if (tokenToCheck) {
              set({ token: tokenToCheck });
            }
          }

          if (!tokenToCheck) {
            return;
          }

          // Проверяем токен на сервере
          const response = await fetch('/api/auth/me', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${tokenToCheck}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
              token: tokenToCheck,
            });
          }
          else {
            // Токен невалиден, очищаем
            set({ user: null, token: null });
            if (typeof window !== 'undefined') {
              window.localStorage.removeItem('accessToken');
            }
          }
        }
        catch (error) {
          console.error('Auth initialization error:', error);
          set({ user: null, token: null });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        // isInitialized не сохраняем, чтобы он сбрасывался при каждой загрузке
      }),
    },
  ),
);