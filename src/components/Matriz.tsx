"use client";
import { Check, ArrowRight, Clock } from "lucide-react";
import { Icon } from "@/components/Icon";
import { PATHS as STATIC_PATHS } from "@/data/content";
import { useMessages, useTranslations } from 'next-intl';
import { SponsorButton } from "@/components/SponsorContact";

export function Matriz() {
  const messages = useMessages();
  const t = useTranslations('Matriz');
  const PATHS = (messages?.PATHS || STATIC_PATHS) as typeof STATIC_PATHS;
  return (
    <section id="caminhos" className="relative isolate overflow-hidden bg-brand-700 py-20 text-white lg:py-32">
      <div className="hero-grid absolute inset-0 -z-10 opacity-60" />
      <div className="absolute -bottom-32 -left-24 -z-10 size-[420px] rounded-full bg-brand-500/20 blur-3xl" />

      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-subtle">{t('badge')}</p>
          <h2 className="mt-4 font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            {t('titulo')}
          </h2>
          <p className="mt-4 text-lg text-ink-200">
            {t('descricao')}
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {PATHS.map((path, i) => {
            const isContact = i === 2; // path.status === "contact"
            const isMembro = i === 0; // path.key === "membro"
            const isAssinatura = i === 1; // path.key === "assinatura"

            // CTA extraído para evitar ternário aninhado (S3358)
            let cta: React.ReactNode;
            if (isContact) {
              cta = (
                <SponsorButton className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-brand-subtle px-6 py-4 text-base font-semibold text-brand-900 shadow-cta transition-all hover:-translate-y-0.5 hover:bg-white">
                  {path.cta}
                  <ArrowRight className="size-5" strokeWidth={2.2} />
                </SponsorButton>
              );
            } else if (isMembro) {
              cta = (
                <a
                  href={process.env.NEXT_PUBLIC_SIGNUP_URL || "http://localhost:3001"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-brand-subtle px-6 py-4 text-base font-semibold text-brand-900 shadow-cta transition-all hover:-translate-y-0.5 hover:bg-white"
                >
                  {path.cta}
                  <ArrowRight className="size-5" strokeWidth={2.2} />
                </a>
              );
            } else if (isAssinatura) {
              cta = (
                <a
                  href={process.env.NEXT_PUBLIC_SUBSCRIBE_URL || "http://localhost:3001"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-brand-subtle px-6 py-4 text-base font-semibold text-brand-900 shadow-cta transition-all hover:-translate-y-0.5 hover:bg-white"
                >
                  {path.cta}
                  <ArrowRight className="size-5" strokeWidth={2.2} />
                </a>
              );
            } else {
              cta = (
                <>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    title="Plataforma em construção — disponível em breve"
                    className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-sm border border-white/20 bg-white/5 px-6 py-4 text-base font-semibold text-ink-200/70"
                  >
                    {path.cta}
                  </button>
                  <p className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-brand-subtle">
                    <Clock className="size-4" strokeWidth={2} aria-hidden />
                    {t('emBreve')}
                  </p>
                </>
              );
            }

            return (
              <article
                key={path.key || i}
                className={`reveal flex h-full flex-col rounded-lg border bg-brand-900/40 p-8 transition-colors ${
                  path.highlighted ? "border-brand-subtle shadow-cta" : "border-white/15 hover:border-brand-subtle/60"
                }`}
              >
                {/* Cabeçalho do card */}
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-12 place-items-center rounded-md bg-brand-subtle text-brand-900">
                    <Icon name={path.icon} className="size-6" />
                  </span>
                  {path.badge && (
                    <span className="rounded-full bg-brand-subtle/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-subtle">
                      {path.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-6 font-heading text-xl text-white">{path.name}</h3>
                <p className="mt-1 font-heading text-lg font-bold text-brand-subtle">{path.price}</p>
                <p className="mt-4 leading-relaxed text-ink-200">{path.description}</p>

                {/* Benefícios */}
                <ul className="mt-6 space-y-3">
                  {path.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-ink-200">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-subtle" strokeWidth={3} aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {path.note && (
                  <p className="mt-6 rounded-md border border-white/10 bg-brand-900/50 p-3 text-sm text-ink-200">
                    {path.note}
                  </p>
                )}

                {/* CTA */}
                <div className="mt-8 pt-2">{cta}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
