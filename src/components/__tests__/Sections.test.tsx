import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithIntl } from '@/lib/test/render';

import { Opportunity } from '../Opportunity';
import { Audience } from '../Audience';
import { Support } from '../Support';
import { Consolidation } from '../Consolidation';
import { Host } from '../Host';
import { Sponsors } from '../Sponsors';
import { Speakers } from '../Speakers';

// Componentes de seção puramente apresentacionais: garantem que renderizam
// o conteúdo estático (fallback) sem quebrar sob os providers reais.

describe('Opportunity', () => {
  it('renderiza os pilares da oportunidade', () => {
    renderWithIntl(<Opportunity />);
    expect(screen.getByText('Acesso a capital verde')).toBeInTheDocument();
    expect(screen.getByText('Dados & tecnologia')).toBeInTheDocument();
  });
});

describe('Audience', () => {
  it('renderiza os perfis de público', () => {
    renderWithIntl(<Audience />);
    expect(
      screen.getByText('ONGs e entidades do terceiro setor'),
    ).toBeInTheDocument();
  });
});

describe('Support', () => {
  it('renderiza os motivos para participar', () => {
    renderWithIntl(<Support />);
    expect(screen.getByText('Networking & novos negócios')).toBeInTheDocument();
  });
});

describe('Consolidation', () => {
  it('renderiza destaques e proposta de valor', () => {
    renderWithIntl(<Consolidation />);
    expect(screen.getByText('Networking')).toBeInTheDocument();
    expect(screen.getByText('Módulo internacional')).toBeInTheDocument();
  });
});

describe('Host', () => {
  it('renderiza o mestre de cerimônias', () => {
    renderWithIntl(<Host />);
    expect(screen.getAllByText('Vanessa Cochi').length).toBeGreaterThan(0);
  });
});

describe('Sponsors', () => {
  it('duplica a lista de patrocinadores para a esteira infinita', () => {
    renderWithIntl(<Sponsors />);
    // A esteira renderiza cada nome duas vezes (loop infinito).
    expect(screen.getAllByText('VerdeCapital')).toHaveLength(2);
  });
});

describe('Speakers', () => {
  it('mostra apenas os palestrantes em destaque por padrão e alterna ao clicar', async () => {
    const { getByRole } = renderWithIntl(<Speakers />);
    // Featured (Zhu Min) visível; não-featured (Mathias Cormann) oculto.
    expect(screen.getByText('Zhu Min')).toBeInTheDocument();
    expect(screen.queryByText('Mathias Cormann')).not.toBeInTheDocument();

    const toggle = getByRole('button');
    toggle.click();
    expect(await screen.findByText('Mathias Cormann')).toBeInTheDocument();
  });
});
