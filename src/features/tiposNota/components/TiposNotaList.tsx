import { useTiposNota } from '../hooks/useTiposNota';

export const TiposNotaList = ({ cursoId }: { cursoId: number }) => {
    const { data, isLoading, isError } = useTiposNota(cursoId);

    if (isLoading) return <div>Cargando tipos de nota...</div>;
    if (isError) return <div>No se pudieron cargar los tipos de nota.</div>;
    if (!data || data.length === 0) return <div>No hay tipos de nota.</div>;

    return (
        <ul className="divide-y divide-gray-200">
            {data.map(tipo => (
                <li key={tipo.id} className="py-2">
                    {tipo.nombre}
                </li>
            ))}
        </ul>
    );
}; 