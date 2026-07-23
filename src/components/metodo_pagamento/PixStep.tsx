"use client";

import { Link } from "@/i18n/navigation";
import { QrCode, Copy, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Header, field } from "./shared";

type PixData = { encodedImage: string; payload: string };

/** Etapa de pagamento via PIX: copia-e-cola + QR Code, aguardando confirmação. */
export function PixStep({
  pix,
  copied,
  onCopy,
}: {
  pix: PixData | null;
  copied: boolean;
  onCopy: () => void;
}) {
  const t = useTranslations("Assinatura");

  return (
    <>
      <Header titulo={t("titulo")} />
      <div className="space-y-4">
        <h2 className="flex items-center gap-2 text-h4 font-heading text-white">
          <QrCode className="h-5 w-5" /> {t("pixTitulo")}
        </h2>

        <div className="space-y-1.5">
          <label className="block text-h5 text-white">{t("pixCopiaCola")}</label>
          <div className="flex gap-2">
            <input readOnly value={pix?.payload || ""} className={cn(field, "text-body-sm")} />
            <button
              type="button"
              onClick={onCopy}
              className="flex shrink-0 items-center gap-1.5 rounded-md bg-[#8DD596] px-3 font-semibold text-[#102823] transition hover:brightness-110"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? t("copiado") : t("btnCopiar")}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-body-sm text-white/70">{t("pixQr")}</p>
          {pix?.encodedImage && (
            <img
              src={`data:image/png;base64,${pix.encodedImage}`}
              alt="QR Code PIX"
              className="h-52 w-52 rounded-md bg-white p-2"
            />
          )}
        </div>

        <p className="flex items-center justify-center gap-2 text-body-sm text-white/70">
          <Loader2 className="h-4 w-4 animate-spin" /> {t("pixAguardando")}
        </p>
      </div>
      <Link href="/" className="block w-full text-center text-body-sm font-medium text-white underline hover:text-[#8DD596]">
        {t("btnVoltar")}
      </Link>
    </>
  );
}
