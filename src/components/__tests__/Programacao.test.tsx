import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithIntl } from '@/lib/test/render';
import { Programacao } from '../Programacao';

describe('Programacao', () => {
  it('renderiza as trilhas com a primeira aberta por padrão', () => {
    renderWithIntl(<Programacao />);
    expect(screen.getByText('Mercado de Capitais & Regulação')).toBeInTheDocument();
    // A primeira trilha começa expandida.
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
  });

  it('alterna o estado de um acordeão ao clicar', () => {
    renderWithIntl(<Programacao />);
    const buttons = screen.getAllByRole('button');
    // Segunda trilha começa fechada.
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    // Fecha a primeira.
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
  });
});
