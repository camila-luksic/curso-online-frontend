export interface Nota {
  id: number;
  valor: number;
  tipoNota: {
    id: number;
    nombre: string;
  };
}

export interface CreateNotaInput {
  tipoNotaId: number;
  valor: number;
}

export type NotasResponse = Nota[]; 