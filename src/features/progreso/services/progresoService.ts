import { apiInstance } from '@/core/api/instance.api';
import type { ProgresoCurso, ProgresoVideo } from '../types/progresoTypes';

export const marcarVideoVisto = async (videoId: number): Promise<ProgresoVideo> => {
  const { data } = await apiInstance.post<ProgresoVideo>(`/videos/${videoId}/visto`);
  return data;
};

export const getProgresoCurso = async (cursoId: number): Promise<ProgresoCurso> => {
  const { data } = await apiInstance.get<ProgresoCurso>(`/cursos/${cursoId}/progreso`);
  return data;
}; 