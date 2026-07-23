import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithIntl } from '@/lib/test/render';

// A navegação do next-intl depende do router do Next; mockamos para o jsdom.
const replace = vi.fn();
vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ replace }),
}));

import { Header } from '../Header';

describe('Header', () => {
  beforeEach(() => replace.mockClear());

  it('renderiza os links de navegação e o CTA', () => {
    renderWithIntl(<Header />, { withSponsorModal: false });
    expect(screen.getAllByText('Cadastre-se').length).toBeGreaterThan(0);
  });

  it('troca o idioma chamando router.replace', () => {
    renderWithIntl(<Header />, { withSponsorModal: false });
    const en = screen.getAllByRole('button', { name: 'EN' })[0];
    fireEvent.click(en);
    expect(replace).toHaveBeenCalledWith('/', { locale: 'en' });
  });

  it('abre e fecha o menu mobile', () => {
    renderWithIntl(<Header />, { withSponsorModal: false });
    const toggle = screen.getByRole('button', { name: 'Abrir menu' });
    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toBeInTheDocument();
  });
});
