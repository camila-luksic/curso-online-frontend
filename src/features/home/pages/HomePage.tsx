import { getCursoImageUrl } from '@/core/utils/image';
import { useCursos } from '@/features/courses/hooks/useCursos';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { data: cursos = [], isLoading, error } = useCursos();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <div className="max-w-4xl w-full mx-auto px-4 text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenido a la Plataforma de Cursos Online
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Aprende a tu ritmo con los mejores cursos y profesores. ¡Explora, descubre y comienza hoy mismo!
        </p>
      </div>

      <div className="max-w-4xl w-full mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left">Cursos Destacados</h2>
        {isLoading ? (
          <div className="text-center py-8">Cargando cursos...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">Error al cargar cursos</div>
        ) : cursos.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No hay cursos disponibles.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cursos.slice(0, 6).map(curso => (
              <div key={curso.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                <Link to={`/cursos/${curso.id}`}>
                  <img
                    src={getCursoImageUrl(curso.imagenUrl)}
                    alt={curso.titulo}
                    className="h-40 w-full object-cover"
                    loading="lazy"
                  />
                </Link>
                <div className="p-4 flex-1 flex flex-col">
                  <Link to={`/cursos/${curso.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600">{curso.titulo}</h3>
                  </Link>
                  <div className="text-xs text-blue-600 mb-2">{curso.categoria?.nombre}</div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{curso.descripcion}</p>
                  <div className="mt-auto flex items-center gap-2 text-xs text-neutral-500">
                    <span>Profesor:</span>
                    <span className="font-medium text-neutral-700">{curso.profesor?.nombre} {curso.profesor?.apellido}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-4xl w-full mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cursos de Calidad</h3>
            <p className="text-gray-600">Accede a cursos creados por expertos en cada materia.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aprende a tu Ritmo</h3>
            <p className="text-gray-600">Estudia cuando quieras y desde donde quieras.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificaciones</h3>
            <p className="text-gray-600">Obtén certificados al completar tus cursos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 