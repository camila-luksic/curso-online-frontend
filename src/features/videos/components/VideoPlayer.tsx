import React, { useEffect, useRef } from 'react';
import { useMarcarVideoVisto } from '../../progreso/hooks/useMarcarVideoVisto';
import type { Video } from '../types/videoTypes';

function isYouTubeUrl(url: string) {
    return /youtu(be)?\.([a-z]+)/.test(url);
}

function getYouTubeId(url: string) {
    const match = url.match(/(?:v=|be\/(?!channel\/))([\w-]{11})/);
    return match ? match[1] : null;
}

// Componente para YouTube con API JS
const YouTubePlayer: React.FC<{ videoId: string; onEnded: () => void; title: string }> = ({ videoId, onEnded, title }) => {
    const playerInstance = useRef<any>(null);
    const playerDivId = `yt-player-${videoId}`;

    useEffect(() => {
        function createPlayer() {
            if ((window as any).YT && (window as any).YT.Player) {
                playerInstance.current = new (window as any).YT.Player(playerDivId, {
                    videoId,
                    events: {
                        onStateChange: (event: any) => {
                            if (event.data === 0) {
                                onEnded();
                            }
                        },
                    },
                });
            }
        }

        if (!(window as any).YT) {
            (window as any).onYouTubeIframeAPIReady = createPlayer;
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.body.appendChild(tag);
        } else {
            createPlayer();
        }

        return () => {
            if (playerInstance.current && playerInstance.current.destroy) {
                playerInstance.current.destroy();
            }
        };
    }, [videoId, onEnded, playerDivId]);

    return (
        <div className="aspect-video w-full max-w-3xl mx-auto">
            <div id={playerDivId} title={title} />
        </div>
    );
};

export const VideoPlayer: React.FC<{ video: Video }> = ({ video }) => {
    const { mutate: marcarVisto } = useMarcarVideoVisto();

    const handleEnded = () => {
        marcarVisto(video.id);
    };

    if (isYouTubeUrl(video.url)) {
        const videoId = getYouTubeId(video.url);
        if (!videoId) return <div>URL de YouTube inválida</div>;
        return <YouTubePlayer videoId={videoId} onEnded={handleEnded} title={video.titulo} />;
    }
    // HTML5 video fallback
    return (
        <video
            controls
            className="w-full max-w-3xl mx-auto rounded shadow"
            src={video.url}
            title={video.titulo}
            onEnded={handleEnded}
        />
    );
}; 