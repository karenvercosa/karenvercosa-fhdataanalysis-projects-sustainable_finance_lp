import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithIntl } from '@/lib/test/render';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('renderiza data, local e métricas do evento', () => {
    renderWithIntl(<Hero />);
    // Dados do EVENT estático (fallback).
    expect(screen.getByText('04 de Setembro, 2026')).toBeInTheDocument();
    expect(screen.getByText('Centro Cultural Oscar Niemeyer')).toBeInTheDocument();
    // Métricas.
    expect(screen.getByText('Palestrantes confirmados')).toBeInTheDocument();
  });

  it('renderiza o CTA de cadastro apontando para #caminhos', () => {
    renderWithIntl(<Hero />);
    const cadastro = screen
      .getAllByRole('link')
      .find((a) => a.getAttribute('href') === '#caminhos');
    expect(cadastro).toBeDefined();
  });
});
