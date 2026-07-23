import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Tailwind,
} from "@react-email/components";

export interface SponsorLeadEmailProps {
  nome: string;
  email: string;
  empresa: string;
  cargo?: string;
  telefone?: string;
}

/**
 * E-mail enviado ao time comercial quando alguém preenche o formulário
 * "Quero ser Curador / Patrocinador" (na landing page ou no cadastro).
 */
export function SponsorLeadEmail({ nome, email, empresa, cargo, telefone }: SponsorLeadEmailProps) {
  const linhas: Array<{ rotulo: string; valor?: string }> = [
    { rotulo: "Nome", valor: nome },
    { rotulo: "E-mail", valor: email },
    { rotulo: "Empresa", valor: empresa },
    { rotulo: "Cargo", valor: cargo },
    { rotulo: "Telefone", valor: telefone },
  ];

  return (
    <Tailwind>
      <Html lang="pt-BR">
        <Head />
        <Preview>Novo interesse em Patrocínio/Curadoria — {empresa || nome}</Preview>
        <Body className="bg-[#f4f6f5] font-sans">
          <Container className="mx-auto my-[40px] max-w-[600px] rounded-[8px] border border-solid border-[#e3e8e6] bg-white p-[32px]">
            <Text className="m-0 text-[12px] font-semibold uppercase tracking-wide text-[#02976E]">
              Sustainable Finance 2026
            </Text>
            <Heading className="mx-0 mb-[8px] mt-[12px] p-0 text-[22px] font-bold text-[#102823]">
              Novo lead de Patrocínio / Curadoria
            </Heading>
            <Text className="mt-0 text-[14px] leading-[22px] text-[#4b5651]">
              Um novo interessado preencheu o formulário no site. Seguem os dados para contato:
            </Text>

            <Hr className="my-[24px] border-[#e3e8e6]" />

            <Section>
              {linhas.map((l) => (
                <Section key={l.rotulo} className="mb-[12px]">
                  <Text className="m-0 text-[12px] font-semibold uppercase tracking-wide text-[#8a938f]">
                    {l.rotulo}
                  </Text>
                  <Text className="m-0 text-[15px] leading-[22px] text-[#102823]">
                    {l.valor?.trim() ? l.valor : "—"}
                  </Text>
                </Section>
              ))}
            </Section>

            <Hr className="my-[24px] border-[#e3e8e6]" />

            <Text className="m-0 text-[13px] leading-[20px] text-[#4b5651]">
              Recomendamos entrar em contato o quanto antes para dar sequência à conversa.
            </Text>
            <Text className="mt-[16px] text-[11px] leading-[18px] text-[#9aa39f]">
              E-mail gerado automaticamente pelo site do Sustainable Finance 2026.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

export default SponsorLeadEmail;
