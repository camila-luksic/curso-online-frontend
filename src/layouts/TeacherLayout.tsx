import { BaseLayout } from './BaseLayout';

export const TeacherLayout = () => {
    const sidebarItems = [
        {
            label: 'Dashboard',
            path: '/profesor/dashboard',
            icon: 'dashboard',
        },
        {
            label: 'Mis Cursos',
            path: '/profesor/cursos',
            icon: 'courses',
        },
        {
            label: 'Estudiantes',
            path: '/teachers/students',
            icon: 'students',
        },
        {
            label: 'Calificaciones',
            path: '/teachers/grades',
            icon: 'grades',
        },
        {
            label: 'Materiales',
            path: '/teachers/materials',
            icon: 'materials',
        },
        {
            label: 'Estadísticas',
            path: '/teachers/statistics',
            icon: 'statistics',
        },
    ];

    return (
        <BaseLayout sidebarItems={sidebarItems} title='Panel de Profesor' />
    );
};

export default TeacherLayout;
