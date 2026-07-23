import RegisterPage from "@/components/RegisterPage";
import { InterestsProvider } from "@/components/context/InterestsContext";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Cadastro() {
  return (
    <main>
      <InterestsProvider>
        <RegisterPage />
      </InterestsProvider>
    </main>
  );
}
