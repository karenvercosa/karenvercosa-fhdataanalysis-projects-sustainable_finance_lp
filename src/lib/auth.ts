import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

/**
 * Configuração do Better Auth integrada à tabela existente `Usuario`.
 *
 * A tabela usa campos em português (`nomeCompleto`, `criadoEm`, ...), então
 * mapeamos os campos padrão do Better Auth (`name`, `image`, `createdAt`, ...)
 * para os nomes reais das colunas. A senha criptografada é gravada na tabela
 * `account`, não em `Usuario`.
 */
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // Mapeamento da tabela existente `Usuario` (campos em português) para os
  // nomes padrão que o Better Auth espera. A senha criptografada vai para
  // a tabela `account`, não para `Usuario`.
  user: {
    modelName: "Usuario",
    fields: {
      name: "nomeCompleto",
      email: "email",
      image: "avatarUrl",
      emailVerified: "emailVerified",
      createdAt: "criadoEm",
      updatedAt: "atualizadoEm",
    },
  },
  emailAndPassword: {
    enabled: true,
    // Reforço no servidor da regra do formulário (mínimo de 8 caracteres).
    minPasswordLength: 8,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  advanced: {
    database: {
      // As colunas `id` são `@db.Uuid` com default `gen_random_uuid()` no banco.
      // Desativamos a geração de ID do Better Auth para o Postgres preencher o UUID.
      generateId: false,
    },
  },
});
