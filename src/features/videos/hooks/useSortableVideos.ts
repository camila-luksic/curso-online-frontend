import { arrayMove } from '@dnd-kit/sortable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { updateVideosOrder } from '../services/videoService';
import { useVideosByCurso } from './useVideosByCurso';

export function useSortableVideos(cursoId: number, canEdit: boolean) {
  const queryClient = useQueryClient();
  const { data: videos = [], isLoading, error } = useVideosByCurso(cursoId);
  const [isReordering, setIsReordering] = useState(false);

  const mutation = useMutation({
    mutationFn: (ordenes: { id: number; orden: number }[]) => updateVideosOrder(cursoId, ordenes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos', cursoId] });
    },
  });

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !canEdit) return;
    const oldIndex = videos.findIndex(v => v.id === active.id);
    const newIndex = videos.findIndex(v => v.id === over.id);
    const newOrder = arrayMove(videos, oldIndex, newIndex);
    const ordenes = newOrder.map((video, idx) => ({ id: video.id, orden: idx + 1 }));
    setIsReordering(true);
    try {
      await mutation.mutateAsync(ordenes);
    } finally {
      setIsReordering(false);
    }
  };

  return {
    videos: videos.slice().sort((a, b) => a.orden - b.orden),
    isLoading,
    isReordering,
    handleDragEnd,
    error: error || mutation.error,
  };
} 