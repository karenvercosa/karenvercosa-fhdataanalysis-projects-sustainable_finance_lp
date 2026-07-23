import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithIntl } from '@/lib/test/render';
import { Matriz } from '../Matriz';

describe('Matriz', () => {
  it('renderiza os três caminhos de engajamento', () => {
    renderWithIntl(<Matriz />);
    expect(screen.getByText('Plano Gratuito')).toBeInTheDocument();
    expect(screen.getByText('Participante Premium')).toBeInTheDocument();
    expect(screen.getByText('Patrocinadores e Curadores')).toBeInTheDocument();
  });

  it('renderiza os CTAs de cadastro/assinatura como links', () => {
    renderWithIntl(<Matriz />);
    const links = screen.getAllByRole('link');
    // Membro e assinatura viram <a>; contato vira <button> (SponsorButton).
    expect(links.length).toBeGreaterThanOrEqual(2);
    expect(links.some((a) => a.getAttribute('href')?.includes('localhost:3001'))).toBe(true);
  });

  it('lista os benefícios de cada caminho', () => {
    renderWithIntl(<Matriz />);
    expect(
      screen.getAllByText('Transmissões ao vivo no dia do evento').length,
    ).toBeGreaterThan(0);
  });
});
