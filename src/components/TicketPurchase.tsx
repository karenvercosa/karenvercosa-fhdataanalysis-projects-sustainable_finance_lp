"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Layers, X, Minus, Plus, CreditCard } from "lucide-react";
import { EVENT, TICKET } from "@/data/content";

// ---------------------------------------------------------------------------
// Contexto — permite abrir o modal de compra a partir de qualquer botão da LP
// ---------------------------------------------------------------------------
type Ctx = { open: (initialQty?: number) => void };
const TicketCtx = createContext<Ctx | null>(null);

export function useTicketModal() {
  const ctx = useContext(TicketCtx);
  if (!ctx) throw new Error("useTicketModal deve ser usado dentro de <TicketModalProvider>");
  return ctx;
}

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const clampQty = (n: number) => Math.max(1, Math.min(9999, Math.floor(Number.isFinite(n) ? n : 1)));

// Formata CPF (000.000.000-00) ou CNPJ (00.000.000/0000-00) conforme a quantidade de dígitos
const maskDoc = (value: string) => {
  const d = value.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 11) {
    return d
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return d
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
};

// ---------------------------------------------------------------------------
// Botão de compra — abre o modal (usado em toda a landing page)
// ---------------------------------------------------------------------------
export function BuyButton({
  className,
  children,
  qty,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  qty?: number;
  onClick?: () => void;
}) {
  const { open } = useTicketModal();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open(qty);
      }}
      className={className}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Provider + Modal "Adquirir ingressos"
// ---------------------------------------------------------------------------
export function TicketModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [qty, setQty] = useState(TICKET.defaultQuantity);
  const [voucher, setVoucher] = useState("");
  const [doc, setDoc] = useState("");

  const open = useCallback((initialQty?: number) => {
    if (initialQty && initialQty > 0) setQty(clampQty(initialQty));
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // Fechar com Esc + travar o scroll do fundo enquanto aberto
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
  const total = qty * TICKET.pricePerUnit;
  const plural = qty > 1 ? "s" : "";

  return (
    <TicketCtx.Provider value={ctx}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ticket-modal-title"
        >
          <div
            className="flex min-h-full items-end justify-center sm:items-center sm:p-4"
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <div className="relative w-full max-w-lg rounded-t-lg bg-ink-50 shadow-card sm:my-8 sm:rounded-lg">
            {/* Cabeçalho */}
            <div className="flex items-start gap-4 rounded-t-lg border-b border-ink-100 bg-ink-0 p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-brand-subtle/25 text-brand-600">
                <Layers className="size-6" strokeWidth={2} aria-hidden />
              </span>
              <div className="flex-1">
                <h2 id="ticket-modal-title" className="font-heading text-2xl text-brand-900">
                  Adquirir ingressos
                </h2>
                <p className="mt-1 text-sm text-ink-600">Compre convites em lote ou avulso e distribua via voucher.</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Fechar"
                className="grid size-9 shrink-0 place-items-center rounded-md text-ink-600 hover:bg-ink-100"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Corpo */}
            <div className="space-y-4 p-6">
              {/* Comprador */}
              <div className="rounded-lg border border-ink-100 bg-ink-0 p-4">
                <h3 className="font-heading text-base text-brand-900">Dados do comprador</h3>
                <p className="mt-1 text-sm text-ink-600">Informe o documento para emissão da nota e dos ingressos.</p>
                <label className="mt-4 block">
                  <span className="text-sm font-semibold text-brand-900">CPF ou CNPJ</span>
                  <input
                    value={doc}
                    onChange={(e) => setDoc(maskDoc(e.target.value))}
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="000.000.000-00 ou 00.000.000/0000-00"
                    className="mt-2 w-full rounded-md border border-ink-200 bg-ink-0 px-4 py-3 text-brand-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-subtle/40"
                  />
                </label>
              </div>

              {/* Voucher */}
              <div className="rounded-lg border border-ink-100 bg-ink-0 p-4">
                <h3 className="font-heading text-base text-brand-900">Voucher</h3>
                <p className="mt-1 text-sm text-ink-600">
                  Dê um nome ao seu voucher — ele agrupa os convites desta compra para você distribuir.
                </p>
                <label className="mt-4 block">
                  <span className="text-sm font-semibold text-brand-900">Nome do voucher</span>
                  <input
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    placeholder="Ex.: VERDE2026"
                    className="mt-2 w-full rounded-md border border-ink-200 bg-ink-0 px-4 py-3 text-brand-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-subtle/40"
                  />
                </label>
              </div>

              {/* Quantidade */}
              <div className="rounded-lg border border-ink-100 bg-ink-0 p-4">
                <h3 className="font-heading text-base text-brand-900">Quantidade de convites</h3>
                <p className="mt-1 text-sm text-ink-600">
                  Compre em lote ou em pouca quantidade — {brl(TICKET.pricePerUnit)} por convite.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {/* Stepper */}
                  <div className="inline-flex items-center rounded-md border border-ink-200 bg-ink-0">
                    <button
                      type="button"
                      onClick={() => setQty((q) => clampQty(q - 1))}
                      aria-label="Diminuir quantidade"
                      className="grid size-10 place-items-center text-ink-600 hover:bg-ink-100"
                    >
                      <Minus className="size-4" />
                    </button>
                    <input
                      value={qty}
                      onChange={(e) => setQty(clampQty(Number(e.target.value.replace(/\D/g, ""))))}
                      inputMode="numeric"
                      aria-label="Quantidade de convites"
                      className="w-14 border-x border-ink-200 bg-transparent py-2 text-center font-semibold text-brand-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQty((q) => clampQty(q + 1))}
                      aria-label="Aumentar quantidade"
                      className="grid size-10 place-items-center text-ink-600 hover:bg-ink-100"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>

                  {/* Atalhos de quantidade */}
                  {TICKET.quickQuantities.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setQty(n)}
                      aria-pressed={qty === n}
                      className={`grid size-11 place-items-center rounded-full text-sm font-semibold transition-colors ${
                        qty === n ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-600 hover:bg-ink-200"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                {/* Nota de pagamento */}
                <div className="mt-4 flex items-start gap-2 rounded-md bg-ink-100 p-3 text-sm text-ink-600">
                  <CreditCard className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  <p>
                    Pagamento via <strong className="text-brand-900">{TICKET.paymentProvider}</strong> (Cartão ou Pix). Ao
                    concluir, você recebe 1 voucher com {qty} convite{plural} para distribuir.
                  </p>
                </div>

                {/* Resumo */}
                <div className="mt-4 rounded-md bg-ink-100 p-4">
                  <div className="flex items-center justify-between text-sm text-ink-600">
                    <span>{qty} × convite</span>
                    <span>{brl(TICKET.pricePerUnit)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-ink-200 pt-2">
                    <span className="font-heading font-bold text-brand-900">Total</span>
                    <span className="font-heading text-xl font-bold text-brand-900">{brl(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA final */}
            <div className="rounded-b-lg border-t border-ink-100 bg-ink-0 p-6">
              <a
                href={EVENT.ticketsUrl}
                className="flex w-full items-center justify-center rounded-md bg-brand-600 px-6 py-4 text-base font-bold text-white shadow-cta transition-colors hover:bg-brand-700"
              >
                Comprar {qty} convite{plural} · {brl(total)}
              </a>
            </div>
            </div>
          </div>
        </div>
      )}
    </TicketCtx.Provider>
  );
}
