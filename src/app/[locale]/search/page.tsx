import { useTranslations } from 'next-intl';
import IntakeForm from '@/components/search/IntakeForm';

export default function SearchPage() {
  const t = useTranslations('search');

  return (
    <div className="min-h-screen bg-hero-pattern">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-terracotta/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-sage/5 blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-4xl sm:text-5xl font-bold text-charcoal mb-4"
            style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
          >
            {t('title')}
          </h1>
          <p className="text-charcoal-muted text-lg">{t('subtitle')}</p>
        </div>

        {/* Intake form */}
        <IntakeForm />
      </div>
    </div>
  );
}
