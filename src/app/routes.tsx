import { ProtectedRoute } from '@/core/components/ProtectedRoute';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import CategoryListPage from '@/features/categories/pages/CategoryListPage';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { useRoutes } from 'react-router-dom';
import CursoListPage from '../features/courses/pages/CursoListPage';
import VideoDetailPage from '../features/courses/pages/VideoDetailPage';

import AdminDashboardPage from '../features/admin/AdminDashboardPage';
import { CourseDetailRouter } from '../features/courses/components/CourseDetailRouter';
import CursoPublicListPage from '../features/home/components/CursoPublicListPage';
import HomePage from '../features/home/pages/HomePage';
import NotasGestionPage from '../features/notas/pages/NotasGestionPage';
import RoleListPage from '../features/roles/pages/RoleListPage';
import StudentDashboardPage from '../features/students/StudentDashboardPage';
import TeacherDashboardPage from '../features/teachers/TeacherDashboardPage';
import UserListPage from '../features/users/pages/UserListPage';
import { StudentLayout } from '../layouts/StudentLayout';
import TeacherLayout from '../layouts/TeacherLayout';
// ...otros imports

export default function AppRoutes() {
  return useRoutes([
    {
      element: <PublicLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/register', element: <RegisterPage /> },
        { path: '/cursos', element: <CursoPublicListPage /> },
        // { path: '/cursos/:id', element: <CourseDetailRouter /> }, // Quitado del PublicLayout
      ],
    },
    // Rutas para usuarios autenticados
    { path: '/cursos/:cursoId/videos/:videoId', element: <VideoDetailPage /> },
    { path: '/cursos/:id', element: <CourseDetailRouter /> }, // Agregado al nivel raíz
    {
      path: '/cursos/:cursoId/gestion-notas',
      element: (
        <ProtectedRoute allowedRoles={['ADMIN', 'PROF']}>
          <NotasGestionPage />
        </ProtectedRoute>
      )
    },
    // Dashboards o layouts específicos por rol
    {
      path: '/admin',
      element: (
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <AdminDashboardPage /> },
        { path: 'dashboard', element: <AdminDashboardPage /> },
        { path: 'categorias', element: <CategoryListPage /> },
        { path: 'roles', element: <RoleListPage /> },
        { path: 'usuarios', element: <UserListPage /> },
        { path: 'cursos', element: <CursoListPage /> },

        // ...otras rutas de gestión solo para admin
      ],
    },
    {
      path: '/estudiantes',
      element: (
        <ProtectedRoute allowedRoles={['EST']}>
          <StudentLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <StudentDashboardPage /> },
        { path: 'dashboard', element: <StudentDashboardPage /> },
        { path: 'mis-cursos', element: <CursoListPage onlyMyCourses /> },
        { path: 'cursos', element: <CursoListPage /> },

      ],
    },
    {
      path: '/profesor',
      element: (
        <ProtectedRoute allowedRoles={['PROF']}>
          <TeacherLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <TeacherDashboardPage /> },
        { path: 'dashboard', element: <TeacherDashboardPage /> },
        { path: 'cursos', element: <CursoListPage /> },
      ],
    },
    { path: '*', element: <HomePage /> }
  ]);
}
