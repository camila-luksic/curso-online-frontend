import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../core/components/layout/Footer';
import { Header } from '../core/components/layout/Header';
import { Sidebar } from '../core/components/layout/Sidebar';

interface BaseLayoutProps {
    sidebarItems?: Array<{
        label: string;
        path: string;
        icon?: string;
    }>;
    title?: string;
}

export const BaseLayout = ({
    sidebarItems = [],
    title = 'Dashboard',
}: BaseLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Header con botón hamburguesa en mobile */}
            <Header title={title}>
                {sidebarItems.length > 0 && (
                    <button
                        className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Abrir menú"
                    >
                        <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                )}
            </Header>

            <div className='flex'>
                {/* Sidebar */}
                <Sidebar items={sidebarItems} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Main Content */}
                <main className='flex-1 p-6 w-full'>
                    <div className='max-w-[1200px] mx-auto'>
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};
