import { useEffect, useState, ReactNode } from "react";
import { Cookie, FileText, ShieldCheck } from "lucide-react";
import { LEGAL_DOCS, LEGAL_ORDER, type LegalDocId } from "@/data/legal";
import { cn } from "@/lib/utils";

// Mock Button
function Button({ children, onClick, variant = "primary" }: Readonly<{ children: ReactNode; onClick?: () => void; variant?: string }>) {
  return <button type="button" onClick={onClick} className={cn("px-4 py-2 rounded-md font-medium text-sm transition-colors", variant === "outline" ? "border border-neutral-300 hover:bg-neutral-100 text-neutral-700" : "bg-[#8DD596] text-[#102823] hover:brightness-110")}>{children}</button>;
}

// Mock Modal
function Modal({ open, onClose, title, children, footer, className }: Readonly<{ open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode; className?: string }>) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className={cn("bg-white rounded-lg shadow-xl w-full max-h-[90vh] flex flex-col", className)}>
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
          <button type="button" onClick={onClose} className="text-neutral-500 hover:text-neutral-700">&times;</button>
        </div>
        <div className="p-4 overflow-y-auto flex-1">
          {children}
        </div>
        {footer && <div className="border-t p-4 flex justify-end gap-2 bg-neutral-50 rounded-b-lg">{footer}</div>}
      </div>
    </div>
  );
}

const ICONE: Record<LegalDocId, typeof FileText> = {
  termos: FileText,
  privacidade: ShieldCheck,
  cookies: Cookie
};

/** Leitor dos documentos legais, com troca entre eles sem sair do modal. */
export function LegalModal({
  open,
  onClose,
  docInicial = "termos"
}: Readonly<{
  open: boolean;
  onClose: () => void;
  docInicial?: LegalDocId;
}>) {
  const [atual, setAtual] = useState<LegalDocId>(docInicial);
  const revisar = () => {};
  const doc = LEGAL_DOCS[atual];

  // O modal fica montado, então `docInicial` precisa ser reaplicado a cada
  // abertura — senão qualquer clique cai no documento da primeira montagem.
  useEffect(() => {
    if (open) setAtual(docInicial);
  }, [open, docInicial]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Legal & Privacidade"
      className="max-w-2xl"
      footer={
        <>
          <Button
            variant="outline"
            onClick={() => {
              // Reabre o banner para a pessoa decidir de novo.
              revisar();
              onClose();
            }}
          >
            Preferências de cookies
          </Button>
          <Button onClick={onClose}>Fechar</Button>
        </>
      }
    >
      <div className="space-y-3">
        {/* Atalhos entre os documentos */}
        <div className="flex flex-wrap gap-2">
          {LEGAL_ORDER.map((id) => {
            const Icone = ICONE[id];
            return (
              <button
                key={id}
                onClick={() => setAtual(id)}
                aria-current={id === atual}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-body-sm transition-colors",
                  id === atual ? "bg-primary-500 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                )}
              >
                <Icone className="h-3.5 w-3.5" /> {LEGAL_DOCS[id].title}
              </button>
            );
          })}
        </div>

        <div>
          <p className="text-body-sm text-neutral-500">
            Atualizado em {doc.updatedAt} · {doc.summary}
          </p>
        </div>

        {/* Corpo do documento — a rolagem é do próprio Modal */}
        <div className="space-y-4">
          {doc.sections.map((s) => (
            <section key={s.heading} className="space-y-1.5">
              <h3 className="text-h5 text-neutral-900">{s.heading}</h3>
              {s.body.map((p, i) => (
                <p key={`${p.substring(0, 20)}-${i}`} className="text-body-sm leading-relaxed text-neutral-700">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </Modal>
  );
}
