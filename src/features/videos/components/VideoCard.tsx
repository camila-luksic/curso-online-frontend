import type { Video } from '../types/videoTypes';

interface VideoCardProps {
    video: Video;
    onEdit?: () => void;
    onDelete?: () => void;
    onView?: () => void;
}

export function VideoCard({ video, onEdit, onDelete, onView }: VideoCardProps) {
    return (
        <div
            className="bg-white dark:bg-neutral-900 rounded shadow p-4 flex flex-col gap-2 border border-neutral-200 dark:border-neutral-700"
        >
            <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-black dark:text-white">{video.orden}. {video.titulo}</span>
            </div>
            <div className="flex gap-2 mt-2">
                {onView && (
                    <button className="btn btn-accent" onClick={onView}>Ver</button>
                )}
                {onEdit && (
                    <button className="btn btn-primary" onClick={onEdit}>Editar</button>
                )}
                {onDelete && (
                    <button className="btn btn-danger" onClick={onDelete}>Eliminar</button>
                )}
            </div>
        </div>
    );
} 