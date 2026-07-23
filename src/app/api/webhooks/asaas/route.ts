import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Webhook do Asaas: confirma o pagamento automaticamente (produção).
// Em sandbox/localhost o front também confirma via polling em /api/assinatura/status.
export async function POST(req: Request) {
  try {
    // Segurança: valida o token do webhook, se configurado.
    const token = process.env.ASAAS_WEBHOOK_TOKEN;
    if (token) {
      const recebido = req.headers.get("asaas-access-token");
      if (recebido !== token) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
      }
    }

    const body = await req.json();

    if (body.event === "PAYMENT_RECEIVED" || body.event === "PAYMENT_CONFIRMED") {
      const paymentId = body.payment?.id;
      if (paymentId) {
        await prisma.assinaturaPlataforma.updateMany({
          where: { asaasPaymentId: paymentId },
          data: { status: "ativa" },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[webhooks/asaas]", error);
    return NextResponse.json({ error: "Erro no Webhook" }, { status: 500 });
  }
}
