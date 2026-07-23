import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock do Prisma: instanciado no topo de content.service.ts.
const { findUnique, create } = vi.hoisted(() => ({
  findUnique: vi.fn(),
  create: vi.fn(),
}));
vi.mock('@prisma/client', () => ({
  PrismaClient: class {
    landingPageContent = { findUnique, create };
  },
}));

import { getContentFromDb } from '../content.service';

describe('getContentFromDb', () => {
  beforeEach(() => {
    findUnique.mockReset();
    create.mockReset();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('retorna o conteúdo do banco quando o registro existe', async () => {
    findUnique.mockResolvedValue({ lang: 'PT', data: { hello: 'mundo' } });
    const data = await getContentFromDb('pt');
    expect(findUnique).toHaveBeenCalledWith({ where: { lang: 'PT' } });
    expect(data).toEqual({ hello: 'mundo' });
    expect(create).not.toHaveBeenCalled();
  });

  it('faz seed quando o banco está vazio (PT)', async () => {
    findUnique.mockResolvedValue(null);
    create.mockImplementation(async ({ data }) => ({ data: data.data }));
    const data = await getContentFromDb('pt');
    expect(create).toHaveBeenCalledOnce();
    expect(create.mock.calls[0][0].data.lang).toBe('PT');
    expect(data).toBeTruthy();
  });

  it('normaliza a linguagem para EN e faz seed com SEED_DATA_EN', async () => {
    findUnique.mockResolvedValue(null);
    create.mockImplementation(async ({ data }) => ({ data: data.data }));
    await getContentFromDb('en');
    expect(findUnique).toHaveBeenCalledWith({ where: { lang: 'EN' } });
    expect(create.mock.calls[0][0].data.lang).toBe('EN');
  });

  it('qualquer linguagem desconhecida cai em PT', async () => {
    findUnique.mockResolvedValue({ data: {} });
    await getContentFromDb('fr');
    expect(findUnique).toHaveBeenCalledWith({ where: { lang: 'PT' } });
  });
});
