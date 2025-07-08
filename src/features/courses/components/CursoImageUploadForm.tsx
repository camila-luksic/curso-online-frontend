import { useRef, useState } from 'react';
import { useUploadCursoImagen } from '../hooks/useUploadCursoImagen';

interface CursoImageUploadFormProps {
    cursoId: number;
    imagenActual?: string | null;
    onUploaded?: (url: string | null) => void;
}

export default function CursoImageUploadForm({ cursoId, onUploaded }: CursoImageUploadFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { upload, isUploading, error, reset } = useUploadCursoImagen();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        reset();
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFile) {
            const url = await upload(cursoId, selectedFile);
            if (url) onUploaded?.(url);
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <form onSubmit={handleUpload} className="flex flex-col gap-2">
            <label className="font-medium text-black dark:text-white">Subir imagen</label>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={isUploading}
                className="block"
            />
            <button
                type="submit"
                className="btn btn-primary"
                disabled={!selectedFile || isUploading}
            >
                {isUploading ? 'Subiendo...' : 'Subir imagen'}
            </button>
            {error && <div className="text-xs text-red-500">{error}</div>}
        </form>
    );
} 