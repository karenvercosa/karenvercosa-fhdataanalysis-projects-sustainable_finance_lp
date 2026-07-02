# Sustainable Finance 2026 — Landing Page

Landing page institucional e de alta conversão do evento **Sustainable Finance 2026**
(Goiânia · Centro Cultural Oscar Niemeyer · 04 de setembro de 2026).

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS 3.4** com os Design Tokens do Design System "Sustainable Finance" (Figma)
- **lucide-react** para ícones
- Tipografia: **Miriam Libre** (títulos) + **Lexend** (corpo)

## Seções

> Foco de conversão: **venda de ingressos** (individual e lote corporativo).

1. Hero — proposta de valor, data/horário/local, métricas e CTA "Comprar ingressos"
2. A Dor & a Oportunidade — pilares do evento
3. Tudo o que está por vir — consolidação do SFS (2ª edição)
4. Trilhas de conteúdo — 4 trilhas temáticas (accordion)
5. Keynote Speakers — grid com "ver todos"
6. Condução — host do evento
7. Para quem é — personas-alvo
8. Ingressos — área crítica de conversão (individual + lote corporativo)
9. Apoio Institucional — esteira de logos
10. Por que participar do SFS 2026 — motivos para ir
11. FAQ de ingressos (accordion) + Rodapé (LGPD)

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
