import { ErrorMessage } from '@/core/components/ui/ErrorMessage';
import { useAbility } from '@/core/context/AbilityContext';
import { subject } from '@casl/ability';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMisCursos } from '../../enrollments/hooks/useMisCursos';
import type { Inscripcion } from '../../enrollments/types/inscripcionTypes';
import { CursoCard } from '../components/CursoCard';
import type { CursoFormValues } from '../components/CursoForm';
import { CursoModal } from '../components/CursoModal';
import { useCreateCurso } from '../hooks/useCreateCurso';
import { useCursos } from '../hooks/useCursos';
import { useDeleteCurso } from '../hooks/useDeleteCurso';
import { useUpdateCurso } from '../hooks/useUpdateCurso';
import type { Curso } from '../types/cursoTypes';

function flattenCurso(curso: Curso) {
    return { ...curso, profesorId: curso.profesorId ?? curso.profesor?.id };
}

export default function CursoListPage({ onlyMyCourses = false }: { onlyMyCourses?: boolean }) {
    const { data: cursosRaw = [], isLoading } = onlyMyCourses
        ? useMisCursos()
        : useCursos();
    const createCurso = useCreateCurso();
    const updateCurso = useUpdateCurso();
    const deleteCurso = useDeleteCurso();
    const navigate = useNavigate();
    const ability = useAbility();

    let cursosFiltrados: Curso[] = [];
    if (onlyMyCourses) {
        cursosFiltrados = (cursosRaw as Inscripcion[]).map(insc => ({
            ...insc.curso,
            imagenUrl: insc.curso.imagenUrl ?? '',
            categoria: { id: insc.curso.categoriaId, nombre: '' },
            profesor: { id: insc.curso.profesorId, nombre: '', apellido: '' },
        }));
    } else {
        cursosFiltrados = (cursosRaw as Curso[]).filter((c: Curso) => ability.can('read', subject('Curso', flattenCurso(c) as any)));
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [editCurso, setEditCurso] = useState<Curso | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = (data: CursoFormValues) => {
        createCurso.mutate(data, { onSuccess: () => setModalOpen(false) });
    };

    const handleEdit = (data: CursoFormValues) => {
        if (editCurso) {
            updateCurso.mutate({ id: editCurso.id, input: data }, { onSuccess: () => setEditCurso(null) });
        }
    };

    const handleDelete = (curso: Curso) => {
        if (window.confirm(`¿Eliminar el curso "${curso.titulo}"?`)) {
            deleteCurso.mutate(curso.id, {
                onError: (err: any) => {
                    const msg = err?.response?.data?.error || err.message || '';
                    if (msg.includes('llave foránea') || msg.includes('foreign key')) {
                        setError('No se puede borrar este curso porque tiene inscripciones asociadas.');
                    } else {
                        setError('No se pudo borrar el curso. Intenta nuevamente.');
                    }
                },
                onSuccess: () => {
                    setError(null);
                }
            });
        }
    };

    const handleView = (curso: Curso) => {
        navigate(`/cursos/${curso.id}`);
    };

    return (
        <div className="max-w-6xl mx-auto py-8">
            {error && (
                <div className="mb-4">
                    <ErrorMessage message={error} />
                </div>
            )}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Cursos</h1>
                {ability.can('create', 'Curso') && !onlyMyCourses && (
                    <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                        + Nuevo Curso
                    </button>
                )}
            </div>
            {isLoading ? (
                <div>Cargando cursos...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {cursosFiltrados.map((curso: Curso) => (
                        <CursoCard
                            key={curso.id}
                            curso={curso}
                            onEdit={ability.can('update', subject('Curso', flattenCurso(curso) as any)) ? () => setEditCurso(curso) : undefined}
                            onDelete={ability.can('delete', subject('Curso', flattenCurso(curso) as any)) ? () => handleDelete(curso) : undefined}
                            onView={() => handleView(curso)}
                        />
                    ))}
                </div>
            )}
            {/* Modal para crear */}
            {!onlyMyCourses && (
                <CursoModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleCreate}
                    loading={createCurso.isPending}
                    title="Nuevo Curso"
                />
            )}
            {/* Modal para editar */}
            <CursoModal
                open={!!editCurso}
                onClose={() => setEditCurso(null)}
                onSubmit={handleEdit}
                loading={updateCurso.isPending}
                initialValues={editCurso ?? undefined}
                title="Editar Curso"
            />
        </div>
    );
} 