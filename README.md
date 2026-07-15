# Sustainable Finance 2026 — Landing Page

Landing page institucional e de alta conversão do evento **Sustainable Finance 2026**
(Goiânia · Centro Cultural Oscar Niemeyer · 04 de setembro de 2026).

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS 3.4** com os Design Tokens do Design System "Sustainable Finance" (Figma)
- **lucide-react** para ícones
- Tipografia: **Miriam Libre** (títulos) + **Lexend** (corpo)

## Seções

> Foco de conversão: **entrada no ecossistema da plataforma** (sem venda direta de ingressos por cotas).

1. Hero — foco em ecossistema/hub; CTAs "Torne-se membro" e "Falar com Consultor (B2B)"
2. A Dor & a Oportunidade — pilares de valor
3. Trilhas de conteúdo — 4 trilhas temáticas (accordion)
4. Para quem é — personas-alvo
5. Matriz de 3 Caminhos — Membro (grátis), Assinatura, Curador/Patrocinador
6. Apoio Institucional — esteira de logos
7. FAQ (accordion) + Rodapé (LGPD)

### Seções mantidas no código, fora do escopo atual (reativáveis)

Não renderizadas em `page.tsx`, mas preservadas para religar sem reconstruir:
`Speakers` (Palestrantes), `Consolidation` ("Tudo o que está por vir"), `Host` (Condução), `Support` ("Por que participar").

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

## Estrutura

```
src/
  app/            layout, página e estilos globais (tokens + animações)
  components/     seções (server) e interativos (client: Header, Tabs, Accordion, Speakers)
  data/           conteúdo centralizado (programação, palestrantes, FAQ, personas)
public/img/       assets oficiais do Figma (logo, arte e foto do hero)
```
