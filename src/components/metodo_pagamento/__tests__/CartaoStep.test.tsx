import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartaoStep } from '../CartaoStep';
import { renderWithIntl } from '@/lib/test/render';

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  Link: ({ children, href, className }: any) => <a href={href} className={className}>{children}</a>,
}));

describe('CartaoStep', () => {
  it('renderiza todos os campos e permite interagir', () => {
    const onCardChange = vi.fn().mockImplementation(() => vi.fn());
    const onTitularChange = vi.fn().mockImplementation(() => vi.fn());
    const onPagar = vi.fn();

    renderWithIntl(
      <CartaoStep
        card={{ holderName: '', number: '', expiryMonth: '', expiryYear: '', ccv: '' }}
        onCardChange={onCardChange}
        titular={{ postalCode: '', addressNumber: '' }}
        onTitularChange={onTitularChange}
        submitting={false}
        errorMsg={null}
        onPagar={onPagar}
      />
    );

    const btnPagar = screen.getByRole('button', { name: /Realizar pagamento/i });
    fireEvent.click(btnPagar);
    expect(onPagar).toHaveBeenCalled();
  });

  it('mostra mensagem de erro', () => {
    renderWithIntl(
      <CartaoStep
        card={{ holderName: '', number: '', expiryMonth: '', expiryYear: '', ccv: '' }}
        onCardChange={vi.fn()}
        titular={{ postalCode: '', addressNumber: '' }}
        onTitularChange={vi.fn()}
        submitting={false}
        errorMsg="Erro no cartão"
        onPagar={vi.fn()}
      />
    );
    expect(screen.getByText('Erro no cartão')).toBeInTheDocument();
  });
});
