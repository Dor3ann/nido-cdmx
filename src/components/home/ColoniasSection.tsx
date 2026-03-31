import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import FadeImage from '@/components/ui/FadeImage';

// Seven featured colonias with their Unsplash photo URLs
const colonias = [
  {
    titleKey: 'polancoTitle',
    descKey:  'polancoDesc',
    area:     'Polanco',
    photo:    'https://source.unsplash.com/600x400/?polanco-mexico-city',
  },
  {
    titleKey: 'condensaTitle',
    descKey:  'condensaDesc',
    area:     'Condesa',
    photo:    'https://source.unsplash.com/600x400/?condesa-mexico-city',
  },
  {
    titleKey: 'romaTitle',
    descKey:  'romaDesc',
    area:     'Roma Norte',
    photo:    'https://source.unsplash.com/600x400/?roma-norte-mexico-city',
  },
  {
    titleKey: 'juarezTitle',
    descKey:  'juarezDesc',
    area:     'Juárez',
    photo:    'https://source.unsplash.com/600x400/?colonia-juarez-mexico-city',
  },
  {
    titleKey: 'delValleTitle',
    descKey:  'delValleDesc',
    area:     'Del Valle',
    photo:    'https://source.unsplash.com/600x400/?del-valle-mexico-city',
  },
  {
    titleKey: 'escandonTitle',
    descKey:  'escandonDesc',
    area:     'Escandón',
    photo:    'https://source.unsplash.com/600x400/?escandon-mexico-city',
  },
  {
    titleKey: 'napolesTitle',
    descKey:  'napolesDesc',
    area:     'Nápoles',
    photo:    'https://source.unsplash.com/600x400/?napoles-mexico-city',
  },
] as const;

export default function ColoniasSection() {
  const t = useTranslations('colonias');
  const locale = useLocale();

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="section-label mb-3">{t('label')}</p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-charcoal"
              style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
            >
              {t('title')}
            </h2>
            <p className="text-charcoal-muted mt-3 text-sm max-w-sm">{t('subtitle')}</p>
          </div>
          <Link
            href={`/${locale}/search`}
            className="flex items-center gap-2 text-sm font-medium text-terracotta hover:underline shrink-0"
          >
            <MapPin className="w-4 h-4" />
            Search all areas
          </Link>
        </div>

        {/* Colonia grid — 3 columns on desktop, first card spans 2 on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colonias.map((colonia) => (
            <Link
              key={colonia.titleKey}
              href={`/${locale}/search?area=${encodeURIComponent(colonia.area)}`}
              className="card overflow-hidden group hover:shadow-lg hover:border-terracotta/30 transition-all duration-200"
            >
              {/* Photo — 180px tall, fills card width, rounded top corners */}
              <div className="relative h-[180px] w-full overflow-hidden bg-cream-warm rounded-t-2xl">
                <FadeImage
                  src={colonia.photo}
                  alt={`${colonia.area} neighborhood in Mexico City`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                {/* subtle dark-to-transparent gradient so text is readable on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Text */}
              <div className="p-5">
                <h3 className="font-bold text-charcoal group-hover:text-terracotta transition-colors mb-1">
                  {t(colonia.titleKey)}
                </h3>
                <p className="text-sm text-charcoal-muted leading-snug">{t(colonia.descKey)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
