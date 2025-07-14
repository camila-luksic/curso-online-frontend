import { useState } from 'react';
import { useAuth } from '@/core/hooks/useAuth';
import { Button } from '@/core/components/ui';
import { useDeleteComment } from '../hooks/useDeleteComment';
import { useUpdateComment } from '../hooks/useUpdateComment';
import { CommentEditForm } from './CommentEditForm';
import type { Comment } from '../types/commentTypes';

interface CommentCardProps {
    comment: Comment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const { usuario } = useAuth();
    const deleteComment = useDeleteComment();
    const updateComment = useUpdateComment();

    const isAuthor = usuario?.id === comment.autor.id;
    const canEdit = isAuthor;
    const canDelete = isAuthor || usuario?.rol?.codigo === 'ADMIN';

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
            await deleteComment.mutateAsync(comment.id);
        }
    };

    const handleUpdate = async (contenido: string) => {
        await updateComment.mutateAsync({ commentId: comment.id, input: { contenido } });
        setIsEditing(false);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (isEditing) {
        return (
            <CommentEditForm
                comment={comment}
                onSave={handleUpdate}
                onCancel={() => setIsEditing(false)}
                isLoading={updateComment.isPending}
            />
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {comment.autor.nombre[0]}{comment.autor.apellido[0]}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">
                            {comment.autor.nombre} {comment.autor.apellido}
                        </p>
                        <p className="text-sm text-gray-500">
                            {formatDate(comment.createdAt)}
                        </p>
                    </div>
                </div>

                {(canEdit || canDelete) && (
                    <div className="flex space-x-2">
                        {canEdit && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsEditing(true)}
                                disabled={deleteComment.isPending}
                            >
                                Editar
                            </Button>
                        )}
                        {canDelete && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDelete}
                                disabled={deleteComment.isPending}
                                className="text-red-600 hover:text-red-700"
                            >
                                {deleteComment.isPending ? 'Eliminando...' : 'Eliminar'}
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <div className="text-gray-700">
                {comment.contenido}
            </div>
        </div>
    );
}; 