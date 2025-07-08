import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { roleSchema } from '../schema/roleSchema';
import type { CreateRoleInput } from '../types/roleTypes';

interface RoleFormProps {
    initialValues?: Partial<CreateRoleInput>;
    onSubmit: (values: CreateRoleInput) => void;
    loading?: boolean;
    submitLabel?: string;
}

type RoleFormValues = z.infer<typeof roleSchema>;

export const RoleForm: React.FC<RoleFormProps> = ({
    initialValues = {},
    onSubmit,
    loading = false,
    submitLabel = 'Guardar',
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RoleFormValues>({
        resolver: zodResolver(roleSchema),
        defaultValues: initialValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Código</label>
                <input
                    type="text"
                    {...register('codigo')}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-accent dark:bg-neutral-800 dark:border-neutral-700"
                />
                {errors.codigo && (
                    <p className="text-red-500 text-xs mt-1">{errors.codigo.message}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                    type="text"
                    {...register('nombre')}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-accent dark:bg-neutral-800 dark:border-neutral-700"
                />
                {errors.nombre && (
                    <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
                )}
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
            >
                {loading ? 'Guardando...' : submitLabel}
            </button>
        </form>
    );
}; 