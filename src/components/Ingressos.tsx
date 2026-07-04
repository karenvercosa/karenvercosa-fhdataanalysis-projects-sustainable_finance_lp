import { ArrowRight, AlertTriangle, Ticket, Users } from "lucide-react";
import { BuyButton } from "@/components/TicketPurchase";

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
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <h3 className="font-heading text-xl text-white">Ingresso individual</h3>
              <span className="rounded-full bg-brand-subtle/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-subtle">
                Online
              </span>
            </div>
            <p className="mt-3 flex-1 leading-relaxed text-ink-200">
              Acesso <strong className="text-white">100% online</strong> ao evento: transmissão ao vivo dos painéis e
              trilhas de conteúdo, de onde você estiver.
            </p>
            <BuyButton
              mode="individual"
              qty={1}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-sm bg-brand-subtle px-8 py-4 text-base font-semibold text-brand-900 shadow-cta transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              Comprar ingresso
              <ArrowRight className="size-5" strokeWidth={2.2} />
            </BuyButton>
          </div>

          {/* Lote corporativo */}
          <div className="flex flex-col rounded-lg border border-white/15 bg-brand-900/40 p-8">
            <span className="grid size-12 place-items-center rounded-md bg-brand-subtle text-brand-900">
              <Users className="size-6" strokeWidth={2} />
            </span>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <h3 className="font-heading text-xl text-white">Lote de ingressos</h3>
              <span className="rounded-full bg-brand-subtle/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-subtle">
                Presencial
              </span>
            </div>
            <p className="mt-3 flex-1 leading-relaxed text-ink-200">
              Leve o seu time ao evento <strong className="text-white">presencial</strong>, em Goiânia. Condições
              especiais por volume para empresas e grupos, com um único voucher para distribuir.
            </p>
            <BuyButton
              mode="lote"
              qty={10}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-sm border border-brand-subtle px-8 py-4 text-base font-semibold text-brand-subtle transition-colors hover:bg-brand-subtle/10"
            >
              Comprar lote
              <ArrowRight className="size-5" strokeWidth={2.2} />
            </BuyButton>
          </div>
        </div>

        <p className="reveal mt-8 text-center text-sm text-ink-200">
          Pagamento seguro · Ingresso enviado por e-mail · Certificado digital incluso
        </p>
      </div>
    </section>
  );
}
