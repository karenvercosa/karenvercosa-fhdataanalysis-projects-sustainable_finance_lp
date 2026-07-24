import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PixStep } from '../PixStep';
import { renderWithIntl } from '@/lib/test/render';

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  Link: ({ children, href, className }: any) => <a href={href} className={className}>{children}</a>,
}));

describe('PixStep', () => {
  it('renderiza os dados e chama onCopy', () => {
    const onCopy = vi.fn();
    renderWithIntl(
      <PixStep
        pix={{ payload: 'pix-123', encodedImage: 'base64' }}
        copied={false}
        onCopy={onCopy}
      />
    );

    expect(screen.getByDisplayValue('pix-123')).toBeInTheDocument();
    
    const btnCopiar = screen.getByRole('button', { name: /Copiar/i });
    fireEvent.click(btnCopiar);
    expect(onCopy).toHaveBeenCalled();
  });

  it('exibe Copiado quando copied=true', () => {
    renderWithIntl(
      <PixStep
        pix={{ payload: 'pix-123', encodedImage: 'base64' }}
        copied={true}
        onCopy={vi.fn()}
      />
    );

    expect(screen.getByText('Copiado!')).toBeInTheDocument();
  });
});
