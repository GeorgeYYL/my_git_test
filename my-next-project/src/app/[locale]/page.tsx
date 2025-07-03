import {getTranslations} from 'next-intl/server';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import PDFViewerClient from '@/components/PDFViewerClient';

export default async function HomePage() {
  const t = await getTranslations('HomePage');
  return (
  <div>
    <h1>{t('title')}</h1>
    <LanguageSwitcher />
    <PDFViewerClient />
  </div>
  );
}