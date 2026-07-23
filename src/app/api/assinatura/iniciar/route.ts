import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  createCustomer,
  createSubscription,
  getFirstSubscriptionPayment,
  getPixQrCode,
  getBoletoInfo,
  type BillingType,
} from "@/services/asaas.service";

// Valor mensal do plano da plataforma (R$).
const VALOR_MENSAL = 300;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SENHA_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const BILLING_VALIDOS: BillingType[] = ["PIX", "CREDIT_CARD", "BOLETO"];

export async function POST(req: Request) {
  try {
    const { name, email, phone, cpf, password, billingType, internacional } = await req.json();

    // 1. Validações
    if (!name?.trim() || !EMAIL_REGEX.test(email || "")) {
      return NextResponse.json({ error: "Nome ou e-mail inválidos." }, { status: 400 });
    }
    if (!SENHA_REGEX.test(password || "")) {
      return NextResponse.json({ error: "Senha não atende aos requisitos." }, { status: 400 });
    }
    if (!BILLING_VALIDOS.includes(billingType)) {
      return NextResponse.json({ error: "Método de pagamento inválido." }, { status: 400 });
    }
    // CPF é exigido pelo Asaas para gerar a cobrança (apenas CPF, sem CNPJ).
    const cpfDigitos = String(cpf || "").replace(/\D/g, "");
    if (cpfDigitos.length !== 11) {
      return NextResponse.json({ error: "Informe um CPF válido." }, { status: 400 });
    }

    const emailNorm = String(email).trim().toLowerCase();

    // 2. Cria o usuário na plataforma (Better Auth).
    // Se o e-mail já existe (ex.: retomando um pagamento que falhou antes),
    // validamos a senha e reaproveitamos a conta em vez de dar erro.
    let userId: string;
    try {
      const signUp = await auth.api.signUpEmail({
        body: { email: emailNorm, password, name: String(name).trim() },
      });
      userId = signUp.user.id;
    } catch (e: any) {
      const msg = e?.message || "";
      const jaExiste = /exist|já.*cadastr|already/i.test(msg);
      if (!jaExiste) {
        return NextResponse.json({ error: msg || "Não foi possível criar a conta." }, { status: 400 });
      }
      // E-mail já cadastrado: confere a senha antes de reaproveitar a conta.
      try {
        await auth.api.signInEmail({ body: { email: emailNorm, password } });
      } catch {
        return NextResponse.json(
          { error: "Este e-mail já está cadastrado. Verifique a senha e tente novamente." },
          { status: 400 },
        );
      }
      const existente = await prisma.usuario.findUnique({
        where: { email: emailNorm },
        select: { id: true },
      });
      if (!existente) {
        return NextResponse.json({ error: "Conta não encontrada." }, { status: 400 });
      }
      userId = existente.id;
    }

    // Salva o telefone e o CPF no cadastro. O CPF é guardado MASCARADO por
    // privacidade — apenas os 3 primeiros dígitos (ex.: 139.***.***-**).
    // O CPF completo é usado só na chamada ao Asaas, não é persistido.
    const cpfMascarado = `${cpfDigitos.slice(0, 3)}.***.***-**`;
    try {
      await prisma.usuario.update({
        where: { id: userId },
        data: {
          telefone: phone ? String(phone).trim() : undefined,
          cpf: cpfMascarado,
        },
      });
    } catch {
      /* não-fatal: não impede o pagamento */
    }

    // 3. Cria o cliente no Asaas e guarda o id
    const asaasCustomerId = await createCustomer({
      name: String(name).trim(),
      email: emailNorm,
      cpfCnpj: cpfDigitos,
      mobilePhone: phone ? String(phone).replace(/\D/g, "") : undefined,
    });
    await prisma.usuario.update({
      where: { id: userId },
      data: { asaasCustomerId },
    });

    // 4. Cria a assinatura recorrente mensal (primeira cobrança vence hoje)
    const hoje = new Date().toISOString().split("T")[0];
    const subscription = await createSubscription({
      customerId: asaasCustomerId,
      billingType,
      value: VALOR_MENSAL,
      nextDueDate: hoje,
      description: "Assinatura Plataforma Sustainable Finance",
    });

    // 5. Recupera a primeira cobrança da assinatura
    const payment = await getFirstSubscriptionPayment(subscription.id);

    // 6. Registra a assinatura no banco
    await prisma.assinaturaPlataforma.create({
      data: {
        usuarioId: userId,
        asaasSubscriptionId: subscription.id,
        asaasPaymentId: payment.id,
        billingType,
        internacional: Boolean(internacional),
        valor: VALOR_MENSAL,
        status: "pendente",
      },
    });

    // 7. Monta a resposta conforme o método
    const base = { paymentId: payment.id, subscriptionId: subscription.id, billingType };

    if (billingType === "PIX") {
      const pix = await getPixQrCode(payment.id);
      return NextResponse.json({ ...base, pix });
    }

    if (billingType === "BOLETO") {
      const boleto = await getBoletoInfo(payment.id);
      return NextResponse.json({ ...base, boleto });
    }

    // CREDIT_CARD: o front coleta os dados do cartão na próxima etapa.
    return NextResponse.json(base);
  } catch (error: any) {
    console.error("[assinatura/iniciar]", error);
    return NextResponse.json({ error: error?.message || "Erro ao iniciar assinatura." }, { status: 500 });
  }
}
