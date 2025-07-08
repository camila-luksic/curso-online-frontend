import { getCursoImageUrl } from '@/core/utils/image';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurso } from '../../courses/hooks/useCurso';

export default function CursoPublicDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data: curso, isLoading } = useCurso(Number(id));
    const navigate = useNavigate();

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    if (!curso) return <div className="min-h-screen flex items-center justify-center">No se encontró el curso.</div>;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <button className="btn btn-accent mb-4" onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <img
                    src={getCursoImageUrl(curso.imagenUrl)}
                    alt={curso.titulo}
                    className="w-full md:w-64 h-64 object-cover rounded shadow"
                />
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{curso.titulo}</h1>
                    <div className="text-neutral-500 mb-2">Categoría: {curso.categoria.nombre}</div>
                    <div className="text-neutral-500 mb-2">Profesor: {curso.profesor.nombre} {curso.profesor.apellido}</div>
                    <p className="mb-6 text-gray-700">{curso.descripcion}</p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">¿Te interesa este curso?</h3>
                        <p className="text-blue-700 mb-4">
                            Inscríbete para acceder a todo el contenido, videos y materiales de este curso.
                        </p>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => navigate('/login')}
                        >
                            Inscribirse al Curso
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Acerca de este curso</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Lo que aprenderás</h3>
                        <ul className="text-gray-600 space-y-1">
                            <li>• Contenido actualizado y relevante</li>
                            <li>• Ejercicios prácticos</li>
                            <li>• Certificado al completar</li>
                            <li>• Acceso ilimitado</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Requisitos</h3>
                        <ul className="text-gray-600 space-y-1">
                            <li>• Ganas de aprender</li>
                            <li>• Conexión a internet</li>
                            <li>• Cuenta de usuario</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">¿Ya tienes una cuenta?</p>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/login')}
                >
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
} 