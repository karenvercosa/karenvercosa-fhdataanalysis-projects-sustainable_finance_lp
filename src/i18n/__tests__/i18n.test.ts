import { describe, it, expect, vi, beforeEach } from 'vitest';

// request.ts busca conteúdo via Redis/DB — mockamos essa dependência.
const { getContent } = vi.hoisted(() => ({ getContent: vi.fn() }));
vi.mock('@/services/redis.service', () => ({ getContent }));

// next-intl/server resolve para o build client no jsdom; substituímos
// getRequestConfig por identidade para testar a lógica real de request.ts.
vi.mock('next-intl/server', () => ({
  getRequestConfig: (fn: unknown) => fn,
}));

import { routing } from '../routing';
import getRequestConfig from '../request';

describe('routing', () => {
  it('define locales pt/en e default pt', () => {
    expect(routing.locales).toEqual(['pt', 'en']);
    expect(routing.defaultLocale).toBe('pt');
  });
});

describe('getRequestConfig (request.ts)', () => {
  beforeEach(() => {
    getContent.mockReset();
    getContent.mockResolvedValue({ Hero: { badge: 'x' } });
  });

  it('usa o locale solicitado quando é válido', async () => {
    const cfg = await getRequestConfig({ requestLocale: Promise.resolve('en') } as never);
    expect(cfg.locale).toBe('en');
    expect(getContent).toHaveBeenCalledWith('EN');
    expect(cfg.messages).toEqual({ Hero: { badge: 'x' } });
  });

  it('cai no defaultLocale quando o locale é inválido', async () => {
    const cfg = await getRequestConfig({ requestLocale: Promise.resolve('xx') } as never);
    expect(cfg.locale).toBe('pt');
    expect(getContent).toHaveBeenCalledWith('PT');
  });
});
