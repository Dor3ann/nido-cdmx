import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Headphones } from 'lucide-react';

export default function ConciergeUpsellBanner() {
  const t = useTranslations('results');
  const locale = useLocale();

  return (
    <div className="bg-charcoal rounded-2xl p-8 text-cream flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-terracotta/20 flex items-center justify-center flex-shrink-0">
          <Headphones className="w-6 h-6 text-terracotta" />
        </div>
        <div>
          <h3 className="font-bold text-cream text-lg mb-1">{t('conciergeUpsell')}</h3>
          <p className="text-cream/60 text-sm">{t('conciergeUpsellDesc')}</p>
        </div>
      </div>
      <Link
        href={`/${locale}/concierge`}
        className="btn-primary shrink-0 gap-2"
      >
        {t('conciergeCtaLabel')}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
