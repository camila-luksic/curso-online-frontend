import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Header público responsive */}
            <header className='bg-white shadow-sm border-b border-gray-200'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center h-16'>
                        <div className='flex items-center'>
                            <h1 className='text-xl font-semibold text-gray-900'>
                                Curso Online
                            </h1>
                        </div>

                        {/* Navegación desktop */}
                        <nav className='hidden md:flex space-x-4'>
                            <a
                                href='/'
                                className='text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium'
                            >
                                Inicio
                            </a>
                            <a
                                href='/cursos'
                                className='text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium'
                            >
                                Cursos
                            </a>
                            <a
                                href='/login'
                                className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700'
                            >
                                Iniciar Sesión
                            </a>
                        </nav>

                        {/* Botón hamburguesa para móvil */}
                        <div className='md:hidden'>
                            <button
                                type='button'
                                className='text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700'
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <svg
                                    className='h-6 w-6'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    {isMobileMenuOpen ? (
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M6 18L18 6M6 6l12 12'
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M4 6h16M4 12h16M4 18h16'
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Menú móvil */}
                    {isMobileMenuOpen && (
                        <div className='md:hidden'>
                            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200'>
                                <a
                                    href='/'
                                    className='text-gray-500 hover:text-gray-700 block px-3 py-2 text-base font-medium'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Inicio
                                </a>
                                <a
                                    href='/cursos'
                                    className='text-gray-500 hover:text-gray-700 block px-3 py-2 text-base font-medium'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Cursos
                                </a>
                                <a
                                    href='/login'
                                    className='bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Iniciar Sesión
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Contenido principal */}
            <main>
                <Outlet />
            </main>

            {/* Footer público */}
            <footer className='bg-white border-t border-gray-200'>
                <div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                        <div>
                            <h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>
                                Plataforma
                            </h3>
                            <p className='mt-4 text-base text-gray-500'>
                                La mejor plataforma de cursos online para
                                aprender a tu ritmo.
                            </p>
                        </div>
                        <div>
                            <h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>
                                Cursos
                            </h3>
                            <ul className='mt-4 space-y-4'>
                                <li>
                                    <a
                                        href='#'
                                        className='text-base text-gray-500 hover:text-gray-900'
                                    >
                                        Programación
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='text-base text-gray-500 hover:text-gray-900'
                                    >
                                        Diseño
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='text-base text-gray-500 hover:text-gray-900'
                                    >
                                        Marketing
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>
                                Soporte
                            </h3>
                            <ul className='mt-4 space-y-4'>
                                <li>
                                    <a
                                        href='#'
                                        className='text-base text-gray-500 hover:text-gray-900'
                                    >
                                        Centro de Ayuda
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='text-base text-gray-500 hover:text-gray-900'
                                    >
                                        Contacto
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='text-base text-gray-500 hover:text-gray-900'
                                    >
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>
                                Legal
                            </h3>
                            <ul className='mt-4 space-y-4'>
                                <li>
                                    <a
                                        href='#'
                                        className='text-base text-gray-500 hover:text-gray-900'
                                    >
                                        Privacidad
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='text-base text-gray-500 hover:text-gray-900'
                                    >
                                        Términos
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='text-base text-gray-500 hover:text-gray-900'
                                    >
                                        Cookies
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='mt-8 border-t border-gray-200 pt-8'>
                        <p className='text-base text-gray-400 text-center'>
                            © 2024 Curso Online. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
