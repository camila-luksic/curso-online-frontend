// Types para inscripciones de cursos

export interface Inscripcion {
  id: number;
  estudianteId: number;
  cursoId: number;
  fechaInscripcion: string;
  createdAt: string;
  updatedAt: string;
  estudiante: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
  };
  curso: {
    id: number;
    titulo: string;
    descripcion: string;
    imagenUrl: string | null;
    categoriaId: number;
    createdAt: string;
    updatedAt: string;
    profesorId: number;
  };
}

// No se requiere input para crear inscripción, solo el endpoint y el token
// El cursoId se envía en la URL, el estudianteId se toma del token

export interface InscripcionCreateResponse extends Inscripcion {}
export type InscripcionListResponse = Inscripcion[];
export type MisCursosResponse = Inscripcion[]; 