import { getCursoImageUrl } from '@/core/utils/image';
import type { Curso } from '../types/cursoTypes';

interface CursoCardProps {
    curso: Curso;
    onEdit?: () => void;
    onDelete?: () => void;
    onView?: () => void;
}

export function CursoCard({ curso, onEdit, onDelete, onView }: CursoCardProps) {
    console.log('CursoCard', curso.id, { onEdit, onDelete, onView });
    return (
        <div className="relative rounded-2xl shadow-lg bg-white overflow-hidden group transition w-full max-w-xs mx-auto">
            {/* Imagen de cabecera */}
            <img
                src={getCursoImageUrl(curso.imagenUrl)}
                alt={curso.titulo}
                className="w-full h-32 object-cover rounded-t-2xl"
                loading="lazy"
            />

            {/* Botón de controles (⋮) solo en hover */}
            {(onEdit || onDelete || onView) && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition z-10">
                    <div className="relative">
                        <button className="bg-white rounded-full p-2 shadow hover:bg-neutral-100 focus:outline-none">
                            <span className="text-xl">⋮</span>
                        </button>
                        {/* Menú contextual de acciones (opcional, aquí puedes expandir con un popover real) */}
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg py-1 text-sm hidden group-hover:block">
                            {onView && (
                                <button className="block w-full text-left px-4 py-2 hover:bg-neutral-100" onClick={onView}>Ver</button>
                            )}
                            {onEdit && (
                                <button className="block w-full text-left px-4 py-2 hover:bg-neutral-100" onClick={onEdit}>Editar</button>
                            )}
                            {onDelete && (
                                <button className="block w-full text-left px-4 py-2 hover:bg-neutral-100 text-red-600" onClick={onDelete}>Eliminar</button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Contenido */}
            <div className="p-4">
                <div className="text-xs text-neutral-400 mb-1 flex items-center gap-2">
                    {/* Aquí podrías poner fecha, estado, etc */}
                    Hace 5 días • Activo
                </div>
                <div className="text-lg font-semibold text-black mb-2 whitespace-normal break-words">{curso.titulo}</div>

            </div>
        </div>
    );
} 