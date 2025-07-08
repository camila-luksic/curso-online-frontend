import { useNavigate, useParams } from 'react-router-dom';
import { VideoMetadata } from '../../videos/components/VideoMetadata';
import { VideoPlayer } from '../../videos/components/VideoPlayer';
import { useVideosByCurso } from '../../videos/hooks/useVideosByCurso';
import { useCurso } from '../hooks/useCurso';

export default function VideoDetailPage() {
    const { cursoId, videoId } = useParams<{ cursoId: string; videoId: string }>();
    const { data: curso, isLoading: loadingCurso } = useCurso(Number(cursoId));
    const { data: videos, isLoading: loadingVideos } = useVideosByCurso(Number(cursoId));
    const navigate = useNavigate();

    if (loadingCurso || loadingVideos) return <div>Cargando...</div>;
    if (!curso) return <div>No se encontró el curso.</div>;
    const video = videos?.find(v => v.id === Number(videoId));
    if (!video) return <div>No se encontró el video.</div>;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <button className="btn btn-accent mb-4" onClick={() => navigate(-1)}>
                ← Volver al curso
            </button>
            <h1 className="text-2xl font-bold mb-2">{curso.titulo}</h1>
            <div className="mb-6">
                <VideoPlayer key={video.id} video={video} />
            </div>
            <VideoMetadata video={video} />
        </div>
    );
} 