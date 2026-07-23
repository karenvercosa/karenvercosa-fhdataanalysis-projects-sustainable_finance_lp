import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import ptMessages from '@/messages/pt.json';
import {
  SponsorButton,
  SponsorModalProvider,
  useSponsorModal,
} from '../SponsorContact';

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="pt" messages={ptMessages as never}>
      <SponsorModalProvider>{children}</SponsorModalProvider>
    </NextIntlClientProvider>
  );
}

describe('SponsorContact', () => {
  const realLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
      configurable: true,
    });
  });
  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: realLocation,
      writable: true,
      configurable: true,
    });
  });

  it('useSponsorModal lança erro fora do provider', () => {
    expect(() => renderHook(() => useSponsorModal())).toThrow(
      /SponsorModalProvider/,
    );
  });

  it('abre o modal nativo <dialog> ao clicar no botão', () => {
    render(
      <Wrapper>
        <SponsorButton>Seja patrocinador</SponsorButton>
      </Wrapper>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Seja patrocinador'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('envia o lead por mailto e mostra o estado de sucesso', () => {
    const { container } = render(
      <Wrapper>
        <SponsorButton>Abrir</SponsorButton>
      </Wrapper>,
    );
    fireEvent.click(screen.getByText('Abrir'));

    const inputs = container.querySelectorAll('input');
    fireEvent.change(inputs[0], { target: { value: 'Fulano' } });
    fireEvent.change(inputs[1], { target: { value: 'fulano@acme.com' } });
    fireEvent.change(inputs[2], { target: { value: 'ACME' } });

    const form = container.querySelector('form')!;
    fireEvent.submit(form);

    expect(window.location.href).toContain(
      'mailto:comercial@sustainablefinance.com.br',
    );
    // O formulário some e aparece o estado de sucesso (sem <form>).
    expect(container.querySelector('form')).toBeNull();
  });

  it('fecha o modal com a tecla Escape', () => {
    render(
      <Wrapper>
        <SponsorButton>Abrir</SponsorButton>
      </Wrapper>,
    );
    fireEvent.click(screen.getByText('Abrir'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('fecha ao clicar no backdrop', () => {
    render(
      <Wrapper>
        <SponsorButton>Abrir</SponsorButton>
      </Wrapper>,
    );
    fireEvent.click(screen.getByText('Abrir'));
    // O backdrop é o primeiro botão "Fechar" (aria-label).
    const closeButtons = screen.getAllByRole('button', { name: 'Fechar' });
    fireEvent.click(closeButtons[0]);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
