import { ArrowRight, AlertTriangle, Megaphone, Handshake } from "lucide-react";
import { SPONSOR_MAILTO } from "@/data/content";

export function Patrocinio() {
  return (
    <section id="patrocinio" className="relative isolate overflow-hidden bg-brand-700 py-20 text-white lg:py-32">
      <div className="hero-grid absolute inset-0 -z-10 opacity-60" />
      <div className="absolute -bottom-32 -left-24 -z-10 size-[420px] rounded-full bg-brand-500/20 blur-3xl" />

      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          {/* Escassez */}
          <p className="inline-flex items-center gap-2 rounded-full border border-accent-500/50 bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-400">
            <AlertTriangle className="size-4" strokeWidth={2} />
            Cotas de patrocínio limitadas por categoria
          </p>

          <h2 className="mt-6 font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            Torne sua marca protagonista da transição verde
          </h2>
          <p className="mt-4 text-lg text-ink-200">
            Associe sua empresa ao evento que conecta capital, governo, agro e inovação no coração do Centro-Oeste — a
            região com as maiores perspectivas econômico-financeiras do país.
          </p>
        </div>

        {/* Proposta de valor para o patrocinador */}
        <div className="reveal mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-white/15 bg-brand-900/40 p-8">
            <span className="grid size-12 place-items-center rounded-md bg-brand-subtle text-brand-900">
              <Megaphone className="size-6" strokeWidth={2} />
            </span>
            <h3 className="mt-6 font-heading text-xl text-white">Sua marca em evidência nacional</h3>
            <p className="mt-3 leading-relaxed text-ink-200">
              Presença no palco, nos materiais do evento e nos <strong className="text-white">parceiros de mídia</strong>{" "}
              que dão dimensão nacional à sua marca.
            </p>
          </div>
          <div className="rounded-lg border border-white/15 bg-brand-900/40 p-8">
            <span className="grid size-12 place-items-center rounded-md bg-brand-subtle text-brand-900">
              <Handshake className="size-6" strokeWidth={2} />
            </span>
            <h3 className="mt-6 font-heading text-xl text-white">Conexão direta com decisores</h3>
            <p className="mt-3 leading-relaxed text-ink-200">
              Networking desenhado com <strong className="text-white">C-levels, investidores, governo e agro</strong> num
              único ambiente — mais estande e espaço de ativação, conforme a cota.
            </p>
          </div>
        </div>

        {/* CTA principal */}
        <div className="reveal mt-12 flex flex-col items-center gap-4">
          <a
            href={SPONSOR_MAILTO}
            className="inline-flex items-center justify-center gap-3 rounded-md bg-brand-subtle px-10 py-5 text-lg font-bold text-brand-900 shadow-cta transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            Quero ser patrocinador
            <ArrowRight className="size-6" strokeWidth={2.4} />
          </a>
          <p className="text-sm text-ink-200">Retorno em até 1 dia útil · Cotas e ativações sob medida para sua marca</p>
        </div>
      </div>
    </section>
  );
}
