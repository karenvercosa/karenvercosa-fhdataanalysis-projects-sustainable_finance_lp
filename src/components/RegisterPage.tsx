"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { ShieldCheck, ArrowRight, Sparkles, Building2 } from "lucide-react";
import { useInterests } from "@/components/context/InterestsContext";
import { Checkbox } from "@/components/ui/Checkbox";
import { LegalModal } from "@/components/legal/LegalModal";
import { SuccessCard } from "@/components/ui/SuccessCard";
import { CONSENTIMENTO_KEY, type LegalDocId } from "@/data/legal";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useSponsorModal } from "@/components/SponsorContact";
import { useTranslations } from "next-intl";

type Phase1Data = { firstName: string; lastName: string; email: string; phone: string; password: string; };

// E-mail precisa obrigatoriamente ter "@" e um domínio válido.
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// Senha: mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial.
const SENHA_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

/**
 * Onboarding FASE 1 (frictionless): dados essenciais + nuvem de interesses.
 * Empresa, cargo e ingresso ficam para a Fase 2 (no checkout).
 */
export default function RegisterPage() {
  const t = useTranslations("RegisterPage");
  const isAuthenticated = false;
  const { interests } = useInterests();
  const [form, setForm] = useState<Phase1Data>({ firstName: "", lastName: "", email: "", phone: "", password: "" });
  const [chosen, setChosen] = useState<string[]>([]);
  // Consentimentos LGPD, ambos desmarcados por padrão.
  const [aceiteTermos, setAceiteTermos] = useState(false);
  const [aceiteMarketing, setAceiteMarketing] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDocId | null>(null);

  // Fluxo de cadastro real (Better Auth).
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // O login com Google usa redirecionamento OAuth (recarrega a página). Ao
  // voltar do Google com o marcador `?cadastro=sucesso`, mostramos o card de
  // sucesso — o mesmo do fluxo por e-mail/senha.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("cadastro") === "sucesso") setSuccess(true);
  }, []);

  // Controle de abas
  const [activeTab, setActiveTab] = useState<"participante" | "patrocinador">("participante");
  // Abre o modal de patrocínio/curadoria (envio por e-mail).
  const { open: openSponsor } = useSponsorModal();

  // Sem redirecionamento automático por enquanto.
  if (isAuthenticated) {
    console.log("Usuário já autenticado. Redirecionamento desativado temporariamente.");
  }

  const set = (k: keyof Phase1Data) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleInterest = (tag: string) =>
    setChosen((c) => (c.includes(tag) ? c.filter((t) => t !== tag) : [...c, tag]));

  const emailValido = EMAIL_REGEX.test(form.email);
  const senhaValida = SENHA_REGEX.test(form.password);

  // Sem o aceite dos Termos não há cadastro — o de marketing é facultativo.
  const valid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    emailValido &&
    senhaValida &&
    form.phone.trim().length >= 8 &&
    aceiteTermos;

  const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valid || submitting) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const { error } = await authClient.signUp.email({
        email: form.email.trim().toLowerCase(),
        password: form.password,
        name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
      });

      if (error) {
        setErrorMsg(error.message || t("erroCadastro"));
        setSubmitting(false);
        return;
      }

      // Interesses e prova de consentimento (o que foi aceito, por quem e quando).
      try {
        localStorage.setItem("sf_profile", JSON.stringify({ headline: "", company: "", bio: "", interests: chosen }));
        localStorage.setItem(
          CONSENTIMENTO_KEY,
          JSON.stringify({
            email: form.email.trim().toLowerCase(),
            termos: true,
            marketing: aceiteMarketing,
            aceitoEm: new Date().toISOString()
          })
        );
      } catch {
        /* storage indisponível */
      }

      setSuccess(true);
    } catch {
      setErrorMsg(t("erroCadastro"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Volta para a MESMA rota atual (preserva o locale) com o marcador de sucesso.
      const callbackURL = `${window.location.pathname}?cadastro=sucesso`;
      await authClient.signIn.social({ provider: "google", callbackURL });
    } catch {
      setErrorMsg(t("erroCadastro"));
    }
  };

  const field =
    "h-10 w-full rounded-md border border-neutral-200 bg-neutral-100 px-4 text-body text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100";

  // Tela de confirmação após o cadastro — mesmo padrão de card da página.
  if (success) {
    return (
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <img src="/img/login-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative z-10 w-full max-w-md space-y-6 rounded-md bg-[rgba(25,48,43,0.92)] p-6 backdrop-blur-sm shadow-xl">
          <SuccessCard title={t("sucessoTitulo")} desc={t("sucessoDesc")} btnText={t("btnVoltarInicio")} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <img src="/img/login-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-md space-y-6 rounded-md bg-[rgba(25,48,43,0.92)] p-6 backdrop-blur-sm shadow-xl"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <img src="/img/logo-sfs.svg" alt="Sustainable Finance" width={160} height={57} className="h-12 w-auto" />
          <h1 className="text-h2 text-white font-heading">{t('titulo')}</h1>
          <p className="text-body text-white/80">{t('subtitulo')}</p>
        </div>

        {/* Abas */}
        <div className="flex w-full overflow-hidden rounded-md border border-white/20 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("participante")}
            className={cn(
              "flex-1 rounded-sm py-2 text-center text-body-sm font-medium transition-all duration-300",
              activeTab === "participante" 
                ? "bg-[#8DD596] text-[#102823] shadow-sm" 
                : "text-white hover:bg-white/10"
            )}
          >
            {t('abaParticipante')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("patrocinador")}
            className={cn(
              "flex-1 rounded-sm py-2 text-center text-body-sm font-medium transition-all duration-300",
              activeTab === "patrocinador" 
                ? "bg-[#8DD596] text-[#102823] shadow-sm" 
                : "text-white hover:bg-white/10"
            )}
          >
            {t('abaPatrocinador')}
          </button>
        </div>

        {activeTab === "patrocinador" ? (
          <div className="flex animate-in fade-in zoom-in-95 flex-col items-center gap-4 py-6 text-center duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-[#8DD596]">
              <Building2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-h3 font-heading text-white">{t('patrocinadorTitulo')}</h2>
              <p className="text-body-sm text-white/80">
                {t('patrocinadorDesc')}
              </p>
            </div>
            <button
              type="button"
              onClick={openSponsor}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm bg-[#8DD596] px-6 py-3 font-semibold text-[#102823] shadow-card transition-all hover:brightness-110 active:brightness-95"
            >
              {t('btnQueroPatrocinar')} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-h5 text-white">{t('labelNome')}</label>
                <input value={form.firstName} onChange={set("firstName")} placeholder={t('placeholderNome')} className={field} />
              </div>
              <div className="space-y-1.5">
                <label className="block text-h5 text-white">{t('labelSobrenome')}</label>
                <input value={form.lastName} onChange={set("lastName")} placeholder={t('placeholderSobrenome')} className={field} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-h5 text-white">{t('labelEmail')}</label>
              <input type="email" value={form.email} onChange={set("email")} placeholder={t('placeholderEmail')} className={field} />
              {form.email.length > 0 && !emailValido && (
                <p className="text-body-sm text-red-300">{t('erroEmail')}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-h5 text-white">{t('labelSenha')}</label>
              <input
                type="password"
                value={form.password}
                onChange={set("password")}
                placeholder={t('placeholderSenha')}
                className={field}
                autoComplete="new-password"
              />
              <p className={cn(
                "text-body-sm",
                form.password.length > 0 && !senhaValida ? "text-red-300" : "text-white/70"
              )}>
                {t('senhaRequisitos')}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-h5 text-white">{t('labelCelular')}</label>
              <input value={form.phone} onChange={set("phone")} placeholder={t('placeholderCelular')} className={field} />
              <p className="flex items-center gap-1.5 text-body-sm text-white/70">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                {t('segurancaCelular')}
              </p>
            </div>

            {/* Nuvem de interesses (definida no cadastro) */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-h5 text-white">
                <Sparkles className="h-4 w-4" /> {t('interessesTitulo')}
              </label>
              <p className="text-body-sm text-white/70">
                {t('interessesDesc')}
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((tag) => {
                  const active = chosen.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleInterest(tag)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-body-sm transition-colors",
                        active
                          ? "border-[#8DD596] bg-[#8DD596] text-[#102823]"
                          : "border-white/30 text-white/90 hover:border-white/60"
                      )}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Consentimentos LGPD — o de marketing é opcional e independente */}
            <div className="space-y-3">
              <Checkbox
                checked={aceiteTermos}
                onChange={setAceiteTermos}
                labelClassName="text-white/85"
                label={
                  <>
                    {t('termos1')}{" "}
                    <button type="button" onClick={() => setLegalDoc("termos")} className="font-medium underline hover:text-white">
                      {t('termosLink')}
                    </button>{" "}
                    {t('termos2')}{" "}
                    <button type="button" onClick={() => setLegalDoc("privacidade")} className="font-medium underline hover:text-white">
                      {t('privacidadeLink')}
                    </button>.
                  </>
                }
              />

              <Checkbox
                checked={aceiteMarketing}
                onChange={setAceiteMarketing}
                labelClassName="text-white/70"
                label={
                  <>
                    {t('marketing')} <em>{t('opcional')}</em>
                  </>
                }
              />
            </div>

            <button
              type="submit"
              disabled={!valid || submitting}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#8DD596] px-6 py-3 font-semibold text-[#102823] transition-all hover:brightness-110 active:brightness-95 disabled:opacity-50 disabled:hover:brightness-100"
            >
              {submitting ? t('btnEnviando') : t('btnCriarConta')} <ArrowRight className="h-4 w-4" />
            </button>
            {errorMsg && (
              <p className="text-center text-body-sm text-red-300">{errorMsg}</p>
            )}
            {!aceiteTermos && (
              <p className="text-center text-body-sm text-white/70">
                {t('avisoTermos')}
              </p>
            )}

            {/* Divisor + cadastro social */}
            <div className="flex items-center gap-3 text-body-sm text-white/60">
              <span className="h-px flex-1 bg-white/20" /> {t('ou')} <span className="h-px flex-1 bg-white/20" />
            </div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden>
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8a12 12 0 1 1 0-24c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 1 0 24 44a20 20 0 0 0 19.6-23.5z" />
                <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.6 5.1A20 20 0 0 0 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C39.9 35.8 44 30.5 44 24c0-1.2-.1-2.4-.4-3.5z" />
              </svg>
              {t('btnGoogle')}
            </button>
          </div>
        )}

        <Link
          href="/"
          className="block w-full text-center text-body-sm font-medium text-white underline hover:text-[#8DD596] transition-colors"
        >
          {t('btnVoltar')}
        </Link>
      </form>

      <LegalModal open={!!legalDoc} onClose={() => setLegalDoc(null)} docInicial={legalDoc ?? "termos"} />
    </div>
  );
}
