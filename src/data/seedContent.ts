import { 
  EVENT, METRICS, PILLARS, TRILHAS, SPEAKERS, AUDIENCE, CONSOLIDATION, HOST, SUPPORT, SPONSORS, PATHS, FAQ 
} from "@/data/content";
import uiPt from "@/messages/pt.json";
import uiEn from "@/messages/en.json";

export const SEED_DATA_PT = {
  EVENT,
  METRICS,
  PILLARS,
  TRILHAS,
  SPEAKERS,
  AUDIENCE,
  CONSOLIDATION,
  HOST,
  SUPPORT,
  SPONSORS,
  PATHS,
  FAQ,
  ...uiPt
};

export const SEED_DATA_EN = {
  EVENT: {
    name: "Sustainable Finance 2026",
    date: "September 04, 2026",
    time: "08:30 AM to 09:00 PM",
    venue: "Oscar Niemeyer Cultural Center",
    city: "Goiânia · GO · Brazil",
    onboardingUrl: "#", 
    platformReady: false,
    salesEmail: "comercial@sustainablefinance.com.br",
    whatsapp: "https://wa.me/5562000000000",
  },
  METRICS: [
    { value: "+30", label: "Confirmed Speakers" },
    { value: "+40", label: "Market Leaders" },
    { value: "3+", label: "Content Tracks" },
    { value: "300", label: "On-site Seats" },
  ],
  PILLARS: [
    { icon: "trending", title: "Access to Green Capital", text: "Connect projects to funds, green bonds, and investors looking for solid ESG thesis assets." },
    { icon: "layers", title: "Rules & Compliance", text: "Master taxonomy, CBAM, carbon credits and regulatory changes so you don't get left behind." },
    { icon: "cpu", title: "Data & Technology", text: "MRV, remote sensing and applied AI: the tools that transform environmental impact into auditable metrics." },
    { icon: "users", title: "Qualified Networking", text: "Meetings with decision-makers from agribusiness, financial markets, and public sector in one place." },
  ],
  TRILHAS: [
    {
      n: 1,
      title: "Capital Markets & Regulation",
      topics: [
        { title: "Sustainable Finance & Capital Markets", text: "Blended Finance, thematic funds, Green/Social Bonds. Funding structures and institutional role." },
        { title: "Europe ↔ Brazil: EUDR and Sustainable Trade", text: "Practical implementation of EUDR, compulsory traceability, compliance for exporters." },
        { title: "Governance, Regulation & Public Policy", text: "Global regulatory frameworks (ISSB, CVM), Brazilian green taxonomy, legal security." },
      ],
    },
    {
      n: 2,
      title: "Innovation, Data Intelligence & Risk Management",
      topics: [
        { title: "Climate Adaptation, Resilience & Insurance", text: "Extreme risk management, Parametric Insurance, and protection of regional productivity." },
        { title: "AI, ESG Data & Digital Transparency", text: "AI applied to reporting, blockchain for traceability and combating greenwashing." },
        { title: "Innovation, Startups & Universities for the World", text: "Showcase of Hacka Impact, Climate Techs and connection with global Venture Capital." },
      ],
    },
    {
      n: 3,
      title: "Decarbonization, Circular Industry & Infrastructure",
      topics: [
        { title: "Sustainable supply chains and decarbonization", text: "Carbon market, Scope 3, logistics and energy. MRV methodologies and integrity." },
        { title: "Circular Finance and Waste Management", text: "Resource reuse, credit for reverse logistics and circular economy as a differential." },
        { title: "Sustainable Industry and Mining in the Cerrado", text: "ESG in mining and industry: area recovery, water use and decarbonization." },
        { title: "Smart Cities", text: "Sustainable urban infrastructure, mobility and energy efficiency." },
      ],
    },
    {
      n: 4,
      title: "Agro 5.0, Bioeconomy & Nature Assets",
      topics: [
        { title: "Transition Financing and the New Rural Economy", text: "Migration of rural credit to Fiagros/CRAs. PES and monetization of the sustainable farm." },
        { title: "Cerrado Bioeconomy & Nature Assets", text: "Biodiversity credits, applied biotechnology and new conservation-based models." },
      ],
    },
  ],
  SPEAKERS: SPEAKERS,
  AUDIENCE: [
    { icon: "briefcase", title: "Executives and Decision Makers (C-Level)", text: "From large corporations and financial institutions." },
    { icon: "coins", title: "Investors and Venture Capital Funds", text: "Seeking opportunities aligned with impact and sustainability." },
    { icon: "rocket", title: "Startups and Technology Companies", text: "Bringing innovation to the financial and corporate sector." },
    { icon: "sprout", title: "Rural Producers", text: "Interested in new forms of financing, program participants or award recipients." },
    { icon: "bank", title: "Government Organizations and Regulators", text: "Essential for creating policies and incentives for sector growth." },
    { icon: "handshake", title: "NGOs and Third Sector Entities", text: "With a fundamental role in connecting capital and social impact." },
  ],
  CONSOLIDATION: {
    eyebrow: "2nd edition",
    title: "Consolidation of SFS as the most important event on Sustainable Finance in the Midwest.",
    bullets: [
      "Diversification of content tracks",
      "Expansion of experiences",
      "New keynote speakers",
      "International module",
    ],
    highlights: ["Inspiring talks", "Enriching debates", "Networking"],
    value: [
      "Expand your networking and generate business by connecting with a highly qualified audience.",
      "Learn, get inspired and create value.",
      "Experience the second edition of the most important event in the sector in the Midwest.",
    ],
  },
  HOST: {
    name: "Vanessa Cochi",
    role: "Journalist, Presenter, and Master of Ceremonies",
    bio: "The event will be hosted by journalist, presenter, and master of ceremonies Vanessa Cochi, who brings extensive experience in major events.",
  },
  SUPPORT: [
    { icon: "building", title: "Capital of the Midwest", text: "Experience the capital of the Brazilian Midwest, the region of the country with the greatest economic and financial prospects." },
    { icon: "handshake", title: "Networking & New Business", text: "Environment strategically designed for networking and generation of new business." },
    { icon: "trending", title: "National Reach", text: "The event has media partners that give a national dimension to the programming." },
    { icon: "layers", title: "Knowledge", text: "Participate in an emergency and multisectoral agenda." },
  ],
  SPONSORS: SPONSORS,
  PATHS: [
    {
      key: "membro",
      icon: "users",
      name: "Free Plan",
      price: "Free Access",
      badge: "Start here",
      description: "Immediate platform registration. Gives access to live broadcasts (streaming) on the day of the event.",
      note: "Already have a corporate voucher from a partner? Validate it inside the platform to get unlimited platform access and on-site event access.",
      features: ["Live broadcasts on event day", "Corporate voucher validation"],
      cta: "Register for Free",
      status: "soon",
    },
    {
      key: "assinatura",
      icon: "layers",
      name: "Premium Participant",
      price: "Access to Knowledge",
      highlighted: true,
      description: "Full unlock of the Knowledge Hub, with permission to download exclusive reports, case studies, and market materials.",
      features: ["Live broadcasts on event day", "Full Knowledge Hub", "Downloads of reports and case studies", "Webinar participation", "Lecture PDFs and materials"],
      cta: "Subscribe to Platform",
      status: "soon",
    },
    {
      key: "curador",
      icon: "handshake",
      name: "Sponsors and Curators",
      price: "Individual or Corporate",
      description: "For brands and strategic players who want to close deals, position the institutional brand in layers or lead panels.",
      features: ["Tiered institutional positioning", "Panel curation and leadership", "Negotiation of quotas and corporate vouchers"],
      cta: "I want to be a Curator / Sponsor",
      status: "contact",
    },
  ],
  FAQ: [
    { q: "Is online access free?", a: "Yes. With the Free Plan, you enter the platform for free and have access to live broadcasts on the day of the event." },
    { q: "How do I use my corporate voucher after registering?", a: "If you received a voucher from a partner, simply register for free and validate the code inside the platform." },
    { q: "How does the report subscription work?", a: "The Premium Participant (platform subscription) unlocks the complete Knowledge Hub." },
    { q: "I want to sponsor or be a curator. How do I do it?", a: "Commercial quotas, sponsorship and corporate vouchers are handled outside the platform, directly with our team." },
    { q: "Is the event online or in-person?", a: "Both. The event takes place in-person in Goiânia and is broadcast live to platform members." },
  ],
  ...uiEn
};
