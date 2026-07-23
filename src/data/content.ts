// Conteúdo da Landing Page — Sustainable Finance 2026

export const EVENT = {
  name: "Sustainable Finance 2026",
  date: "04 de Setembro, 2026",
  time: "08h30 às 21h00",
  venue: "Centro Cultural Oscar Niemeyer",
  city: "Goiânia · GO · Brasil",
  onboardingUrl: "#", // placeholder — onboarding Fase 1 da plataforma (em construção)
  platformReady: false, // enquanto false, cadastro/assinatura ficam "em breve"
  salesEmail: "comercial@sustainablefinance.com.br",
  whatsapp: "https://wa.me/5562000000000", // placeholder — WhatsApp comercial (B2B)
};

// Contatos comerciais (fora da plataforma) — B2B / curadoria / patrocínio
export function mailtoComercial(subject: string) {
  return `mailto:${EVENT.salesEmail}?subject=${encodeURIComponent(subject)}`;
}
export const CONSULTOR_MAILTO = mailtoComercial("Falar com consultor (B2B) — SFS 2026");
export const CURADOR_MAILTO = mailtoComercial("Quero ser Curador / Patrocinador — SFS 2026");

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

// Por que participar do SFS 2026 (motivos para ir ao evento)
export const SUPPORT: { icon: IconName; title: string; text: string }[] = [
  { icon: "building", title: "Capital do Centro-Oeste", text: "Vivencie a capital do Centro-Oeste brasileiro, região do país com as maiores perspectivas econômico-financeiras." },
  { icon: "handshake", title: "Networking & novos negócios", text: "Ambiente desenhado estrategicamente para networking e geração de novos negócios." },
  { icon: "trending", title: "Alcance nacional", text: "O evento conta com parceiros de mídia que dão dimensão nacional à programação." },
  { icon: "layers", title: "Conhecimento", text: "Participe de uma agenda emergencial e multissetorial." },
];

export const SPONSORS = ["VerdeCapital", "Banco Cerrado", "CarbonIQ", "AgroData", "Atlântica Asset", "EcoMercado"];

// Matriz de Escolha — 3 caminhos de engajamento no ecossistema da plataforma
// status: "soon" = botão inativo (plataforma em construção) · "contact" = abre contato comercial
export type Path = {
  key: string;
  icon: IconName;
  name: string;
  price: string;
  badge?: string;
  highlighted?: boolean;
  description: string;
  note?: string;
  features: string[];
  cta: string;
  status: "soon" | "contact";
};

export const PATHS: Path[] = [
  {
    key: "membro",
    icon: "users",
    name: "Plano Gratuito",
    price: "Acesso gratuito",
    badge: "Comece por aqui",
    description: "Cadastro imediato na plataforma. Dá acesso às transmissões ao vivo (streaming) no dia do evento.",
    note: "Já tem um voucher corporativo de um parceiro? Você o valida dentro da plataforma para ter acesso ilimitado à plataforma e acesso presencial ao evento.",
    features: ["Transmissões ao vivo no dia do evento", "Validação de voucher corporativo"],
    cta: "Cadastre-se Gratuitamente",
    status: "soon",
  },
  {
    key: "assinatura",
    icon: "layers",
    name: "Participante Premium",
    price: "Acesso ao Conhecimento",
    highlighted: true,
    description:
      "Liberação completa do Hub de Conhecimento, com permissão para baixar relatórios exclusivos, estudos de caso e materiais de mercado.",
    features: [
      "Transmissões ao vivo no dia do evento",
      "Hub de Conhecimento completo",
      "Downloads de relatórios e estudos de caso",
      "Participação em webinars",
      "PDFs e materiais das palestras",
    ],
    cta: "Assinar Plataforma",
    status: "soon",
  },
  {
    key: "curador",
    icon: "handshake",
    name: "Patrocinadores e Curadores",
    price: "Pessoa Física ou CNPJ",
    description:
      "Para marcas e players estratégicos que querem fechar negócios, posicionar a marca institucional em camadas ou liderar painéis. Cotas e vouchers corporativos são tratados fora da plataforma.",
    features: [
      "Posicionamento institucional em camadas",
      "Curadoria e liderança de painéis",
      "Negociação de cotas e vouchers corporativos",
    ],
    cta: "Quero ser Curador / Patrocinador",
    status: "contact",
  },
];

export const FAQ: { q: string; a: string }[] = [
  { q: "O acesso online é gratuito?", a: "Sim. Com o Plano Gratuito, você entra gratuitamente na plataforma e tem acesso às transmissões ao vivo no dia do evento. A plataforma está em construção — o cadastro será liberado em breve." },
  { q: "Como uso o meu voucher corporativo após me cadastrar?", a: "Se você recebeu um voucher de um parceiro, basta fazer o cadastro gratuito e validar o código dentro da plataforma. Ele libera automaticamente o seu acesso como Participante Geral, sem custo." },
  { q: "Como funciona a assinatura de relatórios?", a: "O Participante Premium (assinatura da plataforma) libera o Hub de Conhecimento completo: downloads de relatórios exclusivos, estudos de caso, participação em webinars e PDFs e materiais das palestras. A contratação será habilitada assim que a plataforma entrar no ar." },
  { q: "Quero patrocinar ou ser curador. Como faço?", a: "Cotas comerciais, patrocínio e vouchers corporativos são tratados fora da plataforma, diretamente com o nosso time. Clique em “Quero ser Curador / Patrocinador” para falar com o comercial e receber as condições." },
  { q: "O evento é online ou presencial?", a: "Os dois. O evento acontece presencialmente no Centro Cultural Oscar Niemeyer, em Goiânia (04/09/2026), e é transmitido ao vivo para os membros da plataforma." },
];
