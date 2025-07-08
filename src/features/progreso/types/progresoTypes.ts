export interface ProgresoCurso {
  total: number;
  vistos: number;
  porcentaje: number;
}

export interface ProgresoVideo {
  usuarioId: number;
  videoId: number;
  visto: boolean;
} 