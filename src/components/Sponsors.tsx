import { SPONSORS } from "@/data/content";

export function Sponsors() {
  // Duplicado para o loop infinito da esteira
  const track = [...SPONSORS, ...SPONSORS];

  return (
    <section className="bg-ink-50 py-16 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-ink-600">
          Apoio institucional &amp; patrocinadores
        </p>

        <div className="marquee mt-10">
          <div className="marquee-track flex w-max animate-marquee items-center gap-16">
            {track.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap font-heading text-2xl font-bold text-ink-400 transition-colors hover:text-brand-500"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
