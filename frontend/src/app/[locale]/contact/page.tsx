import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <h1 className="text-4xl font-bold text-white mb-8">{t('title')}</h1>
      <p className="text-slate-300">{t('comingSoon')}</p>
    </div>
  );
}
