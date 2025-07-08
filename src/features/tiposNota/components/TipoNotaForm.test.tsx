import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TipoNotaForm } from './TipoNotaForm';

jest.mock('../hooks/useCreateTipoNota', () => ({
    useCreateTipoNota: () => ({
        mutate: jest.fn((_, { onSuccess }) => onSuccess && onSuccess()),
        isPending: false,
    }),
}));

describe('TipoNotaForm', () => {
    const defaultProps = {
        cursoId: 1,
        onCreated: jest.fn(),
    };

    it('renderiza el input y el botón', () => {
        render(<TipoNotaForm {...defaultProps} />);
        expect(screen.getByPlaceholderText('Nombre del tipo de nota')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
    });

    it('no llama a onCreated si el nombre está vacío', () => {
        render(<TipoNotaForm {...defaultProps} />);
        fireEvent.click(screen.getByRole('button', { name: /agregar/i }));
        expect(defaultProps.onCreated).not.toHaveBeenCalled();
    });

    it('llama a onCreated al guardar un nombre válido', async () => {
        render(<TipoNotaForm {...defaultProps} />);
        fireEvent.change(screen.getByPlaceholderText('Nombre del tipo de nota'), { target: { value: 'Examen' } });
        fireEvent.click(screen.getByRole('button', { name: /agregar/i }));
        await waitFor(() => {
            expect(defaultProps.onCreated).toHaveBeenCalled();
        });
    });
}); 