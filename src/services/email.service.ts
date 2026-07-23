import { Resend } from "resend";
import { render } from "@react-email/render";
import { SponsorLeadEmail, type SponsorLeadEmailProps } from "@/emails/SponsorLeadEmail";
import { EVENT } from "@/data/content";

const resend = new Resend(process.env.RESEND_API_KEY);

// Remetente: em teste sem domínio verificado, use "onboarding@resend.dev".
const EMAIL_FROM = process.env.EMAIL_FROM || "onboarding@resend.dev";
// Destinatário do lead: o time comercial (configurável por env).
const EMAIL_TO = process.env.EMAIL_TO || EVENT.salesEmail;

/**
 * Renderiza o template React em HTML e envia o lead de patrocínio/curadoria
 * ao time comercial via Resend.
 */
export async function sendSponsorLeadEmail(dados: SponsorLeadEmailProps) {
  try {
    const html = await render(SponsorLeadEmail(dados));

    const { data, error } = await resend.emails.send({
      from: `Sustainable Finance <${EMAIL_FROM}>`,
      to: [EMAIL_TO],
      replyTo: dados.email,
      subject: `Novo interesse em Patrocínio/Curadoria — ${dados.empresa || dados.nome}`,
      html,
    });

    if (error) {
      console.error("[email.service] Erro Resend:", error);
      return { success: false, error: error.message || "Erro ao enviar e-mail." };
    }

    return { success: true, id: data?.id };
  } catch (error: any) {
    console.error("[email.service] Erro:", error);
    return { success: false, error: error?.message || "Erro ao enviar e-mail." };
  }
}
