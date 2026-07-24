"use client";

import { Link } from "@/i18n/navigation";
import { Barcode, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Header, field } from "./shared";

type BoletoData = { bankSlipUrl?: string; identificationField?: string };

/** Etapa de pagamento via Boleto: linha digitável + PDF, aguardando compensação. */
export function BoletoStep({ boleto }: Readonly<{ boleto: BoletoData | null }>) {
  const t = useTranslations("Assinatura");

  return (
    <>
      <Header titulo={t("titulo")} />
      <div className="space-y-4">
        <h2 className="flex items-center gap-2 text-h4 font-heading text-white">
          <Barcode className="h-5 w-5" /> {t("boletoTitulo")}
        </h2>
        {boleto?.identificationField && (
          <div className="space-y-1.5">
            <label className="block text-h5 text-white">{t("boletoLinha")}</label>
            <input readOnly value={boleto.identificationField} className={cn(field, "text-body-sm")} />
          </div>
        )}
        {boleto?.bankSlipUrl && (
          <a
            href={boleto.bankSlipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#8DD596] px-6 py-3 font-semibold text-[#102823] transition-all hover:brightness-110"
          >
            {t("btnAbrirBoleto")} <ArrowRight className="h-4 w-4" />
          </a>
        )}
        <p className="flex items-center justify-center gap-2 text-body-sm text-white/70">
          <Loader2 className="h-4 w-4 animate-spin" /> {t("boletoAguardando")}
        </p>
      </div>
      <Link href="/" className="block w-full text-center text-body-sm font-medium text-white underline hover:text-[#8DD596]">
        {t("btnVoltar")}
      </Link>
    </>
  );
}
