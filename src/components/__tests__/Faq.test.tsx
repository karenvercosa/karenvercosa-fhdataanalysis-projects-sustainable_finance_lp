import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithIntl } from '@/lib/test/render';
import { Faq } from '../Faq';

describe('Faq', () => {
  it('renderiza as perguntas com a primeira aberta', () => {
    renderWithIntl(<Faq />);
    expect(screen.getByText('O acesso online é gratuito?')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
  });

  it('acordeão exclusivo: abrir uma fecha a anterior', () => {
    renderWithIntl(<Faq />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    // Clicar de novo na mesma fecha (open === i → null).
    fireEvent.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
  });
});
