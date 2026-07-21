import Redis from "ioredis";
import { getContentFromDb } from "./content.service";

// Inicia o client do Redis (usando a URL padrão local ou a definida nas variáveis de ambiente)
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export async function getContent(lang: string) {
  try {
    const key = `content:${lang.toUpperCase()}`;
    const cached = await redis.get(key);

    if (cached) {
      console.log(`[Redis] Cache HIT para ${key}`);
      return JSON.parse(cached);
    }

    // Se não estiver no Redis, busca no Banco de Dados
    console.log(`[Redis] Cache MISS para ${key}. Buscando no Banco...`);
    const dbData = await getContentFromDb(lang);

    // Salva no cache do Redis por 7 dias
    await redis.set(key, JSON.stringify(dbData), "EX", 604800);

    return dbData;
  } catch (error) {
    console.error("Redis Error:", error);
    // Fallback: se o redis cair, busca direto do banco
    return await getContentFromDb(lang);
  }
}
