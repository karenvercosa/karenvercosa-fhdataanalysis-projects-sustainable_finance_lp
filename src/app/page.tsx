import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Opportunity } from "@/components/Opportunity";
import { Consolidation } from "@/components/Consolidation";
import { Programacao } from "@/components/Programacao";
import { Speakers } from "@/components/Speakers";
import { Host } from "@/components/Host";
import { Audience } from "@/components/Audience";
import { Ingressos } from "@/components/Ingressos";
import { Sponsors } from "@/components/Sponsors";
import { Support } from "@/components/Support";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Page() {
  return (
    <>
      <a
        href="#programacao"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-subtle focus:px-4 focus:py-2 focus:text-brand-900"
      >
        Pular para a programação
      </a>

      <Header />
      <main>
        <Hero />
        <Opportunity />
        <Consolidation />
        <Programacao />
        <Speakers />
        <Host />
        <Audience />
        <Ingressos />
        <Sponsors />
        <Support />
        <Faq />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
