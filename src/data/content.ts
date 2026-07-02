// Conteúdo da Landing Page — Sustainable Finance 2026

export const EVENT = {
  name: "Sustainable Finance 2026",
  date: "04 de Setembro, 2026",
  time: "08h30 às 21h00",
  venue: "Centro Cultural Oscar Niemeyer",
  city: "Goiânia · GO · Brasil",
  sponsorEmail: "comercial@sustainablefinance.com.br",
};

// Link padrão para conversão de patrocínio (mailto com assunto pré-preenchido)
export const SPONSOR_MAILTO = `mailto:${EVENT.sponsorEmail}?subject=${encodeURIComponent(
  "Quero ser patrocinador do SFS 2026"
)}&body=${encodeURIComponent(
  "Olá! Temos interesse em patrocinar o Sustainable Finance Summit 2026. Poderiam enviar o mídia kit com as cotas e formatos de ativação?"
)}`;

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

// Trilhas de conteúdo (4 trilhas temáticas)
export type Trilha = { n: number; title: string; topics: { title: string; text: string }[] };

export const TRILHAS: Trilha[] = [
  {
    n: 1,
    title: "Mercado de Capitais & Regulação",
    topics: [
      { title: "Finanças Sustentáveis & Mercado de Capitais", text: "Blended Finance, fundos temáticos, Bonds (Verdes/Sociais). Estruturas de funding e papel institucional na transição." },
      { title: "Europa ↔ Brasil: EUDR e Comércio Sustentável", text: "Implementação prática da EUDR (Regulação de Desmatamento da UE), rastreabilidade compulsória, compliance para exportadores e novas regras do Acordo Mercosul-UE." },
      { title: "Governança, Regulação & Política Pública", text: "Marcos regulatórios globais (ISSB, CVM), taxonomia verde brasileira, segurança jurídica para investimentos de longo prazo e integração público-privada em nível estadual." },
    ],
  },
  {
    n: 2,
    title: "Inovação, Inteligência de Dados & Gestão de Riscos",
    topics: [
      { title: "Adaptação Climática, Resiliência & Seguros", text: "Gestão de riscos extremos, Seguros Paramétricos e proteção da produtividade regional." },
      { title: "IA, Dados ESG & Transparência Digital", text: "IA aplicada ao reporting, blockchain para rastreabilidade e combate ao greenwashing." },
      { title: "Inovação, Startups & Universidades para o Mundo", text: "Vitrine do Hacka Impact, Climate Techs e conexão com fundos de Venture Capital globais." },
    ],
  },
  {
    n: 3,
    title: "Descarbonização, Indústria Circular & Infraestrutura",
    topics: [
      { title: "Cadeias de produção sustentáveis e descarbonização", text: "Mercado de carbono, Escopo 3, logística e energia. Metodologias de MRV e integridade." },
      { title: "Finanças Circulares e Gestão de Resíduos", text: "Reúso de recursos, crédito para logística reversa e economia circular como diferencial." },
      { title: "Indústria e Mineração Sustentável no Cerrado", text: "ESG na mineração e indústria: recuperação de áreas, uso de água e descarbonização." },
      { title: "Cidades Inteligentes (Smart Cities)", text: "Infraestrutura urbana sustentável, mobilidade e eficiência energética." },
    ],
  },
  {
    n: 4,
    title: "Agro 5.0, Bioeconomia & Ativos de Natureza",
    topics: [
      { title: "Financiamento da Transição e a Nova Economia do Campo", text: "Migração do crédito rural para Fiagros/CRAs. PSA e monetização da fazenda sustentável." },
      { title: "Bioeconomia do Cerrado & Ativos de Natureza", text: "Créditos de biodiversidade, biotecnologia aplicada e novos modelos baseados na conservação." },
    ],
  },
];

export type Speaker = { name: string; role: string; featured: boolean };

// Keynote Speakers confirmados
export const SPEAKERS: Speaker[] = [
  { name: "Zhu Min", role: "Ex-Vice-Diretor Geral do FMI · Especialista em China e economia global", featured: true },
  { name: "Ilan Goldfajn", role: "Presidente do Banco Interamericano de Desenvolvimento (BID)", featured: true },
  { name: "Ronaldo Caiado", role: "Governador de Goiás", featured: true },
  { name: "Roberto Campos Neto", role: "Ex-Ministro · VP do Conselho de Administração e Chefe Global de Políticas Públicas do Nubank", featured: true },
  { name: "Mathias Cormann", role: "Secretário-Geral da OCDE", featured: false },
  { name: "Christiana Figueres", role: "Ex-Secretária Executiva da UNFCCC · Arquiteta do Acordo de Paris", featured: false },
  { name: "Roberto Rodrigues", role: "Ex-Ministro · Coordenador da FGV-EESP · Embaixador da FAO para o Cooperativismo", featured: false },
  { name: "Alexandre Baldy", role: "Ex-Ministro, político e empresário", featured: false },
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

// Por que apoiar o SFS 2026 (foco em parceiros/patrocinadores)
export const SUPPORT: { icon: IconName; title: string; text: string }[] = [
  { icon: "building", title: "Capital do Centro-Oeste", text: "Vivencie a capital do Centro-Oeste brasileiro, região do país com as maiores perspectivas econômico-financeiras." },
  { icon: "handshake", title: "Networking & novos negócios", text: "Ambiente desenhado estrategicamente para networking e geração de novos negócios." },
  { icon: "trending", title: "Visibilidade de marca", text: "O evento contará com parceiros de mídia que darão dimensão nacional à sua marca." },
  { icon: "layers", title: "Conhecimento", text: "Participe de uma agenda emergencial e multissetorial." },
];

export const SPONSORS = ["VerdeCapital", "Banco Cerrado", "CarbonIQ", "AgroData", "Atlântica Asset", "EcoMercado"];

export const FAQ: { q: string; a: string }[] = [
  { q: "Quais são as cotas de patrocínio disponíveis?", a: "Trabalhamos com cotas em diferentes níveis de investimento e visibilidade — de apoio a master — com formatos de ativação sob medida para os objetivos da sua marca. Solicite o mídia kit para ver valores e contrapartidas de cada cota." },
  { q: "O que está incluído em uma cota de patrocínio?", a: "Conforme o nível da cota: presença da marca nos materiais e no palco, espaço para estande ou ativação, ingressos de cortesia para o seu time, participação em painéis e exposição nos canais dos parceiros de mídia do evento." },
  { q: "Que público a minha marca vai alcançar?", a: "Executivos e tomadores de decisão (C-level), investidores e fundos de Venture Capital, produtores rurais, startups, governo e terceiro setor — além de alcance nacional por meio dos parceiros de mídia que dão dimensão ao evento." },
  { q: "O patrocínio dá direito a palestra ou painel?", a: "Sim, dependendo da cota. As cotas superiores incluem espaço de conteúdo (keynote, painel ou masterclass) alinhado à curadoria das trilhas temáticas do evento." },
  { q: "Como recebo o mídia kit e fecho o patrocínio?", a: "Clique em “Quero ser patrocinador” ou fale com o time comercial. Enviamos o mídia kit completo, apresentamos as cotas e conduzimos a proposta de acordo com os objetivos e o orçamento da sua marca." },
];
