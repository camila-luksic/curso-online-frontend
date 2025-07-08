import { useState } from 'react';
import { useAsignarNota } from '../hooks/useAsignarNota';

export const NotaForm = ({ inscripcionId, tipoNotaId, valorInicial = '', onSaved }: {
    inscripcionId: number;
    tipoNotaId: number;
    valorInicial?: number | string;
    onSaved?: () => void;
}) => {
    const [valor, setValor] = useState(valorInicial);
    const asignarNota = useAsignarNota(inscripcionId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (valor === '' || isNaN(Number(valor))) return;
        asignarNota.mutate({ tipoNotaId, valor: Number(valor) }, { onSuccess: () => onSaved?.() });
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <input
                type="number"
                value={valor}
                onChange={e => setValor(e.target.value)}
                placeholder="Nota"
                className="input input-bordered input-sm w-20"
                min={0}
                max={10}
                step={0.1}
            />
            <button type="submit" className="btn btn-primary btn-sm" disabled={asignarNota.isPending}>
                Guardar
            </button>
        </form>
    );
}; 