import { create } from 'zustand';
import { authAPI } from '../infrastructure/api';

// Interfaz ajustada a la nueva respuesta del backend
export interface User {
  username: string;
  role: string; // Ejemplo: "Administrador"
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkSession: () => void; // Ahora es síncrona, no requiere un llamado async
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      // 1. Obtenemos la respuesta completa con tokens y datos del usuario
      const data = await authAPI.login(username, password);

      // 2. Guardamos los tokens en sessionStorage
      sessionStorage.setItem('access_token', data.access_token);
      sessionStorage.setItem('refresh_token', data.refresh_token);

      // 3. Estructuramos los datos del usuario y los guardamos en sessionStorage como texto JSON
      const userData: User = {
        username: data.username,
        role: data.role
      };
      sessionStorage.setItem('user_data', JSON.stringify(userData));

      // 4. Actualizamos el estado global de React
      set({ user: userData, isLoading: false });

    } catch (err: any) {
      console.error(err);
      set({ 
        error: err.response?.data?.detail || "Error al iniciar sesión. Revisa tus credenciales.", 
        isLoading: false 
      });
    }
  },

  logout: () => {
    // Limpieza completa del sessionStorage
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user_data');
    set({ user: null, error: null });
    window.location.href = '/login';
  },

  checkSession: () => {
    const token = sessionStorage.getItem('access_token');
    const storedUser = sessionStorage.getItem('user_data');

    // Si ambos existen en la pestaña actual, restauramos el estado sin consultar a la API
    if (token && storedUser) {
      try {
        set({ user: JSON.parse(storedUser) });
      } catch (e) {
        // En caso de un JSON corrupto, limpiamos la sesión
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('user_data');
        set({ user: null });
      }
    } else {
      set({ user: null });
    }
  }
}));