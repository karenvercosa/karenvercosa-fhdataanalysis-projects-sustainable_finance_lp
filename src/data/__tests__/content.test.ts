import { describe, it, expect } from 'vitest';
import {
  EVENT,
  PATHS,
  FAQ,
  PILLARS,
  METRICS,
  mailtoComercial,
  CONSULTOR_MAILTO,
  CURADOR_MAILTO,
} from '../content';
import { prisma } from '@/lib/prisma';

describe('content estático', () => {
  it('EVENT tem e-mail comercial válido', () => {
    expect(EVENT.salesEmail).toMatch(/@/);
  });

  it('PATHS tem 3 caminhos com chaves únicas e status válidos', () => {
    expect(PATHS).toHaveLength(3);
    const keys = PATHS.map((p) => p.key);
    expect(new Set(keys).size).toBe(keys.length);
    expect(PATHS.every((p) => ['soon', 'contact'].includes(p.status))).toBe(true);
  });

  it('coleções principais não estão vazias', () => {
    expect(FAQ.length).toBeGreaterThan(0);
    expect(PILLARS.length).toBeGreaterThan(0);
    expect(METRICS.length).toBeGreaterThan(0);
  });

  it('mailtoComercial codifica o assunto e reaproveita o e-mail', () => {
    const url = mailtoComercial('Olá mundo & cia');
    expect(url).toContain('mailto:comercial@sustainablefinance.com.br');
    expect(url).toContain(encodeURIComponent('Olá mundo & cia'));
    expect(CONSULTOR_MAILTO).toContain('mailto:');
    expect(CURADOR_MAILTO).toContain('mailto:');
  });
});

describe('cliente Prisma singleton', () => {
  it('exporta uma instância única', () => {
    expect(prisma).toBeDefined();
  });
});
