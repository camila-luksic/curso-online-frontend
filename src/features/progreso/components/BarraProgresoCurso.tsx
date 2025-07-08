import { useProgresoCurso } from '../hooks/useProgresoCurso';

export const BarraProgresoCurso = ({ cursoId }: { cursoId: number }) => {
    const { data, isLoading, isError } = useProgresoCurso(cursoId);

    if (isLoading) return <div>Cargando progreso...</div>;
    if (isError || !data) return <div>No se pudo cargar el progreso.</div>;

    return (
        <div className="w-full my-2">
            <div className="flex justify-between text-xs mb-1">
                <span>Progreso: {data.vistos}/{data.total} videos</span>
                <span>{data.porcentaje}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-3">
                <div
                    className="bg-blue-500 h-3 rounded"
                    style={{ width: `${data.porcentaje}%` }}
                />
            </div>
        </div>
    );
}; 