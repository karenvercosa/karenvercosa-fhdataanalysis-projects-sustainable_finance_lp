import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { getContent } from '@/services/redis.service';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // 1. Busca o conteúdo completo (estático + dinâmico) do banco de dados (Prisma/Redis)
  const dbMessages = await getContent(locale.toUpperCase());

  return {
    locale,
    messages: dbMessages
  };
});