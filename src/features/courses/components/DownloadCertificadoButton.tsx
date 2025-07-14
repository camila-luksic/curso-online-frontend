import { Button } from '@/core/components/ui/Button';
import { Download } from 'lucide-react';
import { useDownloadCertificado } from '../hooks/useDownloadCertificado';

interface DownloadCertificadoButtonProps {
    cursoId: number;
}

export const DownloadCertificadoButton = ({ cursoId }: DownloadCertificadoButtonProps) => {
    const { downloadCertificado, loading } = useDownloadCertificado();

    return (
        <Button
            onClick={() => downloadCertificado(cursoId)}
            disabled={loading}
            className="flex items-center gap-2 btn-success"
            title="Descargar certificado en PDF"
        >
            <Download className="w-4 h-4" />
            {loading ? 'Descargando...' : 'Descargar Certificado'}
        </Button>
    );
}; 