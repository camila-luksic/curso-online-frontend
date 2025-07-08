import { apiInstance } from '../../../core/api/instance.api';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/auth.types';

export const authApi = {
  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiInstance.post('/auth/login', credentials);
    return data;
  },

  // Register
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const { data } = await apiInstance.post('/auth/register', userData);
    return data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await apiInstance.post('/auth/logout');
  },

  // Get current user
  getCurrentUser: async (): Promise<LoginResponse> => {
    const { data } = await apiInstance.get('/auth/me');
    return data;
  },
};