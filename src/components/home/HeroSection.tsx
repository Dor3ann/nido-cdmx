import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, Search, Star } from 'lucide-react';

const HERO_IMAGE = 'https://source.unsplash.com/1600x900/?mexico-city-apartment-rooftop';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden min-h-[600px]">
      {/* Background photo */}
      <Image
        src={HERO_IMAGE}
        alt="Mexico City rooftop view"
        fill
        unoptimized
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Layered overlays: warm cream gradient keeps text legible and on-brand */}
      <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/80 to-cream/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-cream/20 via-transparent to-cream/60" />

      {/* Decorative colour blobs on top of photo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-terracotta/8 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-sage/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-28">
        <div className="max-w-3xl">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-terracotta/20 bg-terracotta-pale/90 text-terracotta text-xs font-medium mb-8">
            <Star className="w-3 h-3 fill-terracotta" />
            {t('trust')}
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-charcoal leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
          >
            {t('tagline')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-charcoal-muted leading-relaxed max-w-xl mb-10">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href={`/${locale}/search`}
              className="btn-primary gap-2 text-base px-8 py-4 rounded-2xl shadow-lg shadow-terracotta/20 hover:shadow-terracotta/30 transition-shadow"
            >
              <Search className="w-4 h-4" />
              {t('cta')}
            </Link>
            <Link
              href={`/${locale}/sublets`}
              className="btn-ghost gap-2 text-base text-charcoal-soft"
            >
              {t('secondaryCta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Platform logos strip */}
        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4">
          <span className="text-xs text-charcoal-muted font-medium tracking-wide uppercase">
            Searching across
          </span>
          {['Inmuebles24', 'Lamudi', 'Vivanuncios', 'Facebook Marketplace'].map((platform) => (
            <span key={platform} className="text-sm font-semibold text-charcoal/40">
              {platform}
            </span>
          ))}
          <span className="text-sm font-semibold text-terracotta/60">+ Nidō Sublets</span>
        </div>
      </div>
    </section>
  );
}
