import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement, ReactNode } from 'react';
import ptMessages from '@/messages/pt.json';
import { SponsorModalProvider } from '@/components/SponsorContact';

type Options = {
  locale?: string;
  messages?: Record<string, unknown>;
  /** Envolve em SponsorModalProvider (necessário p/ componentes com <SponsorButton>). */
  withSponsorModal?: boolean;
};

/**
 * Renderiza um componente dentro dos providers reais da aplicação
 * (next-intl + modal de patrocínio), como em produção.
 */
export function renderWithIntl(ui: ReactElement, options: Options = {}) {
  const { locale = 'pt', messages = ptMessages, withSponsorModal = true } = options;

  const wrapped: ReactNode = withSponsorModal ? (
    <SponsorModalProvider>{ui}</SponsorModalProvider>
  ) : (
    ui
  );

  return render(
    <NextIntlClientProvider locale={locale} messages={messages as never}>
      {wrapped}
    </NextIntlClientProvider>,
  );
}
