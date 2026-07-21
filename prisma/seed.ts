import { PrismaClient } from '@prisma/client'
import { SEED_DATA_PT, SEED_DATA_EN } from '../src/data/seedContent'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Semeando conteúdos da Landing Page (PT/EN)...')
  
  await prisma.landingPageContent.deleteMany()
  
  await prisma.landingPageContent.createMany({
    data: [
      { lang: 'PT', data: SEED_DATA_PT as any },
      { lang: 'EN', data: SEED_DATA_EN as any },
    ],
  })

  console.log('✅ Seed concluído.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
