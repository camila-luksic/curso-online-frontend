import * as z from 'zod';
import { CursoForm } from './CursoForm';

type CursoFormValues = z.infer<typeof import('../schema/cursoSchema').cursoSchema> & { imagen?: File | null };

interface CursoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CursoFormValues) => void;
  loading?: boolean;
  initialValues?: Partial<CursoFormValues> & { imagenUrl?: string };
  title?: string;
}

export function CursoModal({ open, onClose, onSubmit, loading, initialValues, title }: CursoModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-white rounded shadow-2xl p-6 w-full max-w-md dark:bg-neutral-900">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white">×</button>
        <h2 className="text-xl font-bold mb-4">{title || 'Curso'}</h2>
        <CursoForm initialValues={initialValues} onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  );
} 