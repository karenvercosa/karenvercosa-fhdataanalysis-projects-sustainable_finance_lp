import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: any) => <a href={href}>{children}</a>,
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
}));
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
    expect(links.some((a) => a.getAttribute('href')?.includes('/cadastro'))).toBe(true);
  });

  it('lista os benefícios de cada caminho', () => {
    renderWithIntl(<Matriz />);
    expect(
      screen.getAllByText('Transmissões ao vivo no dia do evento').length,
    ).toBeGreaterThan(0);
  });
});
