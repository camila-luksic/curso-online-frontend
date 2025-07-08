import type { ReactNode } from 'react';

interface TableColumn<T> {
    key: string;
    header: string;
    render?: (item: T) => ReactNode;
    sortable?: boolean;
    width?: string;
}

interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    loading?: boolean;
    emptyMessage?: string;
    onRowClick?: (item: T) => void;
    actions?: (item: T) => ReactNode;
    className?: string;
}

export const Table = <T extends Record<string, any>>({
    data,
    columns,
    loading = false,
    emptyMessage = 'No hay datos disponibles',
    onRowClick,
    actions,
    className = '',
}: TableProps<T>) => {
    if (loading) {
        return (
            <div
                className={`bg-white shadow-sm rounded-lg overflow-hidden ${className}`}
            >
                <div className='animate-pulse'>
                    <div className='h-12 bg-gray-200'></div>
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className='h-16 bg-gray-100 border-t border-gray-200'
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div
            className={`bg-white shadow-sm rounded-lg overflow-hidden ${className}`}
        >
            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            {columns.map(column => (
                                <th
                                    key={column.key}
                                    scope='col'
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                        column.width ? column.width : ''
                                    }`}
                                >
                                    {column.header}
                                </th>
                            ))}
                            {actions && (
                                <th
                                    scope='col'
                                    className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                    Acciones
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={
                                        actions
                                            ? columns.length + 1
                                            : columns.length
                                    }
                                    className='px-6 py-12 text-center text-sm text-gray-500'
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                                    onClick={() => onRowClick?.(item)}
                                >
                                    {columns.map(column => (
                                        <td
                                            key={column.key}
                                            className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'
                                        >
                                            {column.render
                                                ? column.render(item)
                                                : item[column.key]}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                            {actions(item)}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
