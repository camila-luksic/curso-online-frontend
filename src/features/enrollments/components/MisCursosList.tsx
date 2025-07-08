import { useMisCursos } from '../hooks/useMisCursos';

export const MisCursosList = () => {
    const { data, isLoading, isError, error } = useMisCursos();

    if (isLoading) return <p>Cargando cursos...</p>;
    if (isError) return <p className="text-red-500">{(error as Error).message}</p>;
    if (!data || data.length === 0) return <p>No estás inscrito en ningún curso.</p>;

    return (
        <ul className="divide-y divide-gray-200">
            {data.map(inscripcion => (
                <li key={inscripcion.id} className="py-4">
                    <div className="font-semibold">{inscripcion.curso.titulo}</div>
                    <div className="text-gray-600 text-sm">{inscripcion.curso.descripcion}</div>
                    <div className="text-xs text-gray-400 mt-1">Inscrito el {new Date(inscripcion.fechaInscripcion).toLocaleDateString()}</div>
                </li>
            ))}
        </ul>
    );
}; 