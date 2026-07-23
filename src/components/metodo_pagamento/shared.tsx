"use client";

import { CheckCircle2 } from "lucide-react";

// Estilo padrão dos inputs (mesmo do cadastro).
export const field =
  "h-10 w-full rounded-md border border-neutral-200 bg-neutral-100 px-4 text-body text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100";

export type CartaoData = {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
};

export type TitularData = {
  postalCode: string;
  addressNumber: string;
};

// Container com o fundo/estilo da tela de cadastro + popup de sucesso.
export function Wrapper({
  showPopup,
  popupText,
  children,
}: {
  showPopup: boolean;
  popupText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <img src="/img/login-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative z-10 w-full max-w-md space-y-6 rounded-md bg-[rgba(25,48,43,0.92)] p-6 backdrop-blur-sm shadow-xl">
        {children}
      </div>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex animate-in fade-in zoom-in-95 flex-col items-center gap-3 rounded-lg bg-white p-8 text-center shadow-xl duration-300">
            <CheckCircle2 className="h-12 w-12 text-[#19302B]" />
            <p className="text-h4 font-heading text-[#102823]">{popupText}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function Header({ titulo }: { titulo: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <img src="/img/logo-sfs.svg" alt="Sustainable Finance" className="h-14" />
      <h1 className="text-h2 text-white font-heading">{titulo}</h1>
    </div>
  );
}

export function PlanoCard({
  nome,
  desc,
  valor,
  mes,
}: {
  nome: string;
  desc: string;
  valor: string;
  mes: string;
}) {
  return (
    <div className="rounded-md border border-white/15 bg-white/5 p-4">
      <p className="text-h5 text-[#8DD596]">{nome}</p>
      <p className="text-body-sm text-white/70">{desc}</p>
      <p className="mt-2 font-heading text-h2 text-white">
        {valor} <span className="text-body text-white/60">/{mes}</span>
      </p>
    </div>
  );
}
