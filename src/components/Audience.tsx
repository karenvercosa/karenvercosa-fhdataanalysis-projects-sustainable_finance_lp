import { Icon } from "@/components/Icon";
import { AUDIENCE } from "@/data/content";

export function Audience() {
  return (
    <section id="publico" className="bg-ink-0 py-20 lg:py-32">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">Público qualificado</p>
          <h2 className="mt-4 font-heading text-3xl text-brand-900 sm:text-4xl">
            O público que sua marca vai impactar
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Ao patrocinar o SFS 2026, sua marca se conecta diretamente com os decisores que movimentam a economia verde
            do Centro-Oeste.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCE.map((a) => (
            <div
              key={a.title}
              className="reveal flex items-start gap-4 rounded-lg border border-ink-100 p-6 transition-colors hover:border-brand-subtle"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-md bg-brand-subtle/20 text-brand-600">
                <Icon name={a.icon} className="size-6" />
              </span>
              <div>
                <h3 className="font-heading text-lg text-brand-900">{a.title}</h3>
                <p className="mt-1 text-sm text-ink-600">{a.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
