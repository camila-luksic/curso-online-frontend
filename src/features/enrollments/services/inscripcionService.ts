import type { Inscripcion, InscripcionCreateResponse, InscripcionListResponse, MisCursosResponse } from '../types/inscripcionTypes';
import { apiInstance } from '@/core/api/instance.api';

// Inscribirse en un curso
export const inscribirseEnCurso = async (cursoId: number): Promise<InscripcionCreateResponse> => {
  const { data } = await apiInstance.post<InscripcionCreateResponse>(`/cursos/${cursoId}/inscripcion`);
  return data;
};

// Listar inscripciones de un curso (admin/profesor)
export const getInscripcionesDeCurso = async (cursoId: number): Promise<InscripcionListResponse> => {
  const { data } = await apiInstance.get<InscripcionListResponse>(`/cursos/${cursoId}/inscripciones`);
  return data;
};

// Ver los cursos en los que estoy inscrito (estudiante)
export const getMisCursos = async (): Promise<MisCursosResponse> => {
  const { data } = await apiInstance.get<MisCursosResponse>(`/mis-cursos`);
  return data;
};

// Ver una inscripción específica
export const getInscripcion = async (id: number): Promise<Inscripcion> => {
  const { data } = await apiInstance.get<Inscripcion>(`/inscripciones/${id}`);
  return data;
};

// Cancelar una inscripción
export const cancelarInscripcion = async (id: number): Promise<{ message: string }> => {
  const { data } = await apiInstance.delete<{ message: string }>(`/inscripciones/${id}`);
  return data;
}; 