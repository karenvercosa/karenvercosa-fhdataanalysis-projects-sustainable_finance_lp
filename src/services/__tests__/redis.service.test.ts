import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mocks do client Redis (instanciado no topo) e do fallback de banco.
const { get, set, getContentFromDb } = vi.hoisted(() => ({
  get: vi.fn(),
  set: vi.fn(),
  getContentFromDb: vi.fn(),
}));
vi.mock('ioredis', () => ({
  default: class {
    get = get;
    set = set;
  },
}));
vi.mock('../content.service', () => ({ getContentFromDb }));

import { getContent } from '../redis.service';

describe('getContent (cache Redis)', () => {
  beforeEach(() => {
    get.mockReset();
    set.mockReset();
    getContentFromDb.mockReset();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('cache HIT: retorna do Redis sem tocar no banco', async () => {
    get.mockResolvedValue(JSON.stringify({ from: 'cache' }));
    const data = await getContent('pt');
    expect(get).toHaveBeenCalledWith('content:PT');
    expect(data).toEqual({ from: 'cache' });
    expect(getContentFromDb).not.toHaveBeenCalled();
  });

  it('cache MISS: busca no banco e grava no Redis com TTL de 7 dias', async () => {
    get.mockResolvedValue(null);
    getContentFromDb.mockResolvedValue({ from: 'db' });
    const data = await getContent('en');
    expect(getContentFromDb).toHaveBeenCalledWith('en');
    expect(set).toHaveBeenCalledWith(
      'content:EN',
      JSON.stringify({ from: 'db' }),
      'EX',
      604800,
    );
    expect(data).toEqual({ from: 'db' });
  });

  it('se o Redis falhar, faz fallback direto para o banco', async () => {
    get.mockRejectedValue(new Error('redis down'));
    getContentFromDb.mockResolvedValue({ from: 'db-fallback' });
    const data = await getContent('pt');
    expect(data).toEqual({ from: 'db-fallback' });
  });
});
