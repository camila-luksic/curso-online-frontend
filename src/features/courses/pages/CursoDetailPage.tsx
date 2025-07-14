import { useAuth } from '@/core/hooks/useAuth';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAbility } from '../../../core/context/AbilityContext';
import { subject } from '../../../core/permissions/ability';
import { getCursoImageUrl } from '../../../core/utils/image';
import { InscribirseButton } from '../../enrollments/components/InscribirseButton';
import { useMisCursos } from '../../enrollments/hooks/useMisCursos';
import { BarraProgresoCurso } from '../../progreso/components/BarraProgresoCurso';
import { VideoListForCourse } from '../../videos/components/VideoListForCourse';
import { CommentsSection } from '../../comments/components/CommentsSection';
import CursoImageUploadForm from '../components/CursoImageUploadForm';
import { useCurso } from '../hooks/useCurso';

export default function CursoDetailPage() {
    const { id } = useParams<{ id: string }>();
    const cursoId = Number(id);
    const { data: curso, isLoading, refetch } = useCurso(cursoId);
    const navigate = useNavigate();
    const ability = useAbility();
    const [showUpload, setShowUpload] = useState(false);
    const { usuario } = useAuth();

    // Saber si el usuario está inscrito en este curso
    const { data: misCursos, isLoading: isLoadingMisCursos, refetch: refetchMisCursos } = useMisCursos();
    const estaInscrito = useMemo(
        () => !!misCursos?.some(insc => insc.cursoId === cursoId),
        [misCursos, cursoId]
    );

    if (isLoading || isLoadingMisCursos) return <div>Cargando...</div>;
    if (!curso) return <div>No se encontró el curso.</div>;

    // CASL: instancia aplanada para checks
    const cursoCASL = { ...curso, profesorId: curso.profesorId ?? curso.profesor?.id };
    const puedeSubirImagen = ability.can('upload', subject('Curso', cursoCASL as any));
    const puedeEditar = ability.can('update', subject('Curso', cursoCASL as any));
    const puedeEliminar = ability.can('delete', subject('Curso', cursoCASL as any));
    const puedeInscribirse = ability.can('enroll', subject('Curso', cursoCASL as any));
    const puedeGestionarVideos = estaInscrito || puedeEditar;
    const puedeGestionarNotas = ability.can('manage', subject('Nota', { curso: cursoCASL } as any));

    console.log('Usuario actual:', usuario);
    console.log('Puede inscribirse:', puedeInscribirse);
    console.log('Ability rules:', ability.rules);
    console.log('cursoCASL:', cursoCASL);
    console.log('usuario:', usuario);
    console.log('puedeGestionarNotas:', puedeGestionarNotas);

    return (
        <div className="max-w-4xl mx-auto py-8">
            <button className="btn btn-accent mb-4" onClick={() => navigate(-1)}>
                ← Volver
            </button>
            {/* Botón para gestionar notas, solo para profes/admins */}
            {puedeGestionarNotas && (
                <button
                    className="btn btn-info mb-4 ml-2"
                    onClick={() => navigate(`/cursos/${curso.id}/gestion-notas`)}
                >
                    Gestionar notas
                </button>
            )}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <img
                    src={getCursoImageUrl(curso.imagenUrl)}
                    alt={curso.titulo}
                    className="w-64 h-64 object-cover rounded shadow"
                />
                {puedeSubirImagen && (
                    <div className="mt-2 flex flex-col gap-2 items-start">
                        {!showUpload ? (
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowUpload(true)}
                            >
                                {curso.imagenUrl ? 'Cambiar imagen' : 'Subir imagen'}
                            </button>
                        ) : (
                            <CursoImageUploadForm
                                cursoId={curso.id}
                                imagenActual={getCursoImageUrl(curso.imagenUrl)}
                                onUploaded={() => {
                                    refetch();
                                    setShowUpload(false);
                                }}
                            />
                        )}
                    </div>
                )}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{curso.titulo}</h1>
                    <div className="text-neutral-500 mb-2">Categoría: {curso.categoria.nombre}</div>
                    <div className="text-neutral-500 mb-2">Profesor: {curso.profesor.nombre} {curso.profesor.apellido}</div>
                    <p className="mb-4">{curso.descripcion}</p>
                    {/* Barra de progreso solo para estudiantes inscritos */}
                    {estaInscrito && <BarraProgresoCurso cursoId={curso.id} />}
                    <div className="flex gap-2 mt-2">
                        {puedeEditar && (
                            <button className="btn btn-primary" onClick={() => {/* lógica de editar */ }}>Editar</button>
                        )}
                        {puedeEliminar && (
                            <button className="btn btn-danger" onClick={() => {/* lógica de eliminar */ }}>Eliminar</button>
                        )}
                    </div>
                    {/* Botón de inscripción para estudiantes no inscritos y con permiso CASL */}
                    {!estaInscrito && puedeInscribirse && (
                        <div className="mt-4">
                            <InscribirseButton cursoId={cursoId} onSuccess={() => refetchMisCursos()} />
                        </div>
                    )}
                </div>
            </div>
            {/* Lista de videos: inscrito o con permiso de gestión */}
            {puedeGestionarVideos ? (
                <VideoListForCourse cursoId={curso.id} />
            ) : (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-yellow-700 font-semibold">Debes inscribirte en el curso para acceder a los videos.</p>
                </div>
            )}

            {/* Sección de comentarios */}
            <div className="mt-12">
                <CommentsSection cursoId={curso.id} />
            </div>
        </div>
    );
} 