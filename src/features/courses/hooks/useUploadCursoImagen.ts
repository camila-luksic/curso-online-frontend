import { useState } from 'react';
import { uploadCursoImagen } from '../services/cursoService';

export function useUploadCursoImagen() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagenUrl, setImagenUrl] = useState<string | null>(null);

  const upload = async (cursoId: number, file: File) => {
    setIsUploading(true);
    setError(null);
    try {
      const url = await uploadCursoImagen(cursoId, file);
      setImagenUrl(url);
      return url;
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Error al subir la imagen');
      setImagenUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setImagenUrl(null);
    setError(null);
  };

  return { upload, imagenUrl, isUploading, error, reset };
} 