import { EVENT } from "@/data/content";

export function Footer() {
  return (
    <footer className="bg-ink-1000 text-ink-200">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-sfs.svg" alt="Sustainable Finance 2026" width={150} height={53} className="h-10 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-ink-400">
              O maior evento de finanças sustentáveis do Brasil. Goiânia, 04 de setembro de 2026.
            </p>
          </div>

          <nav className="text-sm">
            <h3 className="font-heading text-white">Evento</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#oportunidade" className="transition-colors hover:text-brand-subtle">Sobre</a></li>
              <li><a href="#programacao" className="transition-colors hover:text-brand-subtle">Programação</a></li>
              <li><a href="#palestrantes" className="transition-colors hover:text-brand-subtle">Palestrantes</a></li>
              <li><a href="#publico" className="transition-colors hover:text-brand-subtle">Para quem é</a></li>
            </ul>
          </nav>

          <nav className="text-sm">
            <h3 className="font-heading text-white">Institucional</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#ingressos" className="transition-colors hover:text-brand-subtle">Comprar ingressos</a></li>
              <li><a href="#faq" className="transition-colors hover:text-brand-subtle">Perguntas frequentes</a></li>
              <li><a href="#" className="transition-colors hover:text-brand-subtle">Política de Privacidade</a></li>
              <li><a href="#" className="transition-colors hover:text-brand-subtle">Conformidade LGPD</a></li>
            </ul>
          </nav>

          <div className="text-sm">
            <h3 className="font-heading text-white">Contato</h3>
            <ul className="mt-4 space-y-3">
              <li><a href={`mailto:${EVENT.salesEmail}`} className="transition-colors hover:text-brand-subtle">{EVENT.salesEmail}</a></li>
              <li>{EVENT.venue}</li>
              <li>{EVENT.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-ink-400 sm:flex-row">
          <p>© 2026 Sustainable Finance. Todos os direitos reservados.</p>
          <p>
            Tratamos seus dados em conformidade com a{" "}
            <span className="text-ink-200">LGPD (Lei nº 13.709/2018)</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
