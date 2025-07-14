import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Textarea } from '@/core/components/ui';
import { commentSchema, type CommentFormValues } from '../schemas/commentSchema';
import type { Comment } from '../types/commentTypes';

interface CommentEditFormProps {
    comment: Comment;
    onSave: (contenido: string) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
}

export const CommentEditForm = ({ comment, onSave, onCancel, isLoading }: CommentEditFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            contenido: comment.contenido,
        },
    });

    const onSubmit = async (data: CommentFormValues) => {
        await onSave(data.contenido);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Textarea
                label="Editar comentario"
                rows={3}
                {...register('contenido')}
                error={errors.contenido?.message}
                disabled={isLoading}
            />
            <div className="flex justify-end space-x-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </form>
    );
}; 