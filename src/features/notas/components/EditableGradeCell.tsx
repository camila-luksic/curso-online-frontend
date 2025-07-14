import { useState, useRef, useEffect } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { useAsignarNota } from '../hooks/useAsignarNota';
import { useUpdateNota } from '../hooks/useUpdateNota';
import { useNotas } from '../hooks/useNotas';

interface EditableGradeCellProps {
    inscripcionId: number;
    tipoNotaId: number;
    valorInicial: number | null;
    onValueChange?: (newValue: number | null) => void;
}

export const EditableGradeCell = ({
    inscripcionId,
    tipoNotaId,
    valorInicial,
    onValueChange
}: EditableGradeCellProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(valorInicial?.toString() || '');
    const [isValid, setIsValid] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const asignarNota = useAsignarNota(inscripcionId);
    const { data: notas } = useNotas(inscripcionId);
    // Buscar la nota existente para este tipoNotaId
    const notaExistente = notas?.find(n => n.tipoNota.id === tipoNotaId);
    const updateNota = useUpdateNota(notaExistente?.id ?? 0, inscripcionId);

    const validateValue = (val: string): boolean => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0 && num <= 10;
    };

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        setIsValid(validateValue(newValue));
    };

    const handleSave = async () => {
        if (!isValid || value === '') {
            setIsEditing(false);
            return;
        }

        const numValue = parseFloat(value);
        if (notaExistente) {
            await updateNota.mutateAsync({ valor: numValue });
        } else {
            await asignarNota.mutateAsync({
                tipoNotaId,
                valor: numValue
            });
        }

        setIsEditing(false);
        onValueChange?.(numValue);
    };

    const handleCancel = () => {
        setValue(valorInicial?.toString() || '');
        setIsValid(true);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const handleBlur = () => {
        if (value !== valorInicial?.toString()) {
            handleSave();
        } else {
            setIsEditing(false);
        }
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const getStatusIcon = () => {
        if (notaExistente && updateNota.isPending) {
            return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />;
        }
        if (notaExistente && updateNota.isSuccess) {
            return <Check className="w-4 h-4 text-green-500" />;
        }
        if (notaExistente && updateNota.isError) {
            return <X className="w-4 h-4 text-red-500" />;
        }
        if (!notaExistente && asignarNota.isPending) {
            return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />;
        }
        if (!notaExistente && asignarNota.isSuccess) {
            return <Check className="w-4 h-4 text-green-500" />;
        }
        if (!notaExistente && asignarNota.isError) {
            return <X className="w-4 h-4 text-red-500" />;
        }
        return null;
    };

    if (isEditing) {
        return (
            <div className="flex items-center space-x-2">
                <input
                    ref={inputRef}
                    type="number"
                    value={value}
                    onChange={(e) => handleValueChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    className={`w-16 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 ${isValid
                        ? 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        : 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        }`}
                    min="0"
                    max="20"
                    step="0.1"
                />
                {getStatusIcon()}
            </div>
        );
    }

    return (
        <div
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
            onClick={() => setIsEditing(true)}
        >
            <span className="text-sm font-medium">
                {valorInicial !== null ? valorInicial : '-'}
            </span>
            {getStatusIcon()}
        </div>
    );
}; 