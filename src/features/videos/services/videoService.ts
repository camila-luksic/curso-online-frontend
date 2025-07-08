import { apiInstance } from '@/core/api/instance.api';
import type { CreateVideoInput, UpdateVideoInput, Video } from '../types/videoTypes';

export async function getVideosByCurso(cursoId: number): Promise<Video[]> {
  const { data } = await apiInstance.get(`/cursos/${cursoId}/videos`);
  return data;
}

export async function createVideo(cursoId: number, input: CreateVideoInput): Promise<Video> {
  const { data } = await apiInstance.post(`/cursos/${cursoId}/videos`, input);
  return data;
}

export async function updateVideo(id: number, input: UpdateVideoInput): Promise<Video> {
  const { data } = await apiInstance.patch(`/videos/${id}`, input);
  return data;
}

export async function deleteVideo(id: number): Promise<void> {
  await apiInstance.delete(`/videos/${id}`);
}

export async function updateVideosOrder(cursoId: number, ordenes: { id: number, orden: number }[]): Promise<void> {
  await apiInstance.patch(`/cursos/${cursoId}/videos/orden`, { ordenes });
} 