import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderWithIntl } from '@/lib/test/render';
import AssinaturaPage from '../AssinaturaPage';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, className }: any) => <a href={href} className={className}>{children}</a>,
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
}));

describe('AssinaturaPage', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ pago: false, paymentId: '123', pix: { payload: 'pix_code' } }),
      })
    ) as never;
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renderiza o formulário inicial', () => {
    renderWithIntl(<AssinaturaPage />);
    expect(screen.getByText('Assine a Plataforma')).toBeInTheDocument();
  });

  it('permite preencher os dados e alterar o método de pagamento', async () => {
    renderWithIntl(<AssinaturaPage />);
    
    fireEvent.click(screen.getByText('Cartão'));
    const checkboxInter = screen.getByLabelText(/Cartão internacional/i);
    fireEvent.click(checkboxInter);
    
    fireEvent.click(screen.getByText('Boleto'));
    fireEvent.change(screen.getByPlaceholderText('Nome completo'), { target: { value: 'João da Silva' } });
    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'joao@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('(00) 00000-0000'), { target: { value: '11999999999' } });
    fireEvent.change(screen.getByPlaceholderText('000.000.000-00'), { target: { value: '12345678909' } });
    fireEvent.change(screen.getByPlaceholderText('Crie uma senha segura'), { target: { value: 'Senha@123' } });
    
    fireEvent.click(screen.getByText('PIX'));
    fireEvent.click(screen.getByText('Próximo'));
    
    await waitFor(() => {
      expect(screen.queryByText('Próximo')).not.toBeInTheDocument();
    });
  });

  it('exibe erro generico ao falhar a requisicao de iniciar', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Erro customizado' }),
      })
    ) as never;

    renderWithIntl(<AssinaturaPage />);
    fireEvent.change(screen.getByPlaceholderText('Nome completo'), { target: { value: 'João da Silva' } });
    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'joao@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('(00) 00000-0000'), { target: { value: '11999999999' } });
    fireEvent.change(screen.getByPlaceholderText('000.000.000-00'), { target: { value: '12345678909' } });
    fireEvent.change(screen.getByPlaceholderText('Crie uma senha segura'), { target: { value: 'Senha@123' } });
    
    fireEvent.click(screen.getByText('Próximo'));
    await waitFor(() => {
      expect(screen.getByText('Erro customizado')).toBeInTheDocument();
    });
  });

  it('falha requisicao de iniciar com excecao', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error'))) as never;

    renderWithIntl(<AssinaturaPage />);
    fireEvent.change(screen.getByPlaceholderText('Nome completo'), { target: { value: 'João da Silva' } });
    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'joao@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('(00) 00000-0000'), { target: { value: '11999999999' } });
    fireEvent.change(screen.getByPlaceholderText('000.000.000-00'), { target: { value: '12345678909' } });
    fireEvent.change(screen.getByPlaceholderText('Crie uma senha segura'), { target: { value: 'Senha@123' } });
    
    fireEvent.click(screen.getByText('Próximo'));
    
    await waitFor(() => {
      expect(screen.queryByText('Copiar')).not.toBeInTheDocument();
    });
  });

  it('permite pagar com Boleto e aguarda confirmacao via polling', async () => {
    const mockFetch = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ paymentId: '123', boleto: {} }) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ pago: false }) })
      .mockResolvedValue({ ok: true, json: () => Promise.resolve({ pago: true }) });

    global.fetch = mockFetch as never;

    renderWithIntl(<AssinaturaPage />);
    fireEvent.click(screen.getByText('Boleto'));
    fireEvent.change(screen.getByPlaceholderText('Nome completo'), { target: { value: 'João da Silva' } });
    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'joao@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('(00) 00000-0000'), { target: { value: '11999999999' } });
    fireEvent.change(screen.getByPlaceholderText('000.000.000-00'), { target: { value: '12345678909' } });
    fireEvent.change(screen.getByPlaceholderText('Crie uma senha segura'), { target: { value: 'Senha@123' } });

    fireEvent.click(screen.getByText('Próximo'));
    
    await waitFor(() => {
      expect(screen.getByText('Boleto gerado')).toBeInTheDocument();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2200);
    });

    await waitFor(() => {
      expect(screen.getByText('Voltar para página inicial')).toBeInTheDocument();
    });
  });

  it('polling de PIX e botao de copiar payload', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    const mockFetch = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ paymentId: '123', pix: { payload: 'pix_code' } }) })
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValue({ ok: true, json: () => Promise.resolve({ pago: true }) });

    global.fetch = mockFetch as never;

    renderWithIntl(<AssinaturaPage />);
    fireEvent.click(screen.getByText('PIX'));
    fireEvent.change(screen.getByPlaceholderText('Nome completo'), { target: { value: 'João da Silva' } });
    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'joao@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('(00) 00000-0000'), { target: { value: '11999999999' } });
    fireEvent.change(screen.getByPlaceholderText('000.000.000-00'), { target: { value: '12345678909' } });
    fireEvent.change(screen.getByPlaceholderText('Crie uma senha segura'), { target: { value: 'Senha@123' } });

    fireEvent.click(screen.getByText('Próximo'));
    
    await waitFor(() => {
      expect(screen.getByText('Copiar')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Copiar'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('pix_code');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2200);
    });

    await waitFor(() => {
      expect(screen.getByText('Voltar para página inicial')).toBeInTheDocument();
    });
  });

  it('permite pagar com Cartão e trata sucesso e erro', async () => {
    const mockFetch = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ paymentId: '123' }) }) // iniciar
      .mockResolvedValueOnce({ ok: false, json: () => Promise.resolve({ error: 'Erro cartao' }) }) // falha
      .mockRejectedValueOnce(new Error('Net')) // falha network
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ pago: true }) }); // sucesso
    
    global.fetch = mockFetch as never;

    renderWithIntl(<AssinaturaPage />);
    fireEvent.click(screen.getByText('Cartão'));
    fireEvent.change(screen.getByPlaceholderText('Nome completo'), { target: { value: 'João da Silva' } });
    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'joao@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('(00) 00000-0000'), { target: { value: '11999999999' } });
    fireEvent.change(screen.getByPlaceholderText('000.000.000-00'), { target: { value: '12345678909' } });
    fireEvent.change(screen.getByPlaceholderText('Crie uma senha segura'), { target: { value: 'Senha@123' } });

    fireEvent.click(screen.getByText('Próximo'));
    await waitFor(() => {
      expect(screen.getByText('Dados do cartão')).toBeInTheDocument();
    });
    
    const btnPagar = screen.getByText('Realizar pagamento');
    
    // 1 - falha api
    fireEvent.click(btnPagar);
    await waitFor(() => {
      expect(screen.getByText('Erro cartao')).toBeInTheDocument();
    });

    // 2 - falha network
    fireEvent.click(btnPagar);
    await waitFor(() => {
      // Must wait for the generic error to show
      expect(screen.getByText(/Não foi possível processar o pagamento|erro/i)).toBeInTheDocument();
    });
    
    // 3 - sucesso
    fireEvent.click(btnPagar);
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2200);
    });

    await waitFor(() => {
      expect(screen.getByText('Voltar para página inicial')).toBeInTheDocument();
    });
  });
});
