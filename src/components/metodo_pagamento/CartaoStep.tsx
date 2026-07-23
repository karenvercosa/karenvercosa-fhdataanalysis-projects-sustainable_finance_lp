"use client";

import { Link } from "@/i18n/navigation";
import { CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";
import { Header, field, type CartaoData, type TitularData } from "./shared";

/** Etapa de pagamento via Cartão de crédito (nacional ou internacional). */
export function CartaoStep({
  card,
  onCardChange,
  titular,
  onTitularChange,
  submitting,
  errorMsg,
  onPagar,
}: {
  card: CartaoData;
  onCardChange: (k: keyof CartaoData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  titular: TitularData;
  onTitularChange: (k: keyof TitularData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitting: boolean;
  errorMsg: string | null;
  onPagar: () => void;
}) {
  const t = useTranslations("Assinatura");

  return (
    <>
      <Header titulo={t("titulo")} />
      <div className="space-y-4">
        <h2 className="flex items-center gap-2 text-h4 font-heading text-white">
          <CreditCard className="h-5 w-5" /> {t("cartaoTitulo")}
        </h2>

        <div className="space-y-1.5">
          <label className="block text-h5 text-white">{t("labelTitular")}</label>
          <input value={card.holderName} onChange={onCardChange("holderName")} placeholder={t("placeholderTitular")} className={field} />
        </div>
        <div className="space-y-1.5">
          <label className="block text-h5 text-white">{t("labelNumero")}</label>
          <input value={card.number} onChange={onCardChange("number")} placeholder="0000 0000 0000 0000" inputMode="numeric" className={field} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="block text-h5 text-white">{t("labelMes")}</label>
            <input value={card.expiryMonth} onChange={onCardChange("expiryMonth")} placeholder="MM" inputMode="numeric" className={field} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-h5 text-white">{t("labelAno")}</label>
            <input value={card.expiryYear} onChange={onCardChange("expiryYear")} placeholder="AAAA" inputMode="numeric" className={field} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-h5 text-white">{t("labelCvv")}</label>
            <input value={card.ccv} onChange={onCardChange("ccv")} placeholder="123" inputMode="numeric" className={field} />
          </div>
        </div>

        {/* Endereço do titular: exigido pelo Asaas. O CPF vem do cadastro. */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-h5 text-white">{t("labelCep")}</label>
            <input value={titular.postalCode} onChange={onTitularChange("postalCode")} placeholder="00000-000" className={field} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-h5 text-white">{t("labelNumeroEndereco")}</label>
            <input value={titular.addressNumber} onChange={onTitularChange("addressNumber")} placeholder="123" className={field} />
          </div>
        </div>

        <button
          type="button"
          onClick={onPagar}
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#8DD596] px-6 py-3 font-semibold text-[#102823] transition-all hover:brightness-110 disabled:opacity-50"
        >
          {submitting ? t("processando") : t("btnRealizarPagamento")}
        </button>
        {errorMsg && <p className="text-center text-body-sm text-red-300">{errorMsg}</p>}
      </div>
      <Link href="/" className="block w-full text-center text-body-sm font-medium text-white underline hover:text-[#8DD596]">
        {t("btnVoltar")}
      </Link>
    </>
  );
}
