"use client";

import { useState } from "react";
import { ChevronDown, Leaf } from "lucide-react";
import { TRILHAS } from "@/data/content";

export function Programacao() {
  // Accordion de trilhas — independentes; a primeira abre por padrão.
  const [open, setOpen] = useState<Record<number, boolean>>({ 1: true });
  const toggle = (n: number) => setOpen((s) => ({ ...s, [n]: !s[n] }));

  return (
    <section id="programacao" className="bg-brand-900 py-20 text-white lg:py-32">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-subtle">Programação</p>
          <h2 className="mt-4 font-heading text-3xl text-white sm:text-4xl">Trilhas de conteúdo</h2>
          <p className="mt-4 text-lg text-ink-200">
            Quatro trilhas temáticas cobrindo capital, regulação, inovação, descarbonização e bioeconomia. Toque para
            explorar os painéis de cada uma.
          </p>
        </div>

        <div className="reveal mt-12 space-y-4">
          {TRILHAS.map((trilha) => {
            const isOpen = !!open[trilha.n];
            return (
              <div key={trilha.n} className="overflow-hidden rounded-lg border border-white/10 bg-brand-700/40">
                <button
                  type="button"
                  onClick={() => toggle(trilha.n)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 p-6 text-left transition-colors hover:bg-brand-700/60"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-brand-subtle text-brand-900">
                    <Leaf className="size-5" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className="text-sm font-semibold text-brand-subtle">Trilha {trilha.n}</span>
                    <span className="block font-heading text-lg text-white sm:text-xl">{trilha.title}</span>
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-brand-subtle transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>

                <div className="acc-panel" data-open={isOpen}>
                  <div>
                    <ul className="space-y-4 px-6 pb-6 sm:pl-20">
                      {trilha.topics.map((t) => (
                        <li key={t.title} className="border-l-2 border-brand-subtle/40 pl-4">
                          <h3 className="font-heading text-base text-white">{t.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-ink-200">{t.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
