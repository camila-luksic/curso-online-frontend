import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAbility } from '../../../core/context/AbilityContext';
import { subject } from '../../../core/permissions/ability';
import { useCreateVideo } from '../hooks/useCreateVideo';
import { useDeleteVideo } from '../hooks/useDeleteVideo';
import { useSortableVideos } from '../hooks/useSortableVideos';
import { useUpdateVideo } from '../hooks/useUpdateVideo';
import type { Video } from '../types/videoTypes';
import SortableVideoCard from './SortableVideoCard';
import { VideoModal } from './VideoModal';

interface VideoListForCourseProps {
    cursoId: number;
}

export function VideoListForCourse({ cursoId }: VideoListForCourseProps) {
    const createVideo = useCreateVideo(cursoId);
    const updateVideo = useUpdateVideo(cursoId);
    const deleteVideo = useDeleteVideo(cursoId);
    const ability = useAbility();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [editVideo, setEditVideo] = useState<Video | null>(null);

    // Use CASL for reorder permission
    const canReorder = ability.can('reorder', 'Video');
    const { videos: sortedVideos, isLoading, isReordering, handleDragEnd, error } = useSortableVideos(cursoId, canReorder);

    const handleCreate = (data: any) => {
        createVideo.mutate(data, { onSuccess: () => setModalOpen(false) });
    };

    const handleEdit = (data: any) => {
        if (editVideo) {
            updateVideo.mutate({ id: editVideo.id, input: data }, { onSuccess: () => setEditVideo(null) });
        }
    };

    const handleDelete = (video: Video) => {
        if (window.confirm(`¿Eliminar el video "${video.titulo}"?`)) {
            deleteVideo.mutate(video.id);
        }
    };

    const handleViewVideo = (video: Video) => {
        navigate(`/cursos/${cursoId}/videos/${video.id}`);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">Videos del curso</h2>
                {ability.can('create', 'Video') && (
                    <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                        + Nuevo Video
                    </button>
                )}
            </div>
            {isLoading ? (
                <div>Cargando videos...</div>
            ) : error ? (
                <div className="text-red-500">Error al cargar videos</div>
            ) : (
                <DndContext collisionDetection={closestCenter} onDragEnd={
                    ability.can('reorder', 'Video') ? handleDragEnd : undefined
                }>
                    <SortableContext
                        items={sortedVideos.map(video => video.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-3">
                            {sortedVideos.map((video) => {
                                // For future: flatten video with ownerId if needed
                                const canEdit = ability.can('update', subject('Video', video) as any);
                                const canDelete = ability.can('delete', subject('Video', video) as any);
                                return (
                                    <SortableVideoCard
                                        key={video.id}
                                        video={video}
                                        onEdit={canEdit ? () => setEditVideo(video) : undefined}
                                        onDelete={canDelete ? () => handleDelete(video) : undefined}
                                        onView={() => handleViewVideo(video)}
                                        disabled={!ability.can('reorder', subject('Video', video) as any) || isReordering}
                                    />
                                );
                            })}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
            {isReordering && (
                <div className="text-xs text-blue-500 text-center py-2">Actualizando orden...</div>
            )}
            {/* Modal para crear */}
            <VideoModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleCreate}
                loading={createVideo.isPending}
                title="Nuevo Video"
            />
            {/* Modal para editar */}
            <VideoModal
                open={!!editVideo}
                onClose={() => setEditVideo(null)}
                onSubmit={handleEdit}
                loading={updateVideo.isPending}
                initialValues={editVideo ?? undefined}
                title="Editar Video"
            />
        </div>
    );
} 