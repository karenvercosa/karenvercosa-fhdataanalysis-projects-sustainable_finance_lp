"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/data/content";

export function Faq() {
  // Accordion exclusivo (prevenção de sobrecarga cognitiva)
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ink-0 py-20 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">Dúvidas frequentes</p>
          <h2 className="mt-4 font-heading text-3xl text-brand-900 sm:text-4xl">
            Tudo o que você precisa saber antes de comprar seu ingresso
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="overflow-hidden rounded-lg border border-ink-100">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-heading text-lg text-brand-900">{item.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-brand-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={2}
                  />
                </button>
                <div className="acc-panel" data-open={isOpen}>
                  <div>
                    <p className="px-6 pb-6 leading-relaxed text-ink-600">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reforço de CTA pós-FAQ */}
        <div className="reveal mt-12 rounded-lg bg-brand-900 p-8 text-center">
          <p className="font-heading text-xl text-white">Garanta seu ingresso para o SFS 2026.</p>
          <a
            href="#ingressos"
            className="mt-4 inline-flex items-center gap-2 rounded-sm bg-brand-subtle px-8 py-4 font-semibold text-brand-900 transition-colors hover:bg-white"
          >
            Comprar ingressos
          </a>
        </div>
      </div>
    </section>
  );
}
