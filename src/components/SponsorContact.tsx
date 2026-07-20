"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { EVENT } from "@/data/content";

// ---------------------------------------------------------------------------
// Contexto — abre o modal "Seja um patrocinador" de qualquer botão da LP
// ---------------------------------------------------------------------------
type Ctx = { open: () => void };
const SponsorCtx = createContext<Ctx | null>(null);

export function useSponsorModal() {
  const ctx = useContext(SponsorCtx);
  if (!ctx) throw new Error("useSponsorModal deve ser usado dentro de <SponsorModalProvider>");
  return ctx;
}

const labelCls = "block text-sm font-bold text-brand-900";
const inputCls =
  "mt-2 w-full rounded-md border border-transparent bg-ink-100 px-4 py-3 text-brand-900 placeholder:text-ink-400 focus:border-brand-500 focus:bg-ink-0 focus:outline-none focus:ring-2 focus:ring-brand-subtle/40";

// ---------------------------------------------------------------------------
// Botão que abre o modal
// ---------------------------------------------------------------------------
export function SponsorButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const { open } = useSponsorModal();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open();
      }}
      className={className}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Provider + Modal
// ---------------------------------------------------------------------------
export function SponsorModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", empresa: "", cargo: "", telefone: "" });

  const open = useCallback(() => {
    setSent(false);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // Esc para fechar + trava o scroll do fundo
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  const ctx = useMemo(() => ({ open }), [open]);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Sem backend: encaminha o lead por e-mail com os dados preenchidos.
  // TODO: trocar por POST no endpoint/CRM quando existir.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = [
      `Nome: ${form.nome}`,
      `E-mail: ${form.email}`,
      `Empresa: ${form.empresa}`,
      `Cargo: ${form.cargo}`,
      `Telefone: ${form.telefone}`,
    ].join("\n");
    const href = `mailto:${EVENT.salesEmail}?subject=${encodeURIComponent(
      "Seja um patrocinador / curador — SFS 2026"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  }

  return (
    <SponsorCtx.Provider value={ctx}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sponsor-modal-title"
        >
          <div
            className="flex min-h-full items-end justify-center sm:items-center sm:p-4"
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <div className="relative w-full max-w-lg rounded-t-lg bg-ink-0 shadow-card sm:my-8 sm:rounded-lg">
              {/* Fechar */}
              <button
                type="button"
                onClick={close}
                aria-label="Fechar"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-md text-ink-400 hover:bg-ink-100 hover:text-ink-600"
              >
                <X className="size-5" />
              </button>

              <div className="px-6 pb-8 pt-12 sm:px-10">
                <h2
                  id="sponsor-modal-title"
                  className="text-center font-heading text-2xl text-brand-900 sm:text-3xl"
                >
                  Seja um patrocinador
                </h2>

                {sent ? (
                  <div className="mt-8 rounded-lg bg-ink-50 p-6 text-center">
                    <p className="font-heading text-lg text-brand-900">Quase lá!</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      Abrimos seu e-mail com os dados já preenchidos — basta enviar. Se nada abriu, escreva para{" "}
                      <a className="font-semibold text-brand-600 underline" href={`mailto:${EVENT.salesEmail}`}>
                        {EVENT.salesEmail}
                      </a>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={close}
                      className="mt-6 rounded-md bg-brand-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
                    >
                      Fechar
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <label className="block">
                      <span className={labelCls}>Nome:</span>
                      <input required value={form.nome} onChange={set("nome")} autoComplete="name" className={inputCls} />
                    </label>

                    <label className="block">
                      <span className={labelCls}>E-mail:</span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        autoComplete="email"
                        className={inputCls}
                      />
                    </label>

                    <label className="block">
                      <span className={labelCls}>Empresa:</span>
                      <input
                        required
                        value={form.empresa}
                        onChange={set("empresa")}
                        autoComplete="organization"
                        className={inputCls}
                      />
                    </label>

                    <label className="block">
                      <span className={labelCls}>Cargo:</span>
                      <input
                        value={form.cargo}
                        onChange={set("cargo")}
                        autoComplete="organization-title"
                        className={inputCls}
                      />
                    </label>

                    <label className="block">
                      <span className={labelCls}>Telefone:</span>
                      <input
                        value={form.telefone}
                        onChange={set("telefone")}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className={inputCls}
                      />
                    </label>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="rounded-md bg-brand-600 px-8 py-3 text-base font-semibold text-white shadow-cta transition-colors hover:bg-brand-700"
                      >
                        Enviar
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </SponsorCtx.Provider>
  );
}
