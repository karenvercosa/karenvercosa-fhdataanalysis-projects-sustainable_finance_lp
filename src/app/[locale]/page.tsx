import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Opportunity } from "@/components/Opportunity";
import { Programacao } from "@/components/Programacao";
import { Audience } from "@/components/Audience";
import { Host } from "@/components/Host";
import { Matriz } from "@/components/Matriz";
import { Sponsors } from "@/components/Sponsors";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SponsorModalProvider } from "@/components/SponsorContact";

// Seções mantidas no código para possível reativação (fora do escopo atual):
// import { Consolidation } from "@/components/Consolidation";
// import { Speakers } from "@/components/Speakers";
// import { Support } from "@/components/Support";

export default function Page() {
  return (
    <>

      <SponsorModalProvider>
        <Header />
        <main>
          {/* 1 · Hero */}
          <Hero />
          {/* 2 · A Dor e a Oportunidade */}
          <Opportunity />
          {/* 3 · Programação / Trilhas de conteúdo */}
          <Programacao />
          {/* 4 · Palestrantes — temporariamente fora do escopo (mantido no código):
          <Speakers /> */}
          {/* 5 · Para quem é o ecossistema */}
          <Audience />
          {/* Condução — quem media o evento */}
          <Host />
          {/* 6 · Matriz de 3 Caminhos (conversão para o ecossistema) */}
          <Matriz />
          {/* 7 · Apoio Institucional */}
          <Sponsors />
          {/* 8 · FAQ */}
          <Faq />
          {/* Seções reativáveis (mantidas no código, fora do escopo atual):
          <Consolidation /> <Support /> */}
        </main>
        <Footer />
      </SponsorModalProvider>
      <ScrollReveal />
    </>
  );
}
