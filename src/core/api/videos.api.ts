import type {
  CreateVideoInput,
  UpdateVideoInput,
  Video,
} from '../types/video.types';
import { apiInstance } from './instance.api';

// Listar videos de un curso
export const getVideosByCourse = async (cursoId: number): Promise<Video[]> =>
  (await apiInstance.get<Video[]>(`/cursos/${cursoId}/videos`)).data;

// Ver un video específico
export const getVideo = async (id: number): Promise<Video> =>
  (await apiInstance.get<Video>(`/videos/${id}`)).data;

// Agregar un video a un curso
export const createVideo = async (
  cursoId: number,
  payload: CreateVideoInput,
): Promise<Video> =>
  (await apiInstance.post<Video>(`/cursos/${cursoId}/videos`, payload)).data;

// Actualizar un video
export const updateVideo = async (
  id: number,
  payload: UpdateVideoInput,
): Promise<Video> =>
  (await apiInstance.patch<Video>(`/videos/${id}`, payload)).data;

// Eliminar un video
export const deleteVideo = async (id: number): Promise<void> => {
  await apiInstance.delete(`/videos/${id}`);
}; 