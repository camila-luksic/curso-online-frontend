import React from 'react';
import { FaBook, FaCertificate, FaChartBar, FaCog, FaFolder, FaGraduationCap, FaKey, FaTachometerAlt, FaTags, FaUser, FaUsers, FaUserShield } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const iconMap: Record<string, React.ReactNode> = {
    dashboard: <FaTachometerAlt />,
    courses: <FaBook />,
    categories: <FaTags />,
    users: <FaUsers />,
    roles: <FaUserShield />,
    key: <FaKey />,
    reports: <FaChartBar />,
    settings: <FaCog />,
    profile: <FaUser />,
    certificates: <FaCertificate />,
    students: <FaGraduationCap />,
    grades: <FaChartBar />,
    progress: <FaChartBar />,
    materials: <FaFolder />,
    statistics: <FaChartBar />,
};

interface SidebarItem {
    label: string;
    path: string;
    icon?: string;
}

interface SidebarProps {
    items: SidebarItem[];
    open?: boolean;
    onClose?: () => void;
}

export const Sidebar = ({ items, open = false, onClose }: SidebarProps) => {
    // Sidebar normal en desktop
    return (
        <>
            {/* Sidebar fijo en desktop */}
            <aside className="hidden md:block w-64 bg-white shadow-sm border-r border-gray-200 h-screen">
                <nav className="mt-5 px-2">
                    <div className="space-y-1">
                        {items.map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `group flex items-center px-5 py-3 text-md font-medium rounded-md transition-colors ${isActive
                                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`
                                }
                            >
                                {item.icon && (
                                    <span className="mr-6 h-6 w-6 flex items-center justify-center text-lg">
                                        {iconMap[item.icon] || <FaFolder />}
                                    </span>
                                )}
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </nav>
            </aside>
            {/* Sidebar overlay en mobile */}
            {open && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="w-64 bg-white shadow-lg h-full">
                        <nav className="mt-5 px-2">
                            <div className="space-y-1">
                                {items.map(item => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                                ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`
                                        }
                                        onClick={onClose}
                                    >
                                        {item.icon && (
                                            <span className="mr-3 h-5 w-5 flex items-center justify-center text-lg">
                                                {iconMap[item.icon] || <FaFolder />}
                                            </span>
                                        )}
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>
                        </nav>
                    </div>
                    {/* Overlay oscuro para cerrar el sidebar */}
                    <div className="flex-1 bg-black bg-opacity-30" onClick={onClose} />
                </div>
            )}
        </>
    );
};
