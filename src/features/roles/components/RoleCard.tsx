import React from 'react';
import type { Role } from '../types/roleTypes';

interface RoleCardProps {
    role: Role;
    onEdit?: (role: Role) => void;
    onDelete?: (role: Role) => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, onEdit, onDelete }) => {
    return (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded p-4 flex flex-col gap-2 shadow-sm">
            <div className="font-bold text-lg">{role.nombre}</div>
            <div className="text-sm text-neutral-500">Código: {role.codigo}</div>
            <div className="flex gap-2 mt-2">
                {onEdit && (
                    <button className="btn btn-primary" onClick={() => onEdit(role)}>
                        Editar
                    </button>
                )}
                {onDelete && (
                    <button className="btn btn-danger" onClick={() => onDelete(role)}>
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    );
}; 