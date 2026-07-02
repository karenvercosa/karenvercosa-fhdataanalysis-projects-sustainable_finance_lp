import { ArrowRight, AlertTriangle, Ticket, Users } from "lucide-react";
import { EVENT, LOTE_MAILTO } from "@/data/content";

export function Ingressos() {
  return (
    <section id="ingressos" className="relative isolate overflow-hidden bg-brand-700 py-20 text-white lg:py-32">
      <div className="hero-grid absolute inset-0 -z-10 opacity-60" />
      <div className="absolute -bottom-32 -left-24 -z-10 size-[420px] rounded-full bg-brand-500/20 blur-3xl" />

      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          {/* Escassez */}
          <p className="inline-flex items-center gap-2 rounded-full border border-accent-500/50 bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-400">
            <AlertTriangle className="size-4" strokeWidth={2} />
            Ingressos limitados à capacidade do local · lotes promocionais por tempo limitado
          </p>

          <h2 className="mt-6 font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            Garanta seu ingresso para o SFS 2026
          </h2>
          <p className="mt-4 text-lg text-ink-200">
            Um dia inteiro de conteúdo, keynotes internacionais e networking no coração do Centro-Oeste. Escolha o
            ingresso individual ou um lote para a sua equipe.
          </p>
        </div>

        {/* Tipos de ingresso */}
        <div className="reveal mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          {/* Individual */}
          <div className="flex flex-col rounded-lg border border-white/15 bg-brand-900/40 p-8">
            <span className="grid size-12 place-items-center rounded-md bg-brand-subtle text-brand-900">
              <Ticket className="size-6" strokeWidth={2} />
            </span>
            <h3 className="mt-6 font-heading text-xl text-white">Ingresso individual</h3>
            <p className="mt-3 flex-1 leading-relaxed text-ink-200">
              Acesso presencial ao evento, às <strong className="text-white">trilhas de conteúdo</strong> e à
              transmissão dos painéis. Ideal para participação individual.
            </p>
            <a
              href={EVENT.ticketsUrl}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-sm bg-brand-subtle px-8 py-4 text-base font-semibold text-brand-900 shadow-cta transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              Comprar ingresso
              <ArrowRight className="size-5" strokeWidth={2.2} />
            </a>
          </div>

          {/* Lote corporativo */}
          <div className="flex flex-col rounded-lg border border-white/15 bg-brand-900/40 p-8">
            <span className="grid size-12 place-items-center rounded-md bg-brand-subtle text-brand-900">
              <Users className="size-6" strokeWidth={2} />
            </span>
            <h3 className="mt-6 font-heading text-xl text-white">Lote de ingressos (empresas)</h3>
            <p className="mt-3 flex-1 leading-relaxed text-ink-200">
              Leve o seu time. <strong className="text-white">Condições especiais por volume</strong> para empresas e
              grupos, com faturamento facilitado.
            </p>
            <a
              href={LOTE_MAILTO}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-sm border border-brand-subtle px-8 py-4 text-base font-semibold text-brand-subtle transition-colors hover:bg-brand-subtle/10"
            >
              Comprar lote
              <ArrowRight className="size-5" strokeWidth={2.2} />
            </a>
          </div>
        </div>

        <p className="reveal mt-8 text-center text-sm text-ink-200">
          Pagamento seguro · Ingresso enviado por e-mail · Certificado digital incluso
        </p>
      </div>
    </section>
  );
}
