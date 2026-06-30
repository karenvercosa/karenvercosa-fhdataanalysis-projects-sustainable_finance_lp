import { Check, Leaf } from "lucide-react";
import { CONSOLIDATION } from "@/data/content";

export function Consolidation() {
  const { eyebrow, title, bullets, highlights, value } = CONSOLIDATION;

  return (
    <section id="sobre-evento" className="relative isolate overflow-hidden bg-brand-700 py-20 text-white lg:py-32">
      <div className="hero-grid absolute inset-0 -z-10 opacity-50" />

      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Texto + pilares */}
          <div className="reveal">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-subtle/40 bg-brand-subtle/10 px-4 py-2 text-sm font-medium text-brand-subtle">
              {eyebrow}
            </p>
            <h2 className="mt-6 font-heading text-3xl leading-tight text-brand-subtle sm:text-4xl">{title}</h2>

            <ul className="mt-8 space-y-4">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-subtle text-brand-900">
                    <Check className="size-4" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-lg text-ink-200">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Destaques */}
          <div className="reveal space-y-4 lg:pt-16">
            {highlights.map((h) => (
              <div
                key={h}
                className="flex items-center gap-4 rounded-lg border border-white/10 bg-brand-900/50 p-6 transition-colors hover:border-brand-subtle/60"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-md bg-brand-subtle text-brand-900">
                  <Leaf className="size-6" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="font-heading text-xl text-white">{h}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Proposta de valor */}
        <div className="reveal mt-16 grid gap-6 border-t border-white/10 pt-12 sm:grid-cols-3">
          {value.map((v) => (
            <p key={v} className="text-lg leading-relaxed text-ink-200">
              {v}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
