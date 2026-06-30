# Sustainable Finance 2026 — Landing Page

Landing page institucional e de alta conversão do evento **Sustainable Finance 2026**
(Goiânia · Centro Cultural Oscar Niemeyer · 04 de setembro de 2026).

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS 3.4** com os Design Tokens do Design System "Sustainable Finance" (Figma)
- **lucide-react** para ícones
- Tipografia: **Miriam Libre** (títulos) + **Lexend** (corpo)

## Seções

1. Hero — proposta de valor, data/horário/local, métricas e CTAs
2. A Dor & a Oportunidade — pilares do evento
3. Programação — Tabs por turno (Manhã/Tarde/Noite)
4. Palestrantes — grid com "ver todos"
5. Para quem é — personas-alvo
6. Inscrição & Hub Digital — área crítica de conversão (escassez + reciprocidade)
7. Apoio Institucional — esteira de logos
8. FAQ (accordion) + Rodapé (LGPD)

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
