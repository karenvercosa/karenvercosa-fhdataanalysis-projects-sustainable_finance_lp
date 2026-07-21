"use client";
import { EVENT as STATIC_EVENT } from "@/data/content";
import { useMessages, useTranslations } from 'next-intl';

export function Footer() {
  const messages = useMessages();
  const t = useTranslations('Footer');
  const EVENT = (messages?.EVENT || STATIC_EVENT) as typeof STATIC_EVENT;
  return (
    <footer className="bg-ink-1000 text-ink-200">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-sfs.svg" alt="Sustainable Finance 2026" width={150} height={53} className="h-10 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-ink-400">
              {t('descricao')}
            </p>
          </div>

          <nav className="text-sm">
            <h3 className="font-heading text-white">{t('colEvento')}</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#oportunidade" className="transition-colors hover:text-brand-subtle">Sobre</a></li>
              <li><a href="#programacao" className="transition-colors hover:text-brand-subtle">Programação</a></li>
              <li><a href="#caminhos" className="transition-colors hover:text-brand-subtle">Como participar</a></li>
              <li><a href="#publico" className="transition-colors hover:text-brand-subtle">Para quem é</a></li>
            </ul>
          </nav>

          <nav className="text-sm">
            <h3 className="font-heading text-white">{t('colInstitucional')}</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#caminhos" className="transition-colors hover:text-brand-subtle">Cadastre-se</a></li>
              <li><a href="#faq" className="transition-colors hover:text-brand-subtle">Perguntas frequentes</a></li>
              <li><a href="#" className="transition-colors hover:text-brand-subtle">{t('linkPolitica')}</a></li>
              <li><a href="#" className="transition-colors hover:text-brand-subtle">{t('linkLgpd')}</a></li>
            </ul>
          </nav>

          <div className="text-sm">
            <h3 className="font-heading text-white">{t('colContato')}</h3>
            <ul className="mt-4 space-y-3">
              <li><a href={`mailto:${EVENT.salesEmail}`} className="transition-colors hover:text-brand-subtle">{EVENT.salesEmail}</a></li>
              <li>{EVENT.venue}</li>
              <li>{EVENT.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-ink-400 sm:flex-row">
          <p>{t('direitos')}</p>
          <p>{t('lgpdTexto')}</p>
        </div>
      </div>
    </footer>
  );
}
