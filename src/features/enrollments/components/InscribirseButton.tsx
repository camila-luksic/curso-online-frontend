import { Button } from '@/core/components/ui/Button';
import { useInscribirseEnCurso } from '../hooks/useInscribirseEnCurso';

interface InscribirseButtonProps {
    cursoId: number;
    onSuccess?: () => void;
}

export const InscribirseButton = ({ cursoId, onSuccess }: InscribirseButtonProps) => {
    const { mutate, isPending, isSuccess, isError, error } = useInscribirseEnCurso();

    const handleClick = () => {
        mutate(cursoId, {
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
        });
    };

    return (
        <div>
            <Button
                onClick={handleClick}
                disabled={isPending || isSuccess}
                className="w-full"
            >
                {isPending ? 'Inscribiendo...' : isSuccess ? 'Inscrito' : 'Inscribirse'}
            </Button>
            {isError && (
                <p className="text-red-500 text-sm mt-2">{(error as Error).message}</p>
            )}
        </div>
    );
}; 