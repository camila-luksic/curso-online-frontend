import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '../../../core/hooks/useNotifications';
import type { LoginFormData } from '../types/auth.types';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, usuario } = useAuth();
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const handleLogin = useCallback(async (credentials: LoginFormData) => {
    setLoading(true);
    setError(null);
    try {
      await login(credentials.email, credentials.password);
      setShouldRedirect(true);
      setError(null);
      showSuccess('¡Inicio de sesión exitoso!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Error al iniciar sesión';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [login, showSuccess, showError]);

  useEffect(() => {
    if (shouldRedirect && usuario) {
      switch (usuario.rol.codigo) {
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'PROF':
          navigate('/profesor/dashboard');
          break;
        case 'EST':
          navigate('/estudiantes/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
      setShouldRedirect(false);
    }
  }, [shouldRedirect, usuario, navigate]);

  return {
    login: handleLogin,
    loading,
    error,
    clearError: () => setError(null),
  };
}; 