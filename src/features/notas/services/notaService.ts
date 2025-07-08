import { apiInstance } from '@/core/api/instance.api';
import type { CreateNotaInput, Nota, NotasResponse } from '../types/notaTypes';

export const getNotas = async (inscripcionId: number): Promise<NotasResponse> => {
  const { data } = await apiInstance.get<NotasResponse>(`/inscripciones/${inscripcionId}/notas`);
  return data;
};

export const asignarNota = async (inscripcionId: number, input: CreateNotaInput): Promise<Nota> => {
  const { data } = await apiInstance.post<Nota>(`/inscripciones/${inscripcionId}/notas`, input);
  return data;
}; 