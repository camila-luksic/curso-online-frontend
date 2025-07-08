import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NotaForm } from './NotaForm';

jest.mock('../hooks/useAsignarNota', () => ({
    useAsignarNota: () => ({
        mutate: jest.fn((_, { onSuccess }) => onSuccess && onSuccess()),
        isPending: false,
    }),
}));

describe('NotaForm', () => {
    const defaultProps = {
        inscripcionId: 1,
        tipoNotaId: 2,
        valorInicial: '',
        onSaved: jest.fn(),
    };

    it('renderiza el input y el botón', () => {
        render(<NotaForm {...defaultProps} />);
        expect(screen.getByPlaceholderText('Nota')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument();
    });

    it('no llama a onSaved si el valor está vacío', () => {
        render(<NotaForm {...defaultProps} />);
        fireEvent.click(screen.getByRole('button', { name: /guardar/i }));
        expect(defaultProps.onSaved).not.toHaveBeenCalled();
    });

    it('llama a onSaved al guardar un valor válido', async () => {
        render(<NotaForm {...defaultProps} />);
        fireEvent.change(screen.getByPlaceholderText('Nota'), { target: { value: '8.5' } });
        fireEvent.click(screen.getByRole('button', { name: /guardar/i }));
        await waitFor(() => {
            expect(defaultProps.onSaved).toHaveBeenCalled();
        });
    });
}); 