import { ErrorMessage } from '@/core/components/ui/ErrorMessage';
import { LoadingSpinner } from '@/core/components/ui/LoadingSpinner';
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

    const getPageTitle = () => {
        return onlyMyCourses ? 'Mis Cursos' : 'Cursos';
    };

    const getEmptyStateMessage = () => {
        if (onlyMyCourses) {
            return {
                title: 'No estás inscrito en ningún curso',
                description: 'Explora los cursos disponibles e inscríbete para comenzar a aprender.',
                action: {
                    text: 'Ver todos los cursos',
                    onClick: () => navigate('/estudiantes/cursos')
                }
            };
        } else {
            return {
                title: 'No hay cursos disponibles',
                description: 'Aún no se han creado cursos en la plataforma.',
                action: null
            };
        }
    };

    const emptyState = getEmptyStateMessage();

    return (
        <div className="max-w-6xl mx-auto py-8">
            {error && (
                <div className="mb-4">
                    <ErrorMessage message={error} />
                </div>
            )}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
                {ability.can('create', 'Curso') && !onlyMyCourses && (
                    <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                        + Nuevo Curso
                    </button>
                )}
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <LoadingSpinner text="Cargando cursos..." />
                </div>
            ) : cursosFiltrados.length === 0 ? (
                <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {emptyState.title}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {emptyState.description}
                        </p>
                        {emptyState.action && (
                            <button
                                onClick={emptyState.action.onClick}
                                className="btn btn-primary"
                            >
                                {emptyState.action.text}
                            </button>
                        )}
                    </div>
                </div>
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