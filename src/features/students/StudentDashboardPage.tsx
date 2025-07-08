import { FaBook, FaChartLine, FaSearch, FaUserGraduate } from 'react-icons/fa';
import { useAuth } from '../../core/hooks/useAuth';
import { useMisCursos } from '../enrollments/hooks/useMisCursos';

const widgetStyles = [
    'from-blue-400 to-blue-300',
    'from-green-400 to-green-300',
];

export default function StudentDashboardPage() {
    const { data: inscripciones = [], isLoading } = useMisCursos();
    const { usuario } = useAuth();
    const initials = usuario ? (usuario.nombre[0] + (usuario.apellido?.[0] || '')) : 'E';

    const progresoPromedio = 0;

    const stats = [
        { label: 'Cursos inscritos', value: isLoading ? '...' : inscripciones.length, icon: <FaBook />, bg: widgetStyles[0] },
        { label: 'Progreso promedio', value: isLoading ? '...' : `${progresoPromedio}%`, icon: <FaChartLine />, bg: widgetStyles[1] },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Bienvenida con avatar y fondo decorativo */}
            <div className="relative bg-gradient-to-r from-blue-500 to-green-400 rounded-2xl p-8 mb-10 shadow-lg overflow-hidden">
                <div className="absolute right-0 top-0 opacity-20 text-[8rem] pointer-events-none select-none">🎒</div>
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-blue-200">
                        {initials}
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-white mb-1 drop-shadow">¡Hola, {usuario?.nombre || 'Estudiante'}!</h1>
                        <p className="text-green-100 text-lg">Consulta tu progreso y accede rápidamente a tus cursos.</p>
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
                <a href="/estudiantes/mis-cursos" className="btn btn-primary shadow-md hover:scale-105 transition-transform flex items-center gap-2"><FaUserGraduate /> Ver mis cursos</a>
                <a href="/estudiantes/cursos" className="btn btn-success shadow-md hover:scale-105 transition-transform flex items-center gap-2"><FaSearch /> Explorar cursos</a>
            </div>

            {/* Lista de cursos inscritos */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                <h2 className="text-lg font-semibold mb-2 text-blue-800">Mis cursos inscritos</h2>
                {isLoading ? (
                    <div>Cargando cursos...</div>
                ) : inscripciones.length === 0 ? (
                    <div className="text-gray-500">No estás inscrito en ningún curso.</div>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {inscripciones.map(insc => (
                            <li key={insc.id} className="py-3 flex justify-between items-center">
                                <span className="font-medium">{insc.curso.titulo}</span>
                                {/* Puedes agregar más info aquí si lo deseas */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
} 