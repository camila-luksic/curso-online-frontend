import { VideoForm } from './VideoForm';
import * as z from 'zod';

type VideoFormValues = z.infer<typeof import('../schema/videoSchema').videoSchema>;

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: VideoFormValues) => void;
  loading?: boolean;
  initialValues?: Partial<VideoFormValues>;
  title?: string;
}

export function VideoModal({ open, onClose, onSubmit, loading, initialValues, title }: VideoModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-white rounded shadow-2xl p-6 w-full max-w-md dark:bg-neutral-900">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white">×</button>
        <h2 className="text-xl font-bold mb-4">{title || 'Video'}</h2>
        <VideoForm initialValues={initialValues} onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  );
} 