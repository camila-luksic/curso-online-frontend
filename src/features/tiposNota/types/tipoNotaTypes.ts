export interface TipoNota {
  id: number;
  nombre: string;
  cursoId: number;
}

export interface CreateTipoNotaInput {
  nombre: string;
}

export type TiposNotaResponse = TipoNota[]; 