import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithIntl } from '@/lib/test/render';
import { authClient } from '@/lib/auth-client';
import RegisterPage from '../RegisterPage';
import { InterestsProvider } from '@/components/context/InterestsContext';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, className }: any) => <a href={href} className={className}>{children}</a>,
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
}));

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signUp: {
      email: vi.fn().mockResolvedValue({ data: {}, error: null })
    },
    signIn: {
      social: vi.fn().mockResolvedValue({ data: {}, error: null })
    }
  }
}));

describe('RegisterPage', () => {
  it('renderiza o formulário de cadastro e alterna abas', () => {
    renderWithIntl(
      <InterestsProvider>
        <RegisterPage />
      </InterestsProvider>
    );

    // Aba Participante
    expect(screen.getByText('Crie sua conta')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Seu nome')).toBeInTheDocument();

    // Troca para Aba Patrocinador
    const btnPatrocinador = screen.getByText('Como Patrocinador');
    fireEvent.click(btnPatrocinador);
    
    expect(screen.getByText('Seja um Patrocinador')).toBeInTheDocument();
    
    // Volta para Aba Participante
    const btnParticipante = screen.getByText('Como Participante');
    fireEvent.click(btnParticipante);
    
    expect(screen.getByPlaceholderText('seu@email.com')).toBeInTheDocument();
  });

  it('permite preencher o formulário, checar consentimentos e enviar', async () => {
    renderWithIntl(
      <InterestsProvider>
        <RegisterPage />
      </InterestsProvider>
    );
    
    fireEvent.change(screen.getByPlaceholderText('Seu nome'), { target: { value: 'Maria' } });
    fireEvent.change(screen.getByPlaceholderText('Seu sobrenome'), { target: { value: 'Silva' } });
    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'maria@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Crie uma senha segura'), { target: { value: 'Senha@123' } });
    fireEvent.change(screen.getByPlaceholderText('(00) 00000-0000'), { target: { value: '11999999999' } });
    
    const checkboxes = screen.getAllByRole('checkbox');
    if (checkboxes.length >= 2) {
      fireEvent.click(checkboxes[0]); // Termos
      fireEvent.click(checkboxes[1]); // Marketing
    }
    
    // O botão de interesse
    // const tag = screen.getByText('Finanças Verdes');
    // fireEvent.click(tag);
    
    const btnTermos = screen.getByText('Termos de Uso');
    fireEvent.click(btnTermos);
    
    const btnPriv = screen.getAllByText('Política de Privacidade')[0];
    fireEvent.click(btnPriv);
    
    // Fechar modal
    const btnFechar = screen.getByRole('button', { name: 'Fechar' });
    fireEvent.click(btnFechar);
    
    const btnSubmit = screen.getByText('Criar conta e acessar');
    fireEvent.click(btnSubmit);
    
    // Asserção exigida pelo usuário: verifica se o SDK de auth foi chamado
    expect(authClient.signUp.email).toHaveBeenCalled();
    
    // Aguarda o término da Promise e a tela de sucesso
    await waitFor(() => {
      expect(screen.getByText('Cadastro realizado com sucesso')).toBeInTheDocument();
    });
  });

  it('permite fazer login social com Google', async () => {
    renderWithIntl(
      <InterestsProvider>
        <RegisterPage />
      </InterestsProvider>
    );
    const btnGoogle = screen.getByRole('button', { name: /Google/i });
    fireEvent.click(btnGoogle);
    expect(authClient.signIn.social).toHaveBeenCalledWith({
      provider: 'google',
      callbackURL: expect.any(String),
    });
  });
});
