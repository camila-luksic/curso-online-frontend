import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import type { RegisterFormData } from '../types/auth.types';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = useCallback(async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await authApi.register(data);
      setSuccess(true);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return {
    register: handleRegister,
    loading,
    error,
    success,
    clearError: () => setError(null),
  };
}; 