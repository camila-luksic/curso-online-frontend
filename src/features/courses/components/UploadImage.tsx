import React, { useRef } from 'react';
import { useUploadImage } from '../hooks/useUploadImage';

interface UploadImageProps {
    endpoint: string;
    value?: string | null;
    onChange?: (url: string | null) => void;
}

export default function UploadImage({ endpoint, value, onChange }: UploadImageProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { uploadImage, imageUrl, isUploading, error, reset } = useUploadImage({ endpoint });

    const currentImage = value ?? imageUrl;

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const data = await uploadImage(file);
            if (data && (data.url || data.imagenUrl || data.path)) {
                onChange?.(data.url || data.imagenUrl || data.path);
            }
        }
    };

    const handleRemove = () => {
        reset();
        onChange?.(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="flex flex-col gap-2">
            {currentImage ? (
                <div className="relative w-32 h-32">
                    <img
                        src={currentImage}
                        alt="Imagen subida"
                        className="w-32 h-32 object-cover rounded border"
                    />
                    <button
                        type="button"
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                        onClick={handleRemove}
                        title="Eliminar imagen"
                    >
                        <span role="img" aria-label="eliminar">🗑️</span>
                    </button>
                </div>
            ) : (
                <>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        disabled={isUploading}
                        className="block"
                    />
                    {isUploading && <div className="text-xs text-blue-500">Subiendo imagen...</div>}
                </>
            )}
            {error && <div className="text-xs text-red-500">{error}</div>}
        </div>
    );
} 