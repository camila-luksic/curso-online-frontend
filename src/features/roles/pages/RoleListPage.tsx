import { useState } from 'react';
import { RoleCard } from '../components/RoleCard';
import { RoleModal } from '../components/RoleModal';
import { useCreateRole } from '../hooks/useCreateRole';
import { useDeleteRole } from '../hooks/useDeleteRole';
import { useRoles } from '../hooks/useRoles';
import { useUpdateRole } from '../hooks/useUpdateRole';
import type { CreateRoleInput, Role } from '../types/roleTypes';

export default function RoleListPage() {
    const { data: roles, isLoading } = useRoles();
    const createRole = useCreateRole();
    const updateRole = useUpdateRole();
    const deleteRole = useDeleteRole();

    const [modalOpen, setModalOpen] = useState(false);
    const [editRole, setEditRole] = useState<Role | null>(null);

    const handleCreate = (data: CreateRoleInput) => {
        createRole.mutate(data, { onSuccess: () => setModalOpen(false) });
    };

    const handleEdit = (data: CreateRoleInput) => {
        if (editRole) {
            updateRole.mutate({ id: editRole.id, input: data }, { onSuccess: () => setEditRole(null) });
        }
    };

    const handleDelete = (role: Role) => {
        if (window.confirm(`¿Eliminar el rol "${role.nombre}"?`)) {
            deleteRole.mutate(role.id);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Roles</h1>
                <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                    + Nuevo Rol
                </button>
            </div>
            {isLoading ? (
                <div>Cargando roles...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {roles?.map(role => (
                        <RoleCard
                            key={role.id}
                            role={role}
                            onEdit={() => setEditRole(role)}
                            onDelete={() => handleDelete(role)}
                        />
                    ))}
                </div>
            )}
            {/* Modal para crear */}
            <RoleModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleCreate}
                loading={createRole.isPending}
                title="Nuevo Rol"
            />
            {/* Modal para editar */}
            <RoleModal
                open={!!editRole}
                onClose={() => setEditRole(null)}
                onSubmit={handleEdit}
                loading={updateRole.isPending}
                initialValues={editRole ?? undefined}
                title="Editar Rol"
            />
        </div>
    );
} 