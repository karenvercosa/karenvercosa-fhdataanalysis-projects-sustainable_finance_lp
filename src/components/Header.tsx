"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#sobre-evento", label: "Sobre" },
  { href: "#programacao", label: "Conteúdo" },
  { href: "#palestrantes", label: "Palestrantes" },
  { href: "#conducao", label: "Condução" },
  { href: "#publico", label: "Para quem é" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="topo" className="fixed inset-x-0 top-0 z-40">
      <nav
        className={`border-b border-white/10 bg-[rgba(25,48,43,0.92)] backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Logo oficial */}
          <a href="#topo" aria-label="Sustainable Finance — início" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-sfs.svg" alt="Sustainable Finance 2026" width={160} height={57} className="h-10 w-auto lg:h-12" />
          </a>

          {/* Links desktop */}
          <div className="hidden items-center gap-8 text-sm font-medium text-white lg:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-brand-subtle">
                {l.label}
              </a>
            ))}
          </div>

          {/* Ações */}
          <div className="flex items-center gap-3">
            <a
              href="#patrocinio"
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-sm bg-brand-subtle px-3 py-2 text-sm font-semibold text-brand-900 shadow-sm transition-colors hover:bg-white sm:px-4"
            >
              <span className="sm:hidden">Patrocinar</span>
              <span className="hidden sm:inline">Quero ser patrocinador</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-md text-white hover:bg-white/10 lg:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {open && (
          <div className="border-t border-white/10 bg-[rgba(20,36,32,0.98)] lg:hidden">
            <div className="flex flex-col gap-1 px-4 py-4 text-white">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 hover:bg-white/10"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#patrocinio"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-sm border border-brand-subtle px-3 py-3 text-center font-medium text-brand-subtle"
              >
                Quero ser patrocinador
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
