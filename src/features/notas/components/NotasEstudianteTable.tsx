import { useNotas } from '../hooks/useNotas';

export const NotasEstudianteTable = ({ inscripcionId }: { inscripcionId: number }) => {
    const { data, isLoading, isError } = useNotas(inscripcionId);

    if (isLoading) return <div>Cargando notas...</div>;
    if (isError) return <div>No se pudieron cargar las notas.</div>;
    if (!data || data.length === 0) return <div>No hay notas.</div>;

    return (
        <table className="table-auto w-full mt-4">
            <thead>
                <tr>
                    <th className="px-2 py-1">Tipo de Nota</th>
                    <th className="px-2 py-1">Valor</th>
                </tr>
            </thead>
            <tbody>
                {data.map(nota => (
                    <tr key={nota.id}>
                        <td className="px-2 py-1">{nota.tipoNota.nombre}</td>
                        <td className="px-2 py-1">{nota.valor}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}; 