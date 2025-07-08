import { FaBook, FaTags, FaUsers, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../../core/hooks/useAuth';
import { useCategories } from '../categories/hooks/useCategories';
import { useCursos } from '../courses/hooks/useCursos';
import { useRoles } from '../roles/hooks/useRoles';
import { useUsers } from '../users/hooks/useUsers';

const widgetStyles = [
    'from-blue-500 to-blue-400',
    'from-green-500 to-green-400',
    'from-yellow-500 to-yellow-400',
    'from-purple-500 to-purple-400',
];

export default function AdminDashboardPage() {
    const { data: users = [], isLoading: loadingUsers } = useUsers();
    const { data: cursos = [], isLoading: loadingCursos } = useCursos();
    const { data: categories = [], isLoading: loadingCategories } = useCategories();
    const { data: roles = [], isLoading: loadingRoles } = useRoles();
    const { usuario } = useAuth();

    const stats = [
        { label: 'Usuarios', value: loadingUsers ? '...' : users.length, icon: <FaUsers />, bg: widgetStyles[0] },
        { label: 'Cursos', value: loadingCursos ? '...' : cursos.length, icon: <FaBook />, bg: widgetStyles[1] },
        { label: 'Categorías', value: loadingCategories ? '...' : categories.length, icon: <FaTags />, bg: widgetStyles[2] },
        { label: 'Roles', value: loadingRoles ? '...' : roles.length, icon: <FaUserShield />, bg: widgetStyles[3] },
    ];

    const initials = usuario ? (usuario.nombre[0] + (usuario.apellido?.[0] || '')) : 'A';

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Bienvenida con avatar y fondo decorativo */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-10 shadow-lg overflow-hidden">
                <div className="absolute right-0 top-0 opacity-20 text-[10rem] pointer-events-none select-none">👋</div>
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-blue-200">
                        {initials}
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-white mb-1 drop-shadow">¡Hola, {usuario?.nombre || 'Administrador'}!</h1>
                        <p className="text-blue-100 text-lg">Gestiona la plataforma y visualiza métricas clave.</p>
                    </div>
                </div>
            </div>

            {/* Widgets de resumen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {stats.map((stat) => (
                    <div key={stat.label} className={`rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center bg-gradient-to-br ${stat.bg} text-white transition-transform hover:scale-105 duration-200`}>
                        <div className="text-4xl mb-2 drop-shadow-lg">{stat.icon}</div>
                        <div className="text-3xl font-bold mb-1">{stat.value}</div>
                        <div className="text-lg font-medium tracking-wide">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Accesos rápidos */}
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-blue-700">Accesos rápidos</h2>
                <div className="flex flex-wrap gap-4">
                    <a href="/admin/usuarios" className="btn btn-primary shadow-md hover:scale-105 transition-transform">Gestionar Usuarios</a>
                    <a href="/admin/cursos" className="btn btn-success shadow-md hover:scale-105 transition-transform">Gestionar Cursos</a>
                    <a href="/admin/categorias" className="btn btn-warning shadow-md hover:scale-105 transition-transform">Gestionar Categorías</a>
                    <a href="/admin/roles" className="btn btn-info shadow-md hover:scale-105 transition-transform">Gestionar Roles</a>
                </div>
            </div>

            {/* Sección de métricas o reportes */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                <h2 className="text-xl font-semibold mb-2 text-blue-800">Métricas generales</h2>
                <p className="text-gray-500">Aquí puedes agregar gráficos, reportes o información relevante para la administración.</p>
            </div>
        </div>
    );
} 