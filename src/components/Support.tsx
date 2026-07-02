import { Icon } from "@/components/Icon";
import { SUPPORT } from "@/data/content";

export function Support() {
  return (
    <section id="participar" className="relative isolate overflow-hidden bg-brand-700 py-20 text-white lg:py-32">
      <div className="hero-grid absolute inset-0 -z-10 opacity-50" />

      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-subtle">Motivos</p>
          <h2 className="mt-4 font-heading text-3xl text-white sm:text-4xl">
            Por que participar do <span className="text-brand-subtle">SFS 2026</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SUPPORT.map((r) => (
            <article
              key={r.title}
              className="reveal rounded-lg border border-white/10 bg-brand-900/40 p-8 transition-colors hover:border-brand-subtle/60"
            >
              <span className="grid size-12 place-items-center rounded-md bg-brand-subtle text-brand-900">
                <Icon name={r.icon} className="size-6" />
              </span>
              <h3 className="mt-6 font-heading text-lg text-white">{r.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-200">{r.text}</p>
            </article>
          ))}
        </div>

        <div className="reveal mt-12">
          <a
            href="#ingressos"
            className="inline-flex items-center gap-2 rounded-sm bg-brand-subtle px-8 py-4 text-base font-semibold text-brand-900 shadow-cta transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            Comprar ingressos
          </a>
        </div>
      </div>
    </section>
  );
}
