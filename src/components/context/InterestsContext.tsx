"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface InterestsState {
  interests: string[];
  add: (name: string) => void;
  remove: (name: string) => void;
}

// Catálogo inicial de interesses (gerido pelo admin, exibido na nuvem do onboarding).
const SEED = [
  "ESG", "Crédito de carbono", "Green bonds", "Fintech", "Investimento de impacto",
  "Energia renovável", "Agronegócio sustentável", "Governança", "Regulação",
  "Net zero", "Biodiversidade", "Economia circular"
];

const InterestsContext = createContext<InterestsState | null>(null);

export function InterestsProvider({ children }: { children: ReactNode }) {
  const [interests, setInterests] = useState<string[]>(SEED);

  const value = useMemo<InterestsState>(
    () => ({
      interests,
      add: (name) => {
        const v = name.trim();
        if (!v) return;
        setInterests((prev: string[]) =>
          prev.some((i: string) => i.toLowerCase() === v.toLowerCase()) ? prev : [...prev, v]
        );
      },
      remove: (name) => setInterests((prev: string[]) => prev.filter((i: string) => i !== name))
    }),
    [interests, setInterests]
  );

  return <InterestsContext.Provider value={value}>{children}</InterestsContext.Provider>;
}

export function useInterests() {
  const ctx = useContext(InterestsContext);
  if (!ctx) throw new Error("useInterests deve ser usado dentro de <InterestsProvider>");
  return ctx;
}
