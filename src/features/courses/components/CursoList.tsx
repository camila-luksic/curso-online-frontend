import type { Curso } from '../types/cursoTypes';
import { CursoCard } from './CursoCard';

interface CursoListProps {
    cursos: Curso[];
    onEdit?: (curso: Curso) => void;
    onDelete?: (curso: Curso) => void;
    onView?: (curso: Curso) => void;
}

export function CursoList({ cursos, onEdit, onDelete, onView }: CursoListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cursos.map(curso => (
                <CursoCard
                    key={curso.id}
                    curso={curso}
                    onEdit={onEdit ? () => onEdit(curso) : undefined}
                    onDelete={onDelete ? () => onDelete(curso) : undefined}
                    onView={onView ? () => onView(curso) : undefined}
                />
            ))}
        </div>
    );
} 