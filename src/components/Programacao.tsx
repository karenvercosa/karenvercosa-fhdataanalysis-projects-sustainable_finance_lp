"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { SCHEDULE } from "@/data/content";

type Turn = keyof typeof SCHEDULE;
const TURNS = Object.keys(SCHEDULE) as Turn[];

export function Programacao() {
  const [active, setActive] = useState<Turn>("manha");
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Move o indicador para a aba ativa (após layout/fontes)
  useLayoutEffect(() => {
    const btn = listRef.current?.querySelector<HTMLButtonElement>(`#tab-${active}`);
    if (btn) setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [active]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = TURNS.indexOf(active);
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = TURNS[(i + dir + TURNS.length) % TURNS.length];
    setActive(next);
    listRef.current?.querySelector<HTMLButtonElement>(`#tab-${next}`)?.focus();
  }

  return (
    <section id="programacao" className="bg-brand-900 py-20 text-white lg:py-32">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-subtle">Programação</p>
          <h2 className="mt-4 font-heading text-3xl text-white sm:text-4xl">Um dia inteiro, três turnos de imersão</h2>
          <p className="mt-4 text-lg text-ink-200">
            Alterne entre os turnos e veja painéis, horários e palestrantes. Conteúdo curado em trilhas temáticas
            complementares.
          </p>
        </div>

        <div className="reveal mt-12">
          {/* Triggers */}
          <div
            ref={listRef}
            role="tablist"
            aria-label="Turnos do evento"
            onKeyDown={onKeyDown}
            className="relative inline-flex rounded-lg border border-white/15 bg-brand-700/50 p-1"
          >
            <span
              aria-hidden
              className="absolute bottom-1 top-1 rounded-md bg-brand-subtle transition-all duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width }}
            />
            {TURNS.map((t) => {
              const selected = t === active;
              return (
                <button
                  key={t}
                  id={`tab-${t}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`panel-${t}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(t)}
                  className={`relative z-10 rounded-md px-5 py-3 text-sm font-semibold transition-colors sm:px-8 ${
                    selected ? "text-brand-900" : "text-white/70 hover:text-white"
                  }`}
                >
                  {SCHEDULE[t].emoji} {SCHEDULE[t].label}
                </button>
              );
            })}
          </div>

          {/* Painéis */}
          <div className="relative mt-8">
            {TURNS.map((t) => (
              <div
                key={t}
                role="tabpanel"
                id={`panel-${t}`}
                aria-labelledby={`tab-${t}`}
                hidden={t !== active}
                className="space-y-4 transition-opacity duration-300"
              >
                {SCHEDULE[t].sessions.map((s) => (
                  <div
                    key={s.time + s.title}
                    className="flex flex-col gap-4 rounded-lg border border-white/10 bg-brand-700/40 p-6 transition-colors hover:border-brand-subtle/60 sm:flex-row sm:items-center"
                  >
                    <span className="inline-flex shrink-0 items-center justify-center rounded-md bg-brand-subtle/15 px-4 py-2 font-heading font-bold text-brand-subtle">
                      {s.time}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg text-white">{s.title}</h3>
                      {s.track && <p className="mt-1 text-sm text-ink-200">{s.track}</p>}
                      {s.speakers && <p className="mt-2 text-sm text-brand-subtle">{s.speakers}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
