import type { Config } from "tailwindcss";

/**
 * DESIGN TOKENS — Design System "Sustainable Finance" (Figma)
 * Grade de 8pt mantida via utilitários pares (p-2=8, p-4=16, p-6=24, p-8=32...).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Verde institucional — cor de AÇÃO / primária do produto
        brand: {
          subtle: "#8DD596", // primary/400 · subtle — preenchimento de CTA
          500: "#02976E", // bordas / realces
          600: "#0E7C4A", // hover
          700: "#19302B", // fundo de cards escuros
          800: "#142420",
          900: "#102823", // texto sobre verde claro / fundo profundo
          1000: "#111820",
        },
        // Âmbar — cor de ACENTO / urgência (uso pontual)
        accent: { 400: "#FCBD52", 500: "#FBAB38", 600: "#DF9123" },
        // Neutros
        ink: {
          0: "#FFFFFF",
          50: "#F5F7F8",
          100: "#EDF0F2",
          200: "#E1E5E8",
          400: "#9AA5B1",
          600: "#616E7C",
          900: "#1F2933",
          1000: "#111820",
        },
        feedback: { success: "#2E8B57", error: "#D93838", warning: "#E6A100", info: "#2F80ED" },
      },
      fontFamily: {
        heading: ['"Miriam Libre"', "system-ui", "sans-serif"],
        body: ['"Lexend"', "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2rem, 5vw + 1rem, 3.25rem)", { lineHeight: "1.08", fontWeight: "700" }],
      },
      borderRadius: { sm: "4px", md: "8px", lg: "16px" },
      boxShadow: {
        sm: "0 2px 4px 0 rgba(30,30,30,0.12)",
        card: "0 8px 24px -8px rgba(16,40,35,0.18)",
        cta: "0 12px 32px -8px rgba(2,151,110,0.45)",
      },
      maxWidth: { content: "1216px" },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.4" } },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
