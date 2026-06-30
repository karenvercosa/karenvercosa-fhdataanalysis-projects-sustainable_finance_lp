// Conteúdo da Landing Page — Sustainable Finance 2026

export const EVENT = {
  name: "Sustainable Finance 2026",
  date: "04 de Setembro, 2026",
  time: "08h30 às 21h00",
  venue: "Centro Cultural Oscar Niemeyer",
  city: "Goiânia · GO · Brasil",
  hubUrl: "#", // onboarding Fase 1 do Hub Digital
};

export const METRICS = [
  { value: "+30", label: "Palestrantes confirmados" },
  { value: "+40", label: "Líderes de mercado" },
  { value: "3+", label: "Trilhas de conteúdo" },
  { value: "300", label: "Vagas presenciais" },
];

export type IconName =
  | "trending"
  | "layers"
  | "cpu"
  | "users"
  | "building"
  | "coins"
  | "rocket"
  | "bank"
  | "sprout"
  | "fileCheck"
  | "briefcase"
  | "handshake";

export const PILLARS: { icon: IconName; title: string; text: string }[] = [
  { icon: "trending", title: "Acesso a capital verde", text: "Conecte projetos a fundos, green bonds e investidores que buscam ativos com tese ESG sólida." },
  { icon: "layers", title: "Regras & compliance", text: "Domine taxonomia, CBAM, crédito de carbono e o que muda na regulação para não ficar para trás." },
  { icon: "cpu", title: "Dados & tecnologia", text: "MRV, sensoriamento e IA aplicada: as ferramentas que transformam impacto ambiental em métrica auditável." },
  { icon: "users", title: "Networking qualificado", text: "Encontros com decisores do agro, do mercado financeiro e do setor público num só lugar." },
];

export type Session = { time: string; title: string; track?: string; speakers?: string };

export const SCHEDULE: Record<"manha" | "tarde" | "noite", { label: string; emoji: string; sessions: Session[] }> = {
  manha: {
    label: "Manhã",
    emoji: "🌅",
    sessions: [
      { time: "08h30", title: "Credenciamento & Welcome Coffee Verde", track: "Abertura do Hub Digital e ativação de networking" },
      { time: "09h30", title: "Keynote · O trilhão verde do agronegócio brasileiro", track: "Capital & Investimento", speakers: "Helena Vasconcelos · Ricardo Tavares" },
      { time: "11h00", title: "Painel · Taxonomia sustentável: o que muda para emissores", track: "Regulação & Compliance", speakers: "Mariana Lopes · Eduardo Antunes · Patrícia Reis" },
    ],
  },
  tarde: {
    label: "Tarde",
    emoji: "☀️",
    sessions: [
      { time: "14h00", title: "Painel · Crédito de carbono: do projeto ao mercado regulado", track: "Mercados & Carbono", speakers: "Fernando Goulart · Luísa Camargo" },
      { time: "15h30", title: "Masterclass · IA e dados para MRV de impacto", track: "Dados & Tecnologia", speakers: "Bruno Esteves · Camila Nogueira" },
      { time: "17h00", title: "Startup Pitch Arena · Soluções de finanças climáticas", track: "Inovação & Startups", speakers: "Curadoria: Comitê de Investidores SF2026" },
    ],
  },
  noite: {
    label: "Noite",
    emoji: "🌙",
    sessions: [
      { time: "19h00", title: "Keynote de encerramento · O Brasil como potência da bioeconomia", track: "Visão de Futuro", speakers: "André Salgado" },
      { time: "20h30", title: "Networking Night · Conexões que viram negócio", track: "Encontro exclusivo para credenciados presenciais" },
    ],
  },
};

export type Speaker = { name: string; role: string; company: string; featured: boolean };

export const SPEAKERS: Speaker[] = [
  { name: "Helena Vasconcelos", role: "Head de ESG & Sustainable Investing", company: "Verde Capital", featured: true },
  { name: "Ricardo Tavares", role: "Diretor de Crédito Agro", company: "Banco Cerrado", featured: true },
  { name: "Mariana Lopes", role: "Sócia · Regulatório & Carbono", company: "Lopes & Antunes Advogados", featured: true },
  { name: "Bruno Esteves", role: "CTO & Co-fundador", company: "CarbonIQ", featured: true },
  { name: "Luísa Camargo", role: "Gestora de Carteira Climática", company: "Atlântica Asset", featured: false },
  { name: "Fernando Goulart", role: "Diretor de Mercado de Carbono", company: "EcoMercado", featured: false },
  { name: "Camila Nogueira", role: "Líder de Dados & IA", company: "AgroData Labs", featured: false },
  { name: "André Salgado", role: "Economista-chefe", company: "Instituto Bioeconomia BR", featured: false },
];

export const AUDIENCE: { icon: IconName; title: string; text: string }[] = [
  { icon: "briefcase", title: "Executivos e tomadores de decisão (C-Level)", text: "De grandes corporações e instituições financeiras." },
  { icon: "coins", title: "Investidores e fundos de Venture Capital", text: "Buscando oportunidades alinhadas a impacto e sustentabilidade." },
  { icon: "rocket", title: "Startups e empresas de tecnologia", text: "Trazendo inovação para o setor financeiro e corporativo." },
  { icon: "sprout", title: "Produtores rurais", text: "Interessados em novas formas de financiamento, participantes de programas ou que receberão reconhecimentos." },
  { icon: "bank", title: "Organizações governamentais e reguladores", text: "Essenciais para a criação de políticas e incentivos para o crescimento do setor." },
  { icon: "handshake", title: "ONGs e entidades do terceiro setor", text: "Com papel fundamental na conexão entre capital e impacto social." },
];

// "Tudo o que está por vir" — consolidação do SFS (2ª edição)
export const CONSOLIDATION = {
  eyebrow: "2ª edição",
  title: "Consolidação do SFS como o mais importante evento sobre Finanças Sustentáveis do Centro-Oeste.",
  bullets: [
    "Diversificação das trilhas de conteúdo",
    "Ampliação das experiências",
    "Novos keynote speakers",
    "Módulo internacional",
  ],
  highlights: ["Palestras inspiradoras", "Debates enriquecedores", "Networking"],
  value: [
    "Amplie seu networking e gere negócios conectando-se a um público altamente qualificado.",
    "Aprenda, inspire-se e gere valor.",
    "Viva a segunda edição do mais importante evento do setor no Centro-Oeste.",
  ],
};

// Condução / Mestre de cerimônias
export const HOST = {
  name: "Vanessa Cochi",
  role: "Jornalista, apresentadora e mestre de cerimônias",
  bio: "O evento será conduzido pela jornalista, apresentadora e mestre de cerimônias Vanessa Cochi, que traz ampla experiência em eventos importantes, aliando a experiência nas mídias tradicionais à agilidade dos novos meios de comunicação.",
};

export const SPONSORS = ["VerdeCapital", "Banco Cerrado", "CarbonIQ", "AgroData", "Atlântica Asset", "EcoMercado"];

export const FAQ: { q: string; a: string }[] = [
  { q: "O evento emite certificado?", a: "Sim. Todos os participantes — presenciais e do Hub Digital — recebem certificado digital de participação, disponível na plataforma após o encerramento, com a carga horária das trilhas acompanhadas." },
  { q: "Haverá gravação dos painéis?", a: "Sim. Os painéis são transmitidos ao vivo e ficam gravados no Hub Digital. Quem criar a conta gratuita tem acesso on-demand às trilhas de conhecimento para assistir quando quiser." },
  { q: "Como funcionam os reembolsos?", a: "A inscrição inicial no Hub Digital é gratuita, portanto não há cobrança a reembolsar. Para credenciais físicas liberadas via voucher corporativo de parceiro, o cancelamento segue a política do contrato firmado com a empresa parceira." },
  { q: "Empresas têm desconto para grupos?", a: "Sim. Empresas parceiras recebem vouchers corporativos para distribuir entre seus times, validados diretamente no login. Para condições de grupo, fale com a nossa equipe pelo botão “Seja um patrocinador”." },
  { q: "Preciso pagar para assistir online?", a: "Não. A transmissão ao vivo e as trilhas no Hub Digital são gratuitas — basta criar a conta. O acesso presencial é que é limitado pela capacidade do Centro Cultural Oscar Niemeyer." },
];
