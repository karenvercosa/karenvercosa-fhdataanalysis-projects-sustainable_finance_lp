import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPaymentStatus, isPago } from "@/services/asaas.service";

// Consulta o status de uma cobrança — usado pelo front para "aguardar" o PIX/boleto.
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get("paymentId");
    if (!paymentId) {
      return NextResponse.json({ error: "paymentId é obrigatório." }, { status: 400 });
    }

    const status = await getPaymentStatus(paymentId);
    const pago = isPago(status);

    if (pago) {
      await prisma.assinaturaPlataforma.updateMany({
        where: { asaasPaymentId: paymentId },
        data: { status: "ativa" },
      });
    }

    return NextResponse.json({ status, pago });
  } catch (error: any) {
    console.error("[assinatura/status]", error);
    return NextResponse.json({ error: error?.message || "Erro ao consultar o pagamento." }, { status: 500 });
  }
}
