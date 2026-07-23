import { NextResponse } from "next/server";
import { sendSponsorLeadEmail } from "@/services/email.service";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { nome, email, empresa, cargo, telefone } = await req.json();

    if (!nome?.trim() || !EMAIL_REGEX.test(email || "") || !empresa?.trim()) {
      return NextResponse.json({ error: "Preencha nome, e-mail e empresa." }, { status: 400 });
    }

    const resultado = await sendSponsorLeadEmail({
      nome: String(nome).trim(),
      email: String(email).trim(),
      empresa: String(empresa).trim(),
      cargo: cargo ? String(cargo).trim() : undefined,
      telefone: telefone ? String(telefone).trim() : undefined,
    });

    if (!resultado.success) {
      return NextResponse.json({ error: resultado.error }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[api/patrocinador]", error);
    return NextResponse.json({ error: error?.message || "Erro ao enviar." }, { status: 500 });
  }
}
