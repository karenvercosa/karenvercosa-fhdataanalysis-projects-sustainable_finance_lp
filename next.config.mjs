import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Evita que o Next infira a raiz errada (há outros lockfiles no caminho)
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
