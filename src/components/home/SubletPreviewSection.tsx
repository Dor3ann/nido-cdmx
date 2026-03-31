import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import FadeImage from '@/components/ui/FadeImage';

// Apartment interior photo — used for all preview card images
const APT_PHOTO = 'https://source.unsplash.com/800x500/?mexico-city-apartment-interior';

// Placeholder sublet data — will be replaced with real Supabase data
const PLACEHOLDER_SUBLETS = [
  {
    id: '1',
    colonia: 'Roma Norte',
    price: 18500,
    currency: 'MXN',
    bedrooms: 1,
    furnished: true,
    moveIn: '2026-04-15',
    leaseEnd: '2026-09-30',
    desc: 'Bright 1BR in a beautiful art-deco building. Steps from Álvaro Obregón. All furniture included.',
    isNew: true,
  },
  {
    id: '2',
    colonia: 'Condesa',
    price: 1100,
    currency: 'USD',
    bedrooms: 2,
    furnished: true,
    moveIn: '2026-04-01',
    leaseEnd: '2026-12-31',
    desc: 'Spacious 2BR with rooftop access and parking. Ideal for remote workers. Close to Parque México.',
    isNew: false,
  },
  {
    id: '3',
    colonia: 'Juárez',
    price: 14000,
    currency: 'MXN',
    bedrooms: 0, // studio
    furnished: false,
    moveIn: '2026-05-01',
    leaseEnd: '2026-10-31',
    desc: 'Modern studio in a recently renovated building. Close to Insurgentes metro.',
    isNew: true,
  },
];

export default function SubletPreviewSection() {
  const t = useTranslations('sublets');
  const c = useTranslations('common');
  const locale = useLocale();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-3">Sublet Marketplace</p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-charcoal"
              style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
            >
              {t('title')}
            </h2>
            <p className="text-charcoal-muted mt-3 text-sm max-w-sm">{t('subtitle')}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link href={`/${locale}/sublets/post`} className="btn-secondary text-sm py-2.5">
              {t('postCta')}
            </Link>
            <Link href={`/${locale}/sublets`} className="btn-primary text-sm py-2.5">
              {t('browseAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Sublet cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLACEHOLDER_SUBLETS.map((sublet) => (
            <div key={sublet.id} className="card overflow-hidden hover:shadow-md transition-shadow group">

              {/* Apartment interior photo — 200px tall, rounded top */}
              <div className="relative h-[200px] w-full overflow-hidden rounded-t-2xl bg-cream-warm">
                <FadeImage
                  src={APT_PHOTO}
                  alt={`${sublet.bedrooms === 0 ? 'Studio' : `${sublet.bedrooms} bedroom`} apartment interior in ${sublet.colonia}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badges overlaid on photo */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {sublet.isNew && <Badge variant="terracotta">{c('new')}</Badge>}
                  {sublet.furnished && <Badge variant="sage">{t('furnished')}</Badge>}
                </div>
              </div>

              <div className="p-5 space-y-3">
                {/* Location & price */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-charcoal-muted">
                    <MapPin className="w-3.5 h-3.5 text-terracotta" />
                    {sublet.colonia}
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-charcoal">
                      {sublet.currency === 'MXN' ? '$' : 'US$'}
                      {sublet.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-charcoal-muted">{c('perMonth')}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-charcoal-muted line-clamp-2 leading-relaxed">{sublet.desc}</p>

                {/* Dates */}
                <div className="flex items-center gap-1.5 text-xs text-charcoal-muted pt-1 border-t border-cream-deep">
                  <Clock className="w-3 h-3" />
                  <span>
                    {t('available')} {sublet.moveIn} · {t('leaseEnds')} {sublet.leaseEnd}
                  </span>
                </div>

                <Link
                  href={`/${locale}/sublets`}
                  className="block w-full text-center text-sm font-medium text-terracotta py-2 rounded-xl border border-terracotta/20 hover:bg-terracotta-pale transition-colors"
                >
                  {t('contact')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
