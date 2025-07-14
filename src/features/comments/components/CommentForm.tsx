import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Textarea } from '@/core/components/ui';
import { useCreateComment } from '../hooks/useCreateComment';
import { commentSchema, type CommentFormValues } from '../schemas/commentSchema';

interface CommentFormProps {
    cursoId: number;
    onSuccess?: () => void;
}

export const CommentForm = ({ cursoId, onSuccess }: CommentFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const createComment = useCreateComment();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema),
    });

    const onSubmit = async (data: CommentFormValues) => {
        setIsSubmitting(true);
        try {
            await createComment.mutateAsync({ cursoId, input: data });
            reset();
            onSuccess?.();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Textarea
                label="Tu comentario"
                placeholder="Escribe tu comentario aquí..."
                rows={3}
                {...register('contenido')}
                error={errors.contenido?.message}
                disabled={isSubmitting}
            />
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    Máximo 500 caracteres
                </span>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6"
                >
                    {isSubmitting ? 'Publicando...' : 'Publicar Comentario'}
                </Button>
            </div>
        </form>
    );
}; 