"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, ArrowRight, QrCode, Barcode, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Wrapper, Header, PlanoCard, field, type CartaoData, type TitularData } from "./metodo_pagamento/shared";
import { PixStep } from "./metodo_pagamento/PixStep";
import { CartaoStep } from "./metodo_pagamento/CartaoStep";
import { BoletoStep } from "./metodo_pagamento/BoletoStep";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SENHA_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

// Máscara de CPF: aceita só dígitos (máx. 11) e formata como xxx.xxx.xxx-xx.
function formatarCpf(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length > 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  if (d.length > 6) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  if (d.length > 3) return `${d.slice(0, 3)}.${d.slice(3)}`;
  return d;
}

type Billing = "PIX" | "CREDIT_CARD" | "BOLETO";
type Step = "dados" | "pix" | "cartao" | "boleto" | "sucesso";

export default function AssinaturaPage() {
  const t = useTranslations("Assinatura");

  const [step, setStep] = useState<Step>("dados");
  const [billing, setBilling] = useState<Billing>("PIX");
  const [internacional, setInternacional] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", cpf: "", password: "" });
  const [card, setCard] = useState<CartaoData>({ holderName: "", number: "", expiryMonth: "", expiryYear: "", ccv: "" });
  const [titular, setTitular] = useState<TitularData>({ postalCode: "", addressNumber: "" });

  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [pix, setPix] = useState<{ encodedImage: string; payload: string } | null>(null);
  const [boleto, setBoleto] = useState<{ bankSlipUrl?: string; identificationField?: string } | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [popup, setPopup] = useState(false);

  const emailValido = EMAIL_REGEX.test(form.email);
  const senhaValida = SENHA_REGEX.test(form.password);
  const cpfDigitos = form.cpf.replace(/\D/g, "");
  const cpfValido = cpfDigitos.length === 11; // apenas CPF
  const dadosValidos =
    form.name.trim() && emailValido && senhaValida && cpfValido && form.phone.trim().length >= 8;

  // Aplica a máscara de CPF a cada tecla.
  const onCpfChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, cpf: formatarCpf(e.target.value) }));

  const setF = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const setC = (k: keyof CartaoData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setCard((c) => ({ ...c, [k]: e.target.value }));
  const setTit = (k: keyof TitularData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitular((tt) => ({ ...tt, [k]: e.target.value }));

  // Confirma o pagamento: mostra o popup e, em seguida, o card de sucesso.
  function confirmarPago() {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
      setStep("sucesso");
    }, 2200);
  }

  // Polling do PIX/Boleto enquanto aguarda a confirmação do Asaas.
  useEffect(() => {
    if ((step !== "pix" && step !== "boleto") || !paymentId) return;
    let active = true;
    const id = setInterval(async () => {
      try {
        const res = await fetch(`/api/assinatura/status?paymentId=${paymentId}`);
        const data = await res.json();
        if (active && data.pago) {
          clearInterval(id);
          confirmarPago();
        }
      } catch {
        /* rede instável — tenta de novo no próximo ciclo */
      }
    }, 4000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [step, paymentId]);

  const iniciar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dadosValidos || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/assinatura/iniciar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, billingType: billing, internacional }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || t("erroGenerico"));
        return;
      }
      setPaymentId(data.paymentId);
      if (billing === "PIX") {
        setPix(data.pix);
        setStep("pix");
      } else if (billing === "BOLETO") {
        setBoleto(data.boleto);
        setStep("boleto");
      } else {
        setStep("cartao");
      }
    } catch {
      setErrorMsg(t("erroGenerico"));
    } finally {
      setSubmitting(false);
    }
  };

  const pagarCartao = async () => {
    if (submitting) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/assinatura/pagar-cartao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId,
          card,
          titular: {
            name: card.holderName || form.name,
            email: form.email,
            // Asaas exige o CPF do titular sempre — inclusive para cartão internacional.
            cpfCnpj: cpfDigitos,
            postalCode: titular.postalCode,
            addressNumber: titular.addressNumber,
            phone: form.phone,
          },
          internacional,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || t("erroPagamento"));
        return;
      }
      if (data.pago) confirmarPago();
      else setErrorMsg(t("pagamentoNaoAprovado"));
    } catch {
      setErrorMsg(t("erroPagamento"));
    } finally {
      setSubmitting(false);
    }
  };

  const copiar = async () => {
    if (!pix?.payload) return;
    try {
      await navigator.clipboard.writeText(pix.payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponível */
    }
  };

  const popupText = t("popupSucesso");

  // ---- Tela de sucesso ----
  if (step === "sucesso") {
    return (
      <Wrapper showPopup={popup} popupText={popupText}>
        <div className="flex animate-in fade-in zoom-in-95 flex-col items-center gap-4 py-6 text-center duration-300">
          <img src="/img/logo-sfs.svg" alt="Sustainable Finance" className="h-12 w-auto" />
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-[#8DD596]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-h2 font-heading text-white">{t("sucessoTitulo")}</h2>
            <p className="text-body text-white/80">{t("sucessoDesc")}</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#8DD596] px-6 py-3 font-semibold text-[#102823] transition-all hover:brightness-110 active:brightness-95"
        >
          {t("btnVoltarInicio")}
        </Link>
      </Wrapper>
    );
  }

  // ---- Etapas de pagamento (modularizadas em metodo_pagamento/) ----
  if (step === "pix") {
    return (
      <Wrapper showPopup={popup} popupText={popupText}>
        <PixStep pix={pix} copied={copied} onCopy={copiar} />
      </Wrapper>
    );
  }

  if (step === "boleto") {
    return (
      <Wrapper showPopup={popup} popupText={popupText}>
        <BoletoStep boleto={boleto} />
      </Wrapper>
    );
  }

  if (step === "cartao") {
    return (
      <Wrapper showPopup={popup} popupText={popupText}>
        <CartaoStep
          card={card}
          onCardChange={setC}
          titular={titular}
          onTitularChange={setTit}
          submitting={submitting}
          errorMsg={errorMsg}
          onPagar={pagarCartao}
        />
      </Wrapper>
    );
  }

  // ---- Etapa 1: dados + método ----
  return (
    <Wrapper showPopup={popup} popupText={popupText}>
      <form onSubmit={iniciar} className="space-y-6">
        <Header titulo={t("titulo")} />
        <PlanoCard nome={t("planoNome")} desc={t("planoDesc")} valor={t("valorMensal")} mes={t("mes")} />

        {/* Método de pagamento */}
        <div className="space-y-2">
          <label className="block text-h5 text-white">{t("metodoTitulo")}</label>
          <div className="grid grid-cols-3 gap-2">
            {([
              { key: "PIX", label: t("metodoPix"), icon: QrCode },
              { key: "CREDIT_CARD", label: t("metodoCartao"), icon: CreditCard },
              { key: "BOLETO", label: t("metodoBoleto"), icon: Barcode },
            ] as const).map((m) => {
              const ativo = billing === m.key;
              const Ico = m.icon;
              return (
                <button
                  type="button"
                  key={m.key}
                  onClick={() => setBilling(m.key)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-md border px-2 py-3 text-body-sm font-medium transition-all",
                    ativo ? "border-[#8DD596] bg-[#8DD596] text-[#102823]" : "border-white/20 text-white hover:border-white/50"
                  )}
                >
                  <Ico className="h-5 w-5" />
                  {m.label}
                </button>
              );
            })}
          </div>
          {billing === "CREDIT_CARD" && (
            <label className="flex cursor-pointer items-center gap-2 pt-1 text-body-sm text-white/85">
              <input
                type="checkbox"
                checked={internacional}
                onChange={(e) => setInternacional(e.target.checked)}
                className="h-4 w-4 accent-[#8DD596]"
              />
              {t("cartaoInternacional")}
            </label>
          )}
        </div>

        {/* Dados do usuário (cadastro) */}
        <div className="space-y-4">
          <label className="block text-h5 text-white">{t("dadosTitulo")}</label>
          <div className="space-y-1.5">
            <input value={form.name} onChange={setF("name")} placeholder={t("placeholderNome")} className={field} />
          </div>
          <div className="space-y-1.5">
            <input type="email" value={form.email} onChange={setF("email")} placeholder={t("placeholderEmail")} className={field} />
            {form.email.length > 0 && !emailValido && <p className="text-body-sm text-red-300">{t("erroEmail")}</p>}
          </div>
          <div className="space-y-1.5">
            <input value={form.phone} onChange={setF("phone")} placeholder={t("placeholderCelular")} className={field} />
          </div>
          <div className="space-y-1.5">
            <input value={form.cpf} onChange={onCpfChange} placeholder={t("placeholderCpf")} inputMode="numeric" maxLength={14} className={field} />
            {form.cpf.length > 0 && !cpfValido && <p className="text-body-sm text-red-300">{t("erroCpf")}</p>}
          </div>
          <div className="space-y-1.5">
            <input type="password" value={form.password} onChange={setF("password")} placeholder={t("placeholderSenha")} autoComplete="new-password" className={field} />
            <p className={cn("text-body-sm", form.password.length > 0 && !senhaValida ? "text-red-300" : "text-white/70")}>
              {t("senhaRequisitos")}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={!dadosValidos || submitting}
          className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#8DD596] px-6 py-3 font-semibold text-[#102823] transition-all hover:brightness-110 disabled:opacity-50"
        >
          {submitting ? t("processando") : t("btnProximo")} <ArrowRight className="h-4 w-4" />
        </button>
        {errorMsg && <p className="text-center text-body-sm text-red-300">{errorMsg}</p>}

        <Link href="/" className="block w-full text-center text-body-sm font-medium text-white underline hover:text-[#8DD596]">
          {t("btnVoltar")}
        </Link>
      </form>
    </Wrapper>
  );
}
