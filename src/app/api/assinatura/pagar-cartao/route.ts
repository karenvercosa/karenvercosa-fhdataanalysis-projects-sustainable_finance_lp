import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { payWithCreditCard, isPago } from "@/services/asaas.service";

export async function POST(req: Request) {
  try {
    const { paymentId, card, titular, internacional } = await req.json();

    if (!paymentId || !card?.number || !card?.holderName) {
      return NextResponse.json({ error: "Dados do cartão incompletos." }, { status: 400 });
    }

    // IP de origem (exigido pelo Asaas na tokenização do cartão).
    const remoteIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    const payment = await payWithCreditCard({
      paymentId,
      card,
      titular,
      remoteIp,
    });

    const pago = isPago(payment.status);

    // Se aprovado, ativa a assinatura no banco.
    if (pago) {
      await prisma.assinaturaPlataforma.updateMany({
        where: { asaasPaymentId: paymentId },
        data: { status: "ativa" },
      });
    }

    return NextResponse.json({ status: payment.status, pago, internacional: Boolean(internacional) });
  } catch (error: any) {
    console.error("[assinatura/pagar-cartao]", error);
    return NextResponse.json({ error: error?.message || "Erro ao processar o pagamento." }, { status: 400 });
  }
}
