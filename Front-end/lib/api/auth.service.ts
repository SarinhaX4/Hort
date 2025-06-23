// HORTI--ei-main/lib/api/auth.service.ts
import api from './axios';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface UserProfile {
  userId: number;
  username: string;
  role: string;
}

const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', payload);
    // Salvar o token no localStorage ou em um context global (melhor prática)
    localStorage.setItem('access_token', response.data.access_token);
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<any> => {
    const response = await api.post('/usuario', payload); // A rota de criação de usuário está em /usuario
    return response.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No access token found.');
    }
    const response = await api.get<UserProfile>('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    // Redirecionar para página de login
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('access_token');
  },
};

export default authService;