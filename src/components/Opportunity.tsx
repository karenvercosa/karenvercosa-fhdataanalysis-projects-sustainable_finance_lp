import { Icon } from "@/components/Icon";
import { PILLARS } from "@/data/content";

export function Opportunity() {
  return (
    <section id="oportunidade" className="bg-ink-0 py-20 lg:py-32">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">O cenário</p>
          <h2 className="mt-4 text-3xl leading-tight text-brand-900 sm:text-4xl lg:text-[2.75rem]">
            Trilhões em capital esperam por ativos verdes — mas faltam dados, padrões e conexões para destravá-los.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-600">
            A transição não é mais uma escolha de pauta ambiental: é a maior realocação de capital da nossa geração.
            Quem entender as regras agora, lidera. O Sustainable Finance 2026 existe para resolver os gargalos que
            travam essa virada.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="reveal group rounded-lg border border-ink-100 bg-ink-50 p-8 transition-all hover:border-brand-subtle hover:shadow-card"
            >
              <span className="grid size-12 place-items-center rounded-md bg-brand-700 text-brand-subtle">
                <Icon name={p.icon} className="size-6" />
              </span>
              <h3 className="mt-6 font-heading text-xl text-brand-900">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
