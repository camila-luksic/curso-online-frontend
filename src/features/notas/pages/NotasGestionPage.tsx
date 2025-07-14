import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '@/core/components/ui/LoadingSpinner';
import { useInscripcionesDeCurso } from '../../enrollments/hooks/useInscripcionesDeCurso';
import { TipoNotaForm } from '../../tiposNota/components/TipoNotaForm';
import { TiposNotaList } from '../../tiposNota/components/TiposNotaList';
import { useTiposNota } from '../../tiposNota/hooks/useTiposNota';
import { GradesTable } from '../components/GradesTable';

const NotasGestionPage: React.FC = () => {
    const { cursoId } = useParams<{ cursoId: string }>();
    const id = Number(cursoId);
    const { data: inscripciones, isLoading: loadingInscripciones } = useInscripcionesDeCurso(id);
    const { data: tiposNota, isLoading: loadingTiposNota, refetch: refetchTiposNota } = useTiposNota(id);

    if (loadingInscripciones || loadingTiposNota) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner text="Cargando gestión de notas..." />
            </div>
        );
    }

    if (!inscripciones || !tiposNota) {
        return (
            <div className="text-center py-8">
                <div className="text-red-500">
                    No se pudieron cargar los datos de inscripciones o tipos de nota.
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Gestión de Notas
                </h1>
                <p className="text-gray-600">
                    Asigna y gestiona las calificaciones de los estudiantes del curso.
                </p>
            </div>

            {/* Sección de Tipos de Nota */}
            <div className="bg-white rounded-lg shadow mb-8">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Tipos de Evaluación
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Configura los diferentes tipos de evaluación para este curso (Examen, Tarea, Proyecto, etc.)
                    </p>
                </div>
                <div className="p-6">
                    <TipoNotaForm cursoId={id} onCreated={refetchTiposNota} />
                    <div className="mt-6">
                        <TiposNotaList cursoId={id} />
                    </div>
                </div>
            </div>

            {/* Tabla de Notas */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Calificaciones de Estudiantes
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Haz clic en cualquier celda para editar la nota. Los cambios se guardan automáticamente.
                    </p>
                </div>
                <div className="p-6">
                    <GradesTable
                        inscripciones={inscripciones}
                        tiposNota={tiposNota}
                    />
                </div>
            </div>

            {/* Instrucciones de uso */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">
                    💡 Instrucciones de uso
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>Haz clic</strong> en cualquier celda de nota para editarla</li>
                    <li>• <strong>Presiona Enter</strong> para guardar o <strong>Escape</strong> para cancelar</li>
                    <li>• <strong>Navega</strong> entre celdas usando Tab o las flechas</li>
                    <li>• <strong>Rango válido:</strong> 0.0 a 10.0 puntos</li>
                    <li>• Los cambios se <strong>guardan automáticamente</strong> al salir de la celda</li>
                </ul>
            </div>
        </div>
    );
};

export default NotasGestionPage; 