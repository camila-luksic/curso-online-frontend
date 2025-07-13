import { ProtectedRoute } from '@/core/components/ProtectedRoute';
import { PublicLayout } from '@/layouts/PublicLayout';
import { useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { LoadingSpinner } from '@/core/components/ui/LoadingSpinner';

const HomePage = lazy(() => import('@/features/home/pages/HomePage'));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));
const CursoListPage = lazy(() => import('@/features/courses/pages/CursoListPage'));
const VideoDetailPage = lazy(() => import('@/features/courses/pages/VideoDetailPage'));
const AdminDashboardPage = lazy(() => import('@/features/admin/AdminDashboardPage'));
const StudentDashboardPage = lazy(() => import('@/features/students/StudentDashboardPage'));
const TeacherDashboardPage = lazy(() => import('@/features/teachers/TeacherDashboardPage'));
const CategoryListPage = lazy(() => import('@/features/categories/pages/CategoryListPage'));
const RoleListPage = lazy(() => import('@/features/roles/pages/RoleListPage'));
const UserListPage = lazy(() => import('@/features/users/pages/UserListPage'));
const CursoPublicListPage = lazy(() => import('@/features/home/components/CursoPublicListPage'));
const NotasGestionPage = lazy(() => import('@/features/notas/pages/NotasGestionPage'));
const CourseDetailRouter = lazy(() => import('@/features/courses/components/CourseDetailRouter'));

import { AdminLayout } from '@/layouts/AdminLayout';
import { StudentLayout } from '@/layouts/StudentLayout';
import TeacherLayout from '@/layouts/TeacherLayout';

const LazyRoute = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner size="xl" text="Cargando..." />
    </div>
  }>
    <Component />
  </Suspense>
);

export default function AppRoutes() {
  return useRoutes([
    {
      element: <PublicLayout />,
      children: [
        { path: '/', element: LazyRoute(HomePage) },
        { path: '/login', element: LazyRoute(LoginPage) },
        { path: '/register', element: LazyRoute(RegisterPage) },
        { path: '/cursos', element: LazyRoute(CursoPublicListPage) },
      ],
    },
    { path: '/cursos/:cursoId/videos/:videoId', element: LazyRoute(VideoDetailPage) },
    { path: '/cursos/:id', element: LazyRoute(CourseDetailRouter) }, // Agregado al nivel raíz
    {
      path: '/cursos/:cursoId/gestion-notas',
      element: (
        <ProtectedRoute allowedRoles={['ADMIN', 'PROF']}>
          {LazyRoute(NotasGestionPage)}
        </ProtectedRoute>
      )
    },
    {
      path: '/admin',
      element: (
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: LazyRoute(AdminDashboardPage) },
        { path: 'dashboard', element: LazyRoute(AdminDashboardPage) },
        { path: 'categorias', element: LazyRoute(CategoryListPage) },
        { path: 'roles', element: LazyRoute(RoleListPage) },
        { path: 'usuarios', element: LazyRoute(UserListPage) },
        { path: 'cursos', element: LazyRoute(CursoListPage) },
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
        { index: true, element: LazyRoute(StudentDashboardPage) },
        { path: 'dashboard', element: LazyRoute(StudentDashboardPage) },
        { path: 'mis-cursos', element: LazyRoute(CursoListPage) },
        { path: 'cursos', element: LazyRoute(CursoListPage) },
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
        { index: true, element: LazyRoute(TeacherDashboardPage) },
        { path: 'dashboard', element: LazyRoute(TeacherDashboardPage) },
        { path: 'cursos', element: LazyRoute(CursoListPage) },
      ],
    },
    { path: '*', element: LazyRoute(HomePage) }
  ]);
}
