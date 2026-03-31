import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Globe, Users, Home, ArrowRight } from 'lucide-react';

const segments = [
  { icon: Globe, titleKey: 'forExpats' as const, descKey: 'forExpatsDesc' as const, color: 'text-terracotta', bg: 'bg-terracotta-pale' },
  { icon: Users, titleKey: 'forLocals' as const, descKey: 'forLocalsDesc' as const, color: 'text-sage-dark', bg: 'bg-sage-light' },
  { icon: Home, titleKey: 'forSubletters' as const, descKey: 'forSubletttersDesc' as const, color: 'text-charcoal-soft', bg: 'bg-cream-warm' },
];

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        <div className="max-w-2xl">
          <p className="section-label mb-4">About Nidō</p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-charcoal mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
          >
            {t('title')}
          </h1>
          <p className="text-xl text-charcoal-muted leading-relaxed">{t('subtitle')}</p>
        </div>
      </div>

      {/* Story */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-lg text-charcoal leading-relaxed">{t('story')}</p>
          </div>
        </div>
      </div>

      {/* Who it's for */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2
          className="text-3xl font-bold text-charcoal mb-12 text-center"
          style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
        >
          Who Nidō is for
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {segments.map((seg) => {
            const Icon = seg.icon;
            return (
              <div key={seg.titleKey} className="card p-8">
                <div className={`w-12 h-12 ${seg.bg} rounded-xl flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${seg.color}`} />
                </div>
                <h3
                  className="text-xl font-bold text-charcoal mb-3"
                  style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
                >
                  {t(seg.titleKey)}
                </h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">{t(seg.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission */}
      <div className="bg-charcoal py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-label text-terracotta mb-4">{t('missionLabel')}</p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-cream leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
          >
            &ldquo;{t('mission')}&rdquo;
          </h2>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h3
          className="text-2xl font-bold text-charcoal mb-4"
          style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
        >
          Ready to find your CDMX home?
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/search`} className="btn-primary gap-2 text-base px-8 py-4 rounded-2xl">
            Start Your Search
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href={`/${locale}/sublets`} className="btn-secondary gap-2 text-base px-8 py-4 rounded-2xl">
            Browse Sublets
          </Link>
        </div>
      </div>
    </div>
  );
}
