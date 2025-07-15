import { useState } from 'react';
import { UserCard } from '../components/UserCard';
import type { UserFormValues } from '../components/UserForm';
import { UserModal } from '../components/UserModal';
import { UpdatePasswordModal } from '../components/UpdatePasswordModal';
import { useCreateUser } from '../hooks/useCreateUser';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useUpdatePassword } from '../hooks/useUpdatePassword';
import { useUsers } from '../hooks/useUsers';
import type { User } from '../types/userTypes';

export default function UserListPage() {
    const { data: users, isLoading, error } = useUsers();
    const createUser = useCreateUser();
    const updateUser = useUpdateUser();
    const updatePassword = useUpdatePassword();
    const deleteUser = useDeleteUser();

    const [modalOpen, setModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [selectedUserForPassword, setSelectedUserForPassword] = useState<User | null>(null);

    const handleCreate = (data: UserFormValues) => {
        if (!data.password) {
            alert('La contraseña es obligatoria');
            return;
        }
        // Forzar password como string para CreateUserInput
        const payload = { ...data, password: data.password || '' };
        createUser.mutate(payload, { onSuccess: () => setModalOpen(false) });
    };

    const handleEdit = (data: UserFormValues) => {
        const { password, ...rest } = data;
        if (editUser) {
            updateUser.mutate({ id: editUser.id, input: rest }, { onSuccess: () => setEditUser(null) });
        }
    };

    const handleChangePassword = (data: { newPassword: string }) => {
        if (selectedUserForPassword) {
            updatePassword.mutate(
                { id: selectedUserForPassword.id, newPassword: data.newPassword },
                { onSuccess: () => setPasswordModalOpen(false) }
            );
        }
    };

    const handleDelete = (user: User) => {
        if (window.confirm(`¿Eliminar el usuario "${user.nombre} ${user.apellido}"?`)) {
            deleteUser.mutate(user.id);
        }
    };

    const openPasswordModal = (user: User) => {
        setSelectedUserForPassword(user);
        setPasswordModalOpen(true);
    };

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Usuarios</h1>
                <button className="btn btn-primary" onClick={() => setModalOpen(true)} data-cy="new-user-button">
                    + Nuevo Usuario
                </button>
            </div>
            {isLoading ? (
                <div>Cargando usuarios...</div>
            ) : error ? (
                <div className="text-red-500">Error al cargar usuarios</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {users?.map(user => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onEdit={() => setEditUser(user)}
                            onChangePassword={() => openPasswordModal(user)}
                            onDelete={() => handleDelete(user)}
                        />
                    ))}
                </div>
            )}
            {/* Modal para crear */}
            <UserModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleCreate}
                loading={createUser.isPending}
                title="Nuevo Usuario"
                isEdit={false}
            />
            {/* Modal para editar */}
            <UserModal
                open={!!editUser}
                onClose={() => setEditUser(null)}
                onSubmit={handleEdit}
                loading={updateUser.isPending}
                initialValues={
                    editUser
                        ? {
                            ...editUser,
                            rolId: editUser.rol.id,
                        }
                        : undefined
                }
                title="Editar Usuario"
                isEdit
            />
            {/* Modal para cambiar contraseña */}
            <UpdatePasswordModal
                open={passwordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
                onSubmit={handleChangePassword}
                loading={updatePassword.isPending}
                userName={selectedUserForPassword ? `${selectedUserForPassword.nombre} ${selectedUserForPassword.apellido}` : undefined}
            />
        </div>
    );
} 