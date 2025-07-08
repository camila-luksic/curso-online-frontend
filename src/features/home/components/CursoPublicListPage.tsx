import { getCursoImageUrl } from '@/core/utils/image';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../categories/hooks/useCategories';
import { useCursos } from '../../courses/hooks/useCursos';

export default function CursoPublicListPage() {
    const { data: cursos = [], isLoading: cursosLoading } = useCursos();
    const { data: categorias = [], isLoading: categoriasLoading } = useCategories();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);

    // Filtrar cursos por categoría seleccionada
    const cursosFiltrados = categoriaSeleccionada
        ? cursos.filter(curso => curso.categoria.id === categoriaSeleccionada)
        : cursos;

    const handleCategoriaClick = (categoriaId: number) => {
        setCategoriaSeleccionada(categoriaId === categoriaSeleccionada ? null : categoriaId);
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Explora Nuestros Cursos</h1>
                <p className="text-lg text-gray-600">
                    Descubre cursos de calidad creados por expertos en cada materia
                </p>
            </div>

            {/* Sección de Categorías */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Categorías</h2>
                {categoriasLoading ? (
                    <div className="text-center py-4">Cargando categorías...</div>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setCategoriaSeleccionada(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${categoriaSeleccionada === null
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Todos
                        </button>
                        {categorias.map(categoria => (
                            <button
                                key={categoria.id}
                                onClick={() => handleCategoriaClick(categoria.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${categoriaSeleccionada === categoria.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {categoria.nombre}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Resultados del filtro */}
            {categoriaSeleccionada && (
                <div className="mb-6">
                    <p className="text-gray-600">
                        Mostrando {cursosFiltrados.length} curso{cursosFiltrados.length !== 1 ? 's' : ''}
                        {categorias.find(c => c.id === categoriaSeleccionada) &&
                            ` en ${categorias.find(c => c.id === categoriaSeleccionada)?.nombre}`
                        }
                    </p>
                </div>
            )}

            {/* Lista de Cursos */}
            {cursosLoading ? (
                <div className="text-center py-8">Cargando cursos...</div>
            ) : cursosFiltrados.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">
                        {categoriaSeleccionada
                            ? 'No hay cursos disponibles en esta categoría.'
                            : 'No hay cursos disponibles.'
                        }
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cursosFiltrados.map(curso => (
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
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600">
                                        {curso.titulo}
                                    </h3>
                                </Link>
                                <div className="text-xs text-blue-600 mb-2">{curso.categoria?.nombre}</div>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{curso.descripcion}</p>
                                <div className="mt-auto flex items-center gap-2 text-xs text-neutral-500">
                                    <span>Profesor:</span>
                                    <span className="font-medium text-neutral-700">
                                        {curso.profesor?.nombre} {curso.profesor?.apellido}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

