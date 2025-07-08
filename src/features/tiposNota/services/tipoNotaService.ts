import { apiInstance } from '@/core/api/instance.api';
import type { CreateTipoNotaInput, TipoNota, TiposNotaResponse } from '../types/tipoNotaTypes';

export const getTiposNota = async (cursoId: number): Promise<TiposNotaResponse> => {
  const { data } = await apiInstance.get<TiposNotaResponse>(`/cursos/${cursoId}/tipos-nota`);
  return data;
};

export const createTipoNota = async (cursoId: number, input: CreateTipoNotaInput): Promise<TipoNota> => {
  const { data } = await apiInstance.post<TipoNota>(`/cursos/${cursoId}/tipos-nota`, input);
  return data;
}; 