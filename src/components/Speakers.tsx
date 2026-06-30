"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { SPEAKERS } from "@/data/content";

export function Speakers() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? SPEAKERS : SPEAKERS.filter((s) => s.featured);

  return (
    <section id="palestrantes" className="bg-ink-50 py-20 lg:py-32">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">Quem você vai encontrar</p>
          <h2 className="mt-4 font-heading text-3xl text-brand-900 sm:text-4xl">Palestrantes que movem o mercado</h2>
          <p className="mt-4 text-lg text-ink-600">
            Lideranças do capital, do agro, da regulação e da tecnologia que estão construindo a transição verde na
            prática.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {visible.map((s) => (
            <article
              key={s.name}
              className="overflow-hidden rounded-lg border border-ink-100 bg-ink-0 transition-shadow hover:shadow-card"
            >
              <Avatar name={s.name} />
              <div className="p-4 sm:p-6">
                <h3 className="font-heading text-lg text-brand-900">{s.name}</h3>
                <p className="mt-1 text-sm text-ink-600">{s.role}</p>
                <p className="mt-2 text-sm font-semibold text-brand-500">{s.company}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="inline-flex items-center gap-2 rounded-sm border border-brand-500 px-8 py-4 text-base font-semibold text-brand-500 transition-colors hover:bg-brand-500 hover:text-white"
          >
            {showAll ? "Mostrar menos" : "Visualizar todos os palestrantes"}
            <ChevronDown className={`size-5 transition-transform ${showAll ? "rotate-180" : ""}`} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
