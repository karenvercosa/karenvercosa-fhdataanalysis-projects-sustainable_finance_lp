import { render, screen, fireEvent, renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
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

  it('envia o lead via API e mostra o estado de sucesso', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    global.fetch = fetchMock;

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
    
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(fetchMock).toHaveBeenCalledWith('/api/patrocinador', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        nome: 'Fulano',
        email: 'fulano@acme.com',
        empresa: 'ACME',
        cargo: '',
        telefone: ''
      })
    }));

    // O formulário some após o fetch, mas o estado real de sucesso demora 2200ms
    act(() => {
      vi.advanceTimersByTime(2200);
    });

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
