import { BaseLayout } from './BaseLayout';

export const AdminLayout = () => {
    const sidebarItems = [
        {
            label: 'Dashboard',
            path: '/admin/dashboard',
            icon: 'dashboard',
        },
        {
            label: 'Cursos',
            path: '/admin/cursos',
            icon: 'courses',
        },
        {
            label: 'Categorías',
            path: '/admin/categorias',
            icon: 'categories',
        },
        {
            label: 'Usuarios',
            path: '/admin/usuarios',
            icon: 'users',
        },
        {
            label: 'Roles',
            path: '/admin/roles',
            icon: 'roles',
        },
        {
            label: 'Reportes',
            path: '/admin/reports',
            icon: 'reports',
        },
        {
            label: 'Configuración',
            path: '/admin/settings',
            icon: 'settings',
        },
    ];

    return (
        <BaseLayout
            sidebarItems={sidebarItems}
            title='Admin'
        />
    );
};
