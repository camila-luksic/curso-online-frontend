import { useState } from 'react';
import { useCreateTipoNota } from '../hooks/useCreateTipoNota';

export const TipoNotaForm = ({ cursoId, onCreated }: { cursoId: number; onCreated?: () => void }) => {
    const [nombre, setNombre] = useState('');
    const createTipoNota = useCreateTipoNota(cursoId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim()) return;
        createTipoNota.mutate({ nombre }, {
            onSuccess: () => {
                setNombre('');
                onCreated?.();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-2">
            <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Nombre del tipo de nota"
                className="input input-bordered input-sm"
            />
            <button type="submit" className="btn btn-primary btn-sm" disabled={createTipoNota.isPending}>
                Agregar
            </button>
        </form>
    );
}; 