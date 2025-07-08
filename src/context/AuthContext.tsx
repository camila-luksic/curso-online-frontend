import type { Usuario } from '@/features/auth/types/usuario.types';
import { createContext } from 'react';

export interface AuthContextState {
    usuario: Usuario | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>(
    {} as AuthContextState
);
