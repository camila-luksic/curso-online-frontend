import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Video } from '../types/videoTypes';
import { VideoCard } from './VideoCard';

interface SortableVideoCardProps {
    video: Video;
    onEdit?: () => void;
    onDelete?: () => void;
    onView?: () => void;
    disabled?: boolean;
}

export default function SortableVideoCard({ video, onEdit, onDelete, onView, disabled }: SortableVideoCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: video.id, disabled });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} className="relative">
            <div className="absolute left-0 top-0 h-full flex items-center pl-2 z-10">
                {!disabled && (
                    <span
                        {...attributes}
                        {...listeners}
                        className="cursor-grab select-none text-gray-400 hover:text-gray-600 text-xl"
                        title="Arrastrar para reordenar"
                        style={{ userSelect: 'none' }}
                    >
                        ⋮⋮
                    </span>
                )}
            </div>
            <div className="pl-8">
                <VideoCard
                    video={video}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                />
            </div>
        </div>
    );
} 