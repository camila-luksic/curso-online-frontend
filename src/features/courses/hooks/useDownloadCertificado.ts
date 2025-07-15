import { useState } from 'react';
import { useNotifications } from '@/core/hooks/useNotifications';
import { apiInstance } from '@/core/api/instance.api';

export const useDownloadCertificado = () => {
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useNotifications();

  const downloadCertificado = async (cursoId: number) => {
    setLoading(true);
    try {
      const response = await apiInstance.get(`/cursos/${cursoId}/certificado`, {
        responseType: 'blob',
      });
      const contentType = response.headers['content-type'];
      if (contentType !== 'application/pdf') {
        throw new Error('El archivo recibido no es un PDF.');
      }
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'certificado.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      showSuccess('¡Certificado descargado exitosamente!');
    } catch (error: any) {
      let message = 'Error al descargar el certificado';
      if (error.response && error.response.data) {
        try {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const json = JSON.parse(reader.result as string);
              showError(json.message || message);
            } catch {
              showError(message);
            }
          };
          reader.readAsText(error.response.data);
          return;
        } catch {}
      }
      showError(error.response?.data?.message || message);
    } finally {
      setLoading(false);
    }
  };

  return { downloadCertificado, loading };
}; 