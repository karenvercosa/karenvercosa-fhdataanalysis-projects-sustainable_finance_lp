import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { EVENT, METRICS } from "@/data/content";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900 pt-16 lg:pt-20">
      {/* Camadas de fundo: arte oficial + overlay verde p/ contraste */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/hero-art.png" alt="" aria-hidden className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/95 via-brand-900/85 to-brand-700/70" />
        <div className="hero-grid absolute inset-0" />
      </div>

      <div className="mx-auto grid max-w-content items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        {/* Coluna de texto */}
        <div>
          {/* Chapéu */}
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-subtle/40 bg-brand-subtle/10 px-4 py-2 text-sm font-medium text-brand-subtle">
            <span className="size-2 animate-pulseDot rounded-full bg-brand-subtle" />
            2ª edição · Goiânia 2026
          </p>

          {/* Headline */}
          <h1 className="mt-6 text-display text-white">
            O maior evento de <span className="text-brand-subtle">finanças sustentáveis</span> do Brasil
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-200 sm:text-lg">
            Onde capital, agronegócio e inovação se encontram para construir a transição verde — com as
            ferramentas, os dados e as conexões certas para transformar negócios.
          </p>

          {/* Data / Horário / Local */}
          <div className="mt-8 grid gap-4 rounded-lg border border-brand-500/40 bg-brand-700/60 p-4 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-white/15">
            <div className="flex items-start gap-3 sm:pr-4">
              <CalendarDays className="size-6 shrink-0 text-brand-subtle" strokeWidth={1.8} />
              <div>
                <p className="text-xs text-ink-200">Data</p>
                <p className="font-heading font-bold text-white">{EVENT.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:px-4">
              <Clock className="size-6 shrink-0 text-brand-subtle" strokeWidth={1.8} />
              <div>
                <p className="text-xs text-ink-200">Horário</p>
                <p className="font-heading font-bold text-white">{EVENT.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:pl-4">
              <MapPin className="size-6 shrink-0 text-brand-subtle" strokeWidth={1.8} />
              <div>
                <p className="text-xs text-ink-200">Local</p>
                <p className="font-heading font-bold leading-snug text-white">
                  {EVENT.venue}
                  <br />
                  <span className="font-body text-sm font-normal text-ink-200">{EVENT.city}</span>
                </p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#ingressos"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-brand-subtle px-8 py-4 text-base font-semibold text-brand-900 shadow-cta transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              Comprar ingressos <ArrowRight className="size-5" strokeWidth={2.2} />
            </a>
            <a
              href="#programacao"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-brand-subtle px-8 py-4 text-base font-semibold text-brand-subtle transition-colors hover:bg-brand-subtle/10"
            >
              Ver programação
            </a>
          </div>
        </div>

        {/* Coluna da imagem oficial (desktop) */}
        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 -z-10 rounded-lg bg-brand-500/20 blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/hero-people.png"
            alt="Profissionais em networking no Sustainable Finance"
            className="w-full rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Métricas sociais */}
      <div className="mx-auto max-w-content px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <dt className="font-heading text-2xl font-bold text-brand-subtle">{m.value}</dt>
              <dd className="text-sm text-ink-200">{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
