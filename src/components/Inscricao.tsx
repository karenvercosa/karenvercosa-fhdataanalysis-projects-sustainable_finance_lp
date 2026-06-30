import { ArrowRight, AlertTriangle, MonitorPlay, TicketCheck } from "lucide-react";
import { EVENT } from "@/data/content";

export function Inscricao() {
  return (
    <section id="inscricao" className="relative isolate overflow-hidden bg-brand-700 py-20 text-white lg:py-32">
      <div className="hero-grid absolute inset-0 -z-10 opacity-60" />
      <div className="absolute -bottom-32 -left-24 -z-10 size-[420px] rounded-full bg-brand-500/20 blur-3xl" />

      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          {/* Escassez */}
          <p className="inline-flex items-center gap-2 rounded-full border border-accent-500/50 bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-400">
            <AlertTriangle className="size-4" strokeWidth={2} />
            Inscrições presenciais limitadas à capacidade do local
          </p>

          <h2 className="mt-6 text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            Garanta seu lugar na transição verde
          </h2>
          <p className="mt-4 text-lg text-ink-200">
            Crie sua conta no Hub Digital em menos de 2 minutos. Sem etapas de pagamento na Fase 1.
          </p>
        </div>

        {/* Proposta de valor dividida */}
        <div className="reveal mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-white/15 bg-brand-900/40 p-8">
            <span className="grid size-12 place-items-center rounded-md bg-brand-subtle text-brand-900">
              <MonitorPlay className="size-6" strokeWidth={2} />
            </span>
            <h3 className="mt-6 font-heading text-xl text-white">Acesso gratuito ao Hub Digital</h3>
            <p className="mt-3 leading-relaxed text-ink-200">
              Sua inscrição já libera a <strong className="text-white">transmissão ao vivo</strong> e as{" "}
              <strong className="text-white">trilhas de conhecimento</strong> on-demand — sem custo.
            </p>
          </div>
          <div className="rounded-lg border border-white/15 bg-brand-900/40 p-8">
            <span className="grid size-12 place-items-center rounded-md bg-brand-subtle text-brand-900">
              <TicketCheck className="size-6" strokeWidth={2} />
            </span>
            <h3 className="mt-6 font-heading text-xl text-white">Tem um voucher corporativo?</h3>
            <p className="mt-3 leading-relaxed text-ink-200">
              Parceiros podem <strong className="text-white">validar o código logo após o login</strong> para liberar
              o crachá físico e o acesso presencial.
            </p>
          </div>
        </div>

        {/* CTA principal */}
        <div className="reveal mt-12 text-center">
          <a
            href={EVENT.hubUrl}
            className="inline-flex items-center justify-center gap-3 rounded-md bg-brand-subtle px-10 py-5 text-lg font-bold text-brand-900 shadow-cta transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            Criar minha conta gratuita e se inscrever
            <ArrowRight className="size-6" strokeWidth={2.4} />
          </a>
          <p className="mt-4 text-sm text-ink-200">
            Onboarding simplificado · Leva menos de 2 minutos · Sem cartão de crédito
          </p>
        </div>
      </div>
    </section>
  );
}
