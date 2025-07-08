import { FaBookOpen, FaChalkboardTeacher, FaPlus, FaUserGraduate } from 'react-icons/fa';
import { useAuth } from '../../core/hooks/useAuth';
import { useCursos } from '../courses/hooks/useCursos';

const widgetStyles = [
    'from-blue-400 to-blue-300',
    'from-green-400 to-green-300',
];

export default function TeacherDashboardPage() {
    const { data: cursos = [], isLoading } = useCursos();
    const { usuario } = useAuth();
    const misCursos = usuario ? cursos.filter(c => c.profesorId === usuario.id) : [];
    const initials = usuario ? (usuario.nombre[0] + (usuario.apellido?.[0] || '')) : 'P';

    const stats = [
        { label: 'Cursos dictados', value: isLoading ? '...' : misCursos.length, icon: <FaBookOpen />, bg: widgetStyles[0] },
        { label: 'Inscripciones recientes', value: 'No disponible', icon: <FaUserGraduate />, bg: widgetStyles[1] },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Bienvenida con avatar y fondo decorativo */}
            <div className="relative bg-gradient-to-r from-blue-500 to-green-400 rounded-2xl p-8 mb-10 shadow-lg overflow-hidden">
                <div className="absolute right-0 top-0 opacity-20 text-[8rem] pointer-events-none select-none">🎓</div>
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-green-200">
                        {initials}
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-white mb-1 drop-shadow">¡Hola, {usuario?.nombre || 'Profesor'}!</h1>
                        <p className="text-green-100 text-lg">Gestiona tus cursos y revisa la actividad reciente.</p>
                    </div>
                </div>
            </div>

            {/* Widgets de resumen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {stats.map((stat) => (
                    <div key={stat.label} className={`rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center bg-gradient-to-br ${stat.bg} text-white transition-transform hover:scale-105 duration-200`}>
                        <div className="text-3xl mb-2 drop-shadow-lg">{stat.icon}</div>
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-lg font-medium tracking-wide">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Accesos rápidos */}
            <div className="mb-10 flex gap-4">
                <a href="/profesor/cursos" className="btn btn-primary shadow-md hover:scale-105 transition-transform flex items-center gap-2"><FaChalkboardTeacher /> Ver mis cursos</a>
                <a href="/profesor/cursos" className="btn btn-success shadow-md hover:scale-105 transition-transform flex items-center gap-2"><FaPlus /> Nuevo Curso</a>
            </div>

            {/* Lista de cursos a cargo */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
                <h2 className="text-lg font-semibold mb-2 text-green-800">Mis cursos</h2>
                {isLoading ? (
                    <div>Cargando cursos...</div>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {misCursos.map(curso => (
                            <li key={curso.id} className="py-3 flex justify-between items-center">
                                <span className="font-medium">{curso.titulo}</span>
                            </li>
                        ))}
                        {misCursos.length === 0 && <li className="py-3 text-gray-500">No tienes cursos asignados.</li>}
                    </ul>
                )}
            </div>
        </div>
    );
} 