import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BoletoStep } from '../BoletoStep';
import { renderWithIntl } from '@/lib/test/render';

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  Link: ({ children, href, className }: any) => <a href={href} className={className}>{children}</a>,
}));

describe('BoletoStep', () => {
  it('renderiza o link do boleto e permite clicar', () => {
    renderWithIntl(
      <BoletoStep boleto={{ bankSlipUrl: "http://boleto.url" }} />
    );

    const link = screen.getByRole('link', { name: /Abrir boleto/i });
    expect(link).toHaveAttribute('href', 'http://boleto.url');
  });

  it('exibe mensagem se não houver url', () => {
    renderWithIntl(
      <BoletoStep boleto={null} />
    );

    const links = screen.queryAllByRole('link', { name: /Abrir boleto/i });
    expect(links).toHaveLength(0);
  });
});
