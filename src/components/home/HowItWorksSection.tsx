import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ClipboardList, Zap, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    color: 'text-terracotta',
    bg: 'bg-terracotta-pale',
    titleKey: 'step1Title' as const,
    descKey: 'step1Desc' as const,
    number: '01',
  },
  {
    icon: Zap,
    color: 'text-sage-dark',
    bg: 'bg-sage-light',
    titleKey: 'step2Title' as const,
    descKey: 'step2Desc' as const,
    number: '02',
  },
  {
    icon: Sparkles,
    color: 'text-charcoal-soft',
    bg: 'bg-cream-warm',
    titleKey: 'step3Title' as const,
    descKey: 'step3Desc' as const,
    number: '03',
  },
];

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks');
  const locale = useLocale();

  return (
    <section className="py-24 bg-cream-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">{t('label')}</p>
          <h2
            className="text-4xl sm:text-5xl font-bold text-charcoal"
            style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
          >
            {t('title')}
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                {/* Connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(100%+1rem)] w-8 border-t-2 border-dashed border-cream-deep z-10" />
                )}

                <div className="card p-8 h-full hover:shadow-md transition-shadow">
                  {/* Number + icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <span className="text-4xl font-bold text-cream-deep tabular-nums">{step.number}</span>
                  </div>

                  <h3
                    className="text-xl font-bold text-charcoal mb-3"
                    style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
                  >
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-charcoal-muted leading-relaxed text-sm">{t(step.descKey)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link href={`/${locale}/search`} className="btn-primary text-base px-8 py-4 rounded-2xl">
            Start Your Search
          </Link>
        </div>
      </div>
    </section>
  );
}
