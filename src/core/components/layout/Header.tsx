import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
    title?: string;
    children?: ReactNode;
}

function DarkModeToggle() {
    const [isDark, setIsDark] = useState(() =>
        typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
    );

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') document.documentElement.classList.add('dark');
        if (saved === 'light') document.documentElement.classList.remove('dark');
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleDark = () => {
        document.documentElement.classList.toggle('dark');
        const nowDark = document.documentElement.classList.contains('dark');
        setIsDark(nowDark);
        localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    };

    return (
        <button onClick={toggleDark} className="btn btn-secondary ml-2">
            {isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </button>
    );
}

export const Header = ({ title = 'Dashboard', children }: HeaderProps) => {
    const { usuario, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16 w-full">
                    {/* Izquierda: Hamburguesa y Título */}
                    <div className="flex items-center gap-2 min-w-0">
                        {children}
                        <h1 className="text-xl font-semibold text-gray-900 truncate max-w-[120px] sm:max-w-xs">
                            {title}
                        </h1>
                        <DarkModeToggle />
                    </div>
                    {/* Derecha: Menú usuario */}
                    <div className="flex items-center space-x-4 ml-auto">
                        {/* Notificaciones */}
                        <button className="p-2 text-gray-400 hover:text-gray-500">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-5 5v-5z"
                                />
                            </svg>
                        </button>
                        {/* Perfil del Usuario */}
                        {usuario && (
                            <div className="flex items-center space-x-3 min-w-0 relative">
                                <div className="text-right min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-[160px]">
                                        {usuario.nombre} {usuario.apellido}
                                    </p>
                                    <p className="text-xs text-gray-500 capitalize truncate max-w-[100px] sm:max-w-[160px]">
                                        {usuario.rol.nombre}
                                    </p>
                                </div>
                                {/* Avatar */}
                                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                                    <span className="text-sm font-medium text-white">
                                        {usuario.nombre.charAt(0)}
                                        {usuario.apellido.charAt(0)}
                                    </span>
                                </div>
                                {/* Menú de Perfil */}
                                <div className="relative">
                                    <button
                                        className="p-2 text-gray-400 hover:text-gray-500"
                                        onClick={() => setMenuOpen((open) => !open)}
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    {menuOpen && (
                                        <div className="absolute right-0 left-auto mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
