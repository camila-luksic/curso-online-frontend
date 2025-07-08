import { BaseLayout } from './BaseLayout';

export const StudentLayout = () => {
    const sidebarItems = [
        {
            label: 'Dashboard',
            path: '/estudiantes/dashboard',
            icon: 'dashboard',
        },
        {
            label: 'Cursos',
            path: '/estudiantes/cursos',
            icon: 'courses',
        },
        {
            label: 'Mis Cursos',
            path: '/estudiantes/mis-cursos',
            icon: 'courses',
        },
        {
            label: 'Progreso',
            path: '/students/progress',
            icon: 'progress',
        },
        {
            label: 'Calificaciones',
            path: '/students/grades',
            icon: 'grades',
        },
        {
            label: 'Certificados',
            path: '/students/certificates',
            icon: 'certificates',
        },
        {
            label: 'Perfil',
            path: '/students/profile',
            icon: 'profile',
        },
    ];

    return (
        <BaseLayout sidebarItems={sidebarItems} title='Panel de Estudiante' />
    );
};
