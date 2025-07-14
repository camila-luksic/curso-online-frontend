import { useAuth } from '@/core/hooks/useAuth';
import { LoadingSpinner } from '@/core/components/ui/LoadingSpinner';
import { useComments } from '../hooks/useComments';
import { CommentForm } from './CommentForm';
import { CommentCard } from './CommentCard';

interface CommentsSectionProps {
    cursoId: number;
}

export const CommentsSection = ({ cursoId }: CommentsSectionProps) => {
    const { isAuthenticated } = useAuth();
    const { data: comments = [], isLoading, error } = useComments(cursoId);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Comentarios</h3>
                <div className="flex justify-center py-8">
                    <LoadingSpinner text="Cargando comentarios..." />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Comentarios</h3>
                <div className="text-center py-8 text-red-500">
                    Error al cargar los comentarios
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
                Comentarios ({comments.length})
            </h3>

            {/* Formulario para crear comentarios */}
            {isAuthenticated ? (
                <div className="bg-gray-50 rounded-lg p-4">
                    <CommentForm cursoId={cursoId} />
                </div>
            ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-center">
                        Inicia sesión para dejar un comentario
                    </p>
                </div>
            )}

            {/* Lista de comentarios */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))
                )}
            </div>
        </div>
    );
}; 