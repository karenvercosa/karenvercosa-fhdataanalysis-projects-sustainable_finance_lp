import { PrismaClient } from "@prisma/client";
import { SEED_DATA_PT, SEED_DATA_EN } from "@/data/seedContent";

const prisma = new PrismaClient();

export async function getContentFromDb(lang: string) {
  const language = lang.toUpperCase() === "EN" ? "EN" : "PT";
  
  let contentRecord = await prisma.landingPageContent.findUnique({
    where: { lang: language },
  });

  if (!contentRecord) {
    // Caso o banco esteja vazio, faremos o seed do conteúdo para a linguagem requisitada
    const dataToSeed = language === "EN" ? SEED_DATA_EN : SEED_DATA_PT;
    
    contentRecord = await prisma.landingPageContent.create({
      data: {
        lang: language,
        data: dataToSeed as any,
      },
    });
    console.log(`[DB] Seed criado para a linguagem ${language}`);
  }

  return contentRecord.data;
}
