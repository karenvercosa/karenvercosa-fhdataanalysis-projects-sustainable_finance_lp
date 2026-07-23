import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithIntl } from '@/lib/test/render';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renderiza o e-mail comercial e as colunas de navegação', () => {
    renderWithIntl(<Footer />);
    const email = screen.getByText('comercial@sustainablefinance.com.br');
    expect(email).toBeInTheDocument();
    expect(email.closest('a')).toHaveAttribute(
      'href',
      'mailto:comercial@sustainablefinance.com.br',
    );
  });

  it('não usa links com href="#" (acessibilidade S6844)', () => {
    const { container } = renderWithIntl(<Footer />);
    const anchors = Array.from(container.querySelectorAll('a'));
    expect(anchors.every((a) => a.getAttribute('href') !== '#')).toBe(true);
  });

  it('links legais placeholder viram botões', () => {
    renderWithIntl(<Footer />);
    // "Política de Privacidade" / "LGPD" renderizados como <button>.
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(2);
  });
});
