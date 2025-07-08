import React from 'react';
import type { Video } from '../types/videoTypes';

export const VideoMetadata: React.FC<{ video: Video }> = ({ video }) => {
    return (
        <div className="space-y-2">
            <h2 className="text-2xl font-bold">{video.orden}. {video.titulo}</h2>
        </div>
    );
}; 