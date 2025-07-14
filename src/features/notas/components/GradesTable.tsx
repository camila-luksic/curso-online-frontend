import { useState } from 'react';
import { LoadingSpinner } from '@/core/components/ui/LoadingSpinner';
import { EditableGradeCell } from './EditableGradeCell';
import { useNotas } from '../hooks/useNotas';
import type { Inscripcion } from '../../enrollments/types/inscripcionTypes';
import type { TipoNota } from '../../tiposNota/types/tipoNotaTypes';

interface GradesTableProps {
    inscripciones: Inscripcion[];
    tiposNota: TipoNota[];
}

export const GradesTable = ({ inscripciones, tiposNota }: GradesTableProps) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleGradeChange = () => {
        setRefreshKey(prev => prev + 1);
    };

    if (inscripciones.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No hay estudiantes inscritos
                    </h3>
                    <p className="text-gray-500">
                        Los estudiantes deben inscribirse en el curso para poder asignarles notas.
                    </p>
                </div>
            </div>
        );
    }

    if (tiposNota.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No hay tipos de nota configurados
                    </h3>
                    <p className="text-gray-500">
                        Debes crear tipos de nota (Examen, Tarea, Proyecto, etc.) antes de poder asignar calificaciones.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estudiante
                            </th>
                            {tiposNota.map((tipo) => (
                                <th key={tipo.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {tipo.nombre}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Promedio
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {inscripciones.map((inscripcion) => (
                            <StudentGradeRow
                                key={inscripcion.id}
                                inscripcion={inscripcion}
                                tiposNota={tiposNota}
                                onGradeChange={handleGradeChange}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

interface StudentGradeRowProps {
    inscripcion: Inscripcion;
    tiposNota: TipoNota[];
    onGradeChange: () => void;
}

const StudentGradeRow = ({ inscripcion, tiposNota, onGradeChange }: StudentGradeRowProps) => {
    const { data: notas, isLoading } = useNotas(inscripcion.id);

    if (isLoading) {
        return (
            <tr>
                <td colSpan={tiposNota.length + 2} className="px-6 py-4">
                    <div className="flex justify-center">
                        <LoadingSpinner text="Cargando notas..." />
                    </div>
                </td>
            </tr>
        );
    }

    // Calcular promedio
    const notasValidas = notas?.filter(nota => nota.valor !== null) || [];
    const promedio = notasValidas.length > 0
        ? notasValidas.reduce((sum, nota) => sum + nota.valor, 0) / notasValidas.length
        : null;

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                        {inscripcion.estudiante.nombre[0]}{inscripcion.estudiante.apellido[0]}
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">
                            {inscripcion.estudiante.nombre} {inscripcion.estudiante.apellido}
                        </div>
                        <div className="text-sm text-gray-500">
                            {inscripcion.estudiante.email}
                        </div>
                    </div>
                </div>
            </td>
            {tiposNota.map((tipo) => {
                const nota = notas?.find(n => n.tipoNota.id === tipo.id);
                return (
                    <td key={tipo.id} className="px-6 py-4 whitespace-nowrap">
                        <EditableGradeCell
                            inscripcionId={inscripcion.id}
                            tipoNotaId={tipo.id}
                            valorInicial={nota?.valor || null}
                            onValueChange={onGradeChange}
                        />
                    </td>
                );
            })}
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                    {promedio !== null ? promedio.toFixed(1) : '-'}
                </div>
            </td>
        </tr>
    );
}; 