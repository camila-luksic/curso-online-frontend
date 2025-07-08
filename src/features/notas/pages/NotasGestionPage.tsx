import React from 'react';
import { useParams } from 'react-router-dom';
import { useInscripcionesDeCurso } from '../../enrollments/hooks/useInscripcionesDeCurso';
import { TipoNotaForm } from '../../tiposNota/components/TipoNotaForm';
import { TiposNotaList } from '../../tiposNota/components/TiposNotaList';
import { useTiposNota } from '../../tiposNota/hooks/useTiposNota';
import { NotaForm } from '../components/NotaForm';
import { useNotas } from '../hooks/useNotas';

const NotasGestionPage: React.FC = () => {
    const { cursoId } = useParams<{ cursoId: string }>();
    const id = Number(cursoId);
    const { data: inscripciones, isLoading: loadingInscripciones } = useInscripcionesDeCurso(id);
    const { data: tiposNota, isLoading: loadingTiposNota, refetch: refetchTiposNota } = useTiposNota(id);

    if (loadingInscripciones || loadingTiposNota) return <div>Cargando...</div>;
    if (!inscripciones || !tiposNota) return <div>No se encontraron inscripciones o tipos de nota.</div>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Gestión de notas del curso</h1>
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Tipos de nota</h2>
                <TipoNotaForm cursoId={id} onCreated={refetchTiposNota} />
                <TiposNotaList cursoId={id} />
            </section>
            {inscripciones.length === 0 ? (
                <p>No hay estudiantes inscritos en este curso.</p>
            ) : (
                <div className="space-y-8">
                    {inscripciones.map(inscripcion => (
                        <div key={inscripcion.id} className="border rounded p-4 bg-white shadow">
                            <h2 className="font-semibold mb-2">
                                {inscripcion.estudiante.nombre} {inscripcion.estudiante.apellido} ({inscripcion.estudiante.email})
                            </h2>
                            <NotasPorEstudiante inscripcionId={inscripcion.id} tiposNota={tiposNota} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Componente auxiliar para mostrar la tabla de tipos de nota, valor y formulario
const NotasPorEstudiante: React.FC<{ inscripcionId: number; tiposNota: any[] }> = ({ inscripcionId, tiposNota }) => {
    const { data: notas, isLoading } = useNotas(inscripcionId);

    if (isLoading) return <div>Cargando notas...</div>;

    return (
        <table className="table-auto w-full mt-4">
            <thead>
                <tr>
                    <th className="px-2 py-1">Tipo de Nota</th>
                    <th className="px-2 py-1">Valor</th>
                    <th className="px-2 py-1">Acción</th>
                </tr>
            </thead>
            <tbody>
                {tiposNota.map(tipo => {
                    const nota = notas?.find(n => n.tipoNota.id === tipo.id);
                    return (
                        <tr key={tipo.id}>
                            <td className="px-2 py-1">{tipo.nombre}</td>
                            <td className="px-2 py-1">{nota ? nota.valor : <span className="text-gray-400">Sin nota</span>}</td>
                            <td className="px-2 py-1">
                                <NotaForm
                                    inscripcionId={inscripcionId}
                                    tipoNotaId={tipo.id}
                                    valorInicial={nota ? nota.valor : ''}
                                    onSaved={() => { }}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default NotasGestionPage; 