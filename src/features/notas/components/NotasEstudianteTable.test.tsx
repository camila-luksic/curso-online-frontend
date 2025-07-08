import { render, screen } from '@testing-library/react';
import { NotasEstudianteTable } from './NotasEstudianteTable';

jest.mock('../hooks/useNotas', () => ({
    useNotas: (inscripcionId: number) => ({
        data: inscripcionId === 1 ? [
            { id: 1, valor: 8, tipoNota: { id: 1, nombre: 'Examen' } },
            { id: 2, valor: 7, tipoNota: { id: 2, nombre: 'Tarea' } },
        ] : [],
        isLoading: false,
        isError: false,
    }),
}));

describe('NotasEstudianteTable', () => {
    it('renderiza las notas correctamente', () => {
        render(<NotasEstudianteTable inscripcionId={1} />);
        expect(screen.getByText('Examen')).toBeInTheDocument();
        expect(screen.getByText('Tarea')).toBeInTheDocument();
        expect(screen.getByText('8')).toBeInTheDocument();
        expect(screen.getByText('7')).toBeInTheDocument();
    });

    it('muestra mensaje si no hay notas', () => {
        render(<NotasEstudianteTable inscripcionId={2} />);
        expect(screen.getByText('No hay notas.')).toBeInTheDocument();
    });
}); 