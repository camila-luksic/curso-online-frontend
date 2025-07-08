import { apiInstance } from '@/core/api/instance.api';
import type { CreateCursoInput, Curso, UpdateCursoInput } from '../types/cursoTypes';

export async function getCursos(): Promise<Curso[]> {
  const { data } = await apiInstance.get('/cursos');
  return data;
}

export async function getCurso(id: number): Promise<Curso> {
  const { data } = await apiInstance.get(`/cursos/${id}`);
  return data;
}

export async function createCurso(input: CreateCursoInput): Promise<Curso> {
  const { data } = await apiInstance.post('/cursos', input);
  return data;
}

export async function updateCurso(id: number, input: UpdateCursoInput): Promise<Curso> {
  const { data } = await apiInstance.patch(`/cursos/${id}`, input);
  return data;
}

export async function deleteCurso(id: number): Promise<void> {
  await apiInstance.delete(`/cursos/${id}`);
}

export async function uploadCursoImagen(id: number, imagen: File): Promise<string> {
  const formData = new FormData();
  formData.append('imagen', imagen);
  const { data } = await apiInstance.post(`/cursos/${id}/imagen`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.imagenUrl;
} 