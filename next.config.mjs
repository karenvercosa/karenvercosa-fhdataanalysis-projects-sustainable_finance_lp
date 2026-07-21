import createNextIntlPlugin from 'next-intl/plugin';
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // Evita que o Next infira a raiz errada (há outros lockfiles no caminho)
  outputFileTracingRoot: __dirname,
};

export default withNextIntl(nextConfig);
