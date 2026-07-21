import type { Metadata } from "next";
import "@/app/globals.css"; 
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: "Sustainable Finance 2026 - O maior evento de finanças sustentáveis do Brasil",
  description:
    "04 de setembro de 2026 - Centro Cultural Oscar Niemeyer, Goiânia-GO. Onde capital, agronegócio e inovação se encontram para construir a transição verde.",
  openGraph: {
    title: "Sustainable Finance 2026",
    description: "O maior evento de finanças sustentáveis do Brasil - Goiânia - 04/09/2026",
    type: "website",
    locale: "pt_BR",
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Miriam+Libre:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Passa as traduções para os Client Components */}
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}