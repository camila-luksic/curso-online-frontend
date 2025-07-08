import type { Usuario } from '@/features/auth/types/usuario.types';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { apiInstance } from '../core/api/instance.api';
import { AbilityProvider } from '../core/context/AbilityContext';
import { defineAbilityFor } from '../core/permissions/ability';


interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshProfile = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await apiInstance.get<Usuario>('/usuarios/me');
            setUsuario(data);
            console.log('Usuario autenticado:', data);
        } catch {
            setUsuario(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(
        async (email: string, password: string) => {
            await apiInstance.post('/auth/login', { email, password });
            await refreshProfile();
        },
        [refreshProfile]
    );

    const logout = useCallback(async () => {
        try {
            await apiInstance.post('/auth/logout');
            setUsuario(null);
        } catch (error) {
            console.error('Error durante el logout:', error);
            setUsuario(null);
        }
    }, []);

    useEffect(() => {
        refreshProfile();
    }, [refreshProfile]);

    // Crear ability basado en el usuario actual
    const ability = useMemo(() => defineAbilityFor(usuario), [usuario]);

    const value = {
        usuario,
        isAuthenticated: Boolean(usuario),
        loading,
        login,
        logout,
        refreshProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            <AbilityProvider ability={ability}>
                {children}
            </AbilityProvider>
        </AuthContext.Provider>
    );
};
