export const Footer = () => {
    return (
        <footer className='bg-white border-t border-gray-200 mt-auto'>
            <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center'>
                    <p className='text-sm text-gray-500'>
                        © 2024 Curso Online. Todos los derechos reservados.
                    </p>
                    <div className='flex space-x-6'>
                        <a
                            href='#'
                            className='text-sm text-gray-500 hover:text-gray-700'
                        >
                            Política de Privacidad
                        </a>
                        <a
                            href='#'
                            className='text-sm text-gray-500 hover:text-gray-700'
                        >
                            Términos de Servicio
                        </a>
                        <a
                            href='#'
                            className='text-sm text-gray-500 hover:text-gray-700'
                        >
                            Soporte
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
