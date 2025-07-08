import type { User } from '../types/userTypes';

interface UserCardProps {
    user: User;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
    return (
        <div className="bg-white dark:bg-neutral-900 rounded shadow p-4 flex flex-col gap-2 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-lg text-black dark:text-white">{user.nombre} {user.apellido}</span>
                <span className="ml-auto px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-600 dark:text-neutral-300">{user.rol.nombre}</span>
            </div>
            <div className="text-neutral-500 text-sm mb-2">{user.email}</div>
            <div className="flex gap-2 mt-2">
                {onEdit && (
                    <button className="btn btn-primary" onClick={onEdit} aria-label="Editar usuario">Editar</button>
                )}
                {onDelete && (
                    <button className="btn btn-danger" onClick={onDelete} aria-label="Eliminar usuario">Eliminar</button>
                )}
            </div>
        </div>
    );
} 