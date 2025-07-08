import { render, screen } from '@testing-library/react';
import { TiposNotaList } from './TiposNotaList';

jest.mock('../hooks/useTiposNota', () => ({
    useTiposNota: (cursoId: number) => ({
        data: cursoId === 1 ? [
            { id: 1, nombre: 'Examen', cursoId: 1 },
            { id: 2, nombre: 'Tarea', cursoId: 1 },
        ] : [],
        isLoading: false,
        isError: false,
    }),
}));

describe('TiposNotaList', () => {
    it('renderiza los tipos de nota correctamente', () => {
        render(<TiposNotaList cursoId={1} />);
        expect(screen.getByText('Examen')).toBeInTheDocument();
        expect(screen.getByText('Tarea')).toBeInTheDocument();
    });

    it('muestra mensaje si no hay tipos de nota', () => {
        render(<TiposNotaList cursoId={2} />);
        expect(screen.getByText('No hay tipos de nota.')).toBeInTheDocument();
    });
}); 