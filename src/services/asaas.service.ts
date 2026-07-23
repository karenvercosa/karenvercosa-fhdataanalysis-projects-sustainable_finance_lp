// Serviço de integração com o gateway Asaas (sandbox ou produção).
// Centraliza as chamadas REST usando o fetch nativo. A API key e a URL base
// vêm das variáveis de ambiente (ASAAS_API_KEY / ASAAS_API_URL).

const API_KEY = process.env.ASAAS_API_KEY as string;
const BASE_URL = process.env.ASAAS_API_URL as string;

function asaasHeaders() {
  return {
    "Content-Type": "application/json",
    access_token: API_KEY,
  };
}

async function asaasFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: asaasHeaders(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.errors?.[0]?.description || `Erro Asaas (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export type BillingType = "PIX" | "CREDIT_CARD" | "BOLETO";

// 1. Cria (ou reutiliza) o cliente no Asaas.
export async function createCustomer(user: {
  name: string;
  email: string;
  cpfCnpj?: string;
  mobilePhone?: string;
}): Promise<string> {
  const data = await asaasFetch("/customers", {
    method: "POST",
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      cpfCnpj: user.cpfCnpj || undefined,
      mobilePhone: user.mobilePhone || undefined,
    }),
  });
  return data.id; // cus_...
}

// 2. Cria a assinatura recorrente mensal (R$ valor/mês).
export async function createSubscription(params: {
  customerId: string;
  billingType: BillingType;
  value: number;
  nextDueDate: string; // YYYY-MM-DD
  description?: string;
}) {
  return asaasFetch("/subscriptions", {
    method: "POST",
    body: JSON.stringify({
      customer: params.customerId,
      billingType: params.billingType,
      value: params.value,
      nextDueDate: params.nextDueDate,
      cycle: "MONTHLY",
      description: params.description,
    }),
  });
}

// 3. Recupera a primeira cobrança gerada pela assinatura.
export async function getFirstSubscriptionPayment(subscriptionId: string) {
  const data = await asaasFetch(`/subscriptions/${subscriptionId}/payments`);
  const payment = data?.data?.[0];
  if (!payment) throw new Error("Nenhuma cobrança gerada para a assinatura.");
  return payment;
}

// 4. QR Code + copia e cola do PIX de uma cobrança.
export async function getPixQrCode(paymentId: string) {
  const data = await asaasFetch(`/payments/${paymentId}/pixQrCode`);
  return {
    encodedImage: data.encodedImage as string, // PNG base64 (sem prefixo data:)
    payload: data.payload as string, // copia e cola
    expirationDate: data.expirationDate as string | undefined,
  };
}

// 5. Linha digitável / boleto de uma cobrança.
export async function getBoletoInfo(paymentId: string) {
  const [payment, idField] = await Promise.all([
    asaasFetch(`/payments/${paymentId}`),
    asaasFetch(`/payments/${paymentId}/identificationField`).catch(() => ({})),
  ]);
  return {
    bankSlipUrl: payment.bankSlipUrl as string | undefined,
    identificationField: (idField as any).identificationField as string | undefined,
    barCode: (idField as any).barCode as string | undefined,
  };
}

export type CartaoInput = {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
};

export type TitularInput = {
  name: string;
  email: string;
  cpfCnpj?: string;
  postalCode?: string;
  addressNumber?: string;
  phone?: string;
};

// 6. Paga uma cobrança com cartão de crédito (nacional ou internacional).
export async function payWithCreditCard(params: {
  paymentId: string;
  card: CartaoInput;
  titular: TitularInput;
  remoteIp?: string;
}) {
  return asaasFetch(`/payments/${params.paymentId}/payWithCreditCard`, {
    method: "POST",
    body: JSON.stringify({
      creditCard: {
        holderName: params.card.holderName,
        number: params.card.number.replace(/\s+/g, ""),
        expiryMonth: params.card.expiryMonth,
        expiryYear: params.card.expiryYear,
        ccv: params.card.ccv,
      },
      creditCardHolderInfo: {
        name: params.titular.name,
        email: params.titular.email,
        cpfCnpj: params.titular.cpfCnpj || undefined,
        postalCode: params.titular.postalCode || undefined,
        addressNumber: params.titular.addressNumber || undefined,
        phone: params.titular.phone || undefined,
      },
      remoteIp: params.remoteIp || undefined,
    }),
  });
}

// 7. Consulta o status atual de uma cobrança (para polling do PIX/boleto).
export async function getPaymentStatus(paymentId: string): Promise<string> {
  const data = await asaasFetch(`/payments/${paymentId}`);
  return data.status as string; // PENDING | RECEIVED | CONFIRMED | OVERDUE ...
}

// Status que indicam pagamento aprovado.
export function isPago(status: string) {
  return status === "RECEIVED" || status === "CONFIRMED" || status === "RECEIVED_IN_CASH";
}
