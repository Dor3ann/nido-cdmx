import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { MapPin, Clock, ExternalLink, PlusCircle } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import FadeImage from '@/components/ui/FadeImage';
import type { SubletListing } from '@/lib/types';

// Apartment interior photo for card images
const APT_PHOTO = 'https://picsum.photos/seed/apartment/800/500';

// Placeholder sublet data — replace with Supabase query
const PLACEHOLDER_SUBLETS: SubletListing[] = [
  {
    id: '1',
    colonia: 'Roma Norte',
    price: 18500,
    currency: 'MXN',
    furnishedStatus: 'furnished',
    bedrooms: 1,
    moveInDate: '2026-04-15',
    leaseEndDate: '2026-09-30',
    description: 'Bright 1BR in a beautiful art-deco building on Álvaro Obregón. Full kitchen, AC, great natural light. Steps from top restaurants and cafés.',
    photos: [],
    contactMethod: 'whatsapp',
    contactValue: '+52 55 1234 5678',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    isBoosted: false,
  },
  {
    id: '2',
    colonia: 'Condesa',
    price: 1100,
    currency: 'USD',
    furnishedStatus: 'furnished',
    bedrooms: 2,
    moveInDate: '2026-04-01',
    leaseEndDate: '2026-12-31',
    description: 'Spacious 2BR with rooftop access and dedicated parking. Two full bathrooms. Ideal for remote workers or couples. Cat-friendly building.',
    photos: [],
    contactMethod: 'email',
    contactValue: 'tenant@example.com',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString(),
    isBoosted: true,
  },
  {
    id: '3',
    colonia: 'Juárez',
    price: 14000,
    currency: 'MXN',
    furnishedStatus: 'unfurnished',
    bedrooms: 0,
    moveInDate: '2026-05-01',
    leaseEndDate: '2026-10-31',
    description: 'Modern studio in a recently renovated building. 1 min from Insurgentes metro. Not furnished but has built-in closets and AC unit.',
    photos: [],
    contactMethod: 'whatsapp',
    contactValue: '+52 55 9876 5432',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    isBoosted: false,
  },
  {
    id: '4',
    colonia: 'Polanco',
    price: 25000,
    currency: 'MXN',
    furnishedStatus: 'part-furnished',
    bedrooms: 2,
    moveInDate: '2026-04-20',
    leaseEndDate: '2026-11-30',
    description: 'Elegant 2BR in the heart of Polanco. Master suite with walk-in closet. Gym and doorman included. Partially furnished — kitchen and master bedroom set up.',
    photos: [],
    contactMethod: 'email',
    contactValue: 'polanco@example.com',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000).toISOString(),
    isBoosted: true,
  },
];

function furnishedLabel(status: string, t: ReturnType<typeof useTranslations<'sublets'>>) {
  if (status === 'furnished') return t('furnished');
  if (status === 'unfurnished') return t('unfurnished');
  return t('partFurnished');
}

function daysAgo(isoDate: string) {
  const diff = Math.floor((Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  return `${diff} days ago`;
}

export default function SubletsPage() {
  const t = useTranslations('sublets');
  const locale = useLocale();

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="section-label mb-2">Exclusive to Nidō</p>
            <h1
              className="text-4xl font-bold text-charcoal"
              style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
            >
              {t('title')}
            </h1>
            <p className="text-charcoal-muted mt-2 text-sm max-w-md">{t('subtitle')}</p>
          </div>
          <Link href={`/${locale}/sublets/post`} className="btn-primary gap-2 self-start">
            <PlusCircle className="w-4 h-4" />
            {t('postCta')}
          </Link>
        </div>

        {/* Pricing notice */}
        <div className="flex items-center gap-3 bg-terracotta-pale border border-terracotta/20 rounded-2xl px-5 py-3.5 mb-8 text-sm">
          <span className="text-xl">🎉</span>
          <p className="text-terracotta font-medium">{t('freeTag')} — Post your sublet for free and reach thousands of active searchers.</p>
        </div>

        {/* Listings grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PLACEHOLDER_SUBLETS.map((sublet) => (
            <div key={sublet.id} className={`card overflow-hidden hover:shadow-md transition-shadow group ${sublet.isBoosted ? 'ring-1 ring-terracotta/30' : ''}`}>
              {/* Apartment interior photo — 200px tall, rounded top corners */}
              <div className="relative h-[200px] w-full overflow-hidden rounded-t-2xl bg-cream-warm">
                <FadeImage
                  src={APT_PHOTO}
                  alt={`${sublet.bedrooms === 0 ? 'Studio' : `${sublet.bedrooms} bed`} apartment in ${sublet.colonia}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges overlaid on photo */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {sublet.isBoosted && <Badge variant="terracotta">Featured</Badge>}
                  {daysAgo(sublet.createdAt) === 'Today' && <Badge variant="sage">New</Badge>}
                </div>

                {/* Furnished badge */}
                <div className="absolute bottom-3 right-3">
                  <Badge variant="cream">{furnishedLabel(sublet.furnishedStatus, t)}</Badge>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {/* Price + location */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-charcoal-muted">
                    <MapPin className="w-3.5 h-3.5 text-terracotta" />
                    <span className="font-medium text-charcoal">{sublet.colonia}</span>
                    <span>·</span>
                    <span>{sublet.bedrooms === 0 ? 'Studio' : `${sublet.bedrooms} bed`}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-charcoal">
                      {sublet.currency === 'MXN' ? '$' : 'US$'}
                      {sublet.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-charcoal-muted">/mo</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-charcoal-muted line-clamp-2 leading-relaxed">{sublet.description}</p>

                {/* Dates */}
                <div className="flex items-center gap-4 text-xs text-charcoal-muted pt-1 border-t border-cream-deep">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-terracotta" />
                    {t('available')} {sublet.moveInDate}
                  </span>
                  <span>
                    {t('leaseEnds')} {sublet.leaseEndDate}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-charcoal-muted">{daysAgo(sublet.createdAt)}</span>
                  <a
                    href={sublet.contactMethod === 'whatsapp'
                      ? `https://wa.me/${sublet.contactValue.replace(/\D/g, '')}`
                      : `mailto:${sublet.contactValue}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('contact')}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state (shown when no listings) */}
        {PLACEHOLDER_SUBLETS.length === 0 && (
          <div className="text-center py-24">
            <span className="text-6xl block mb-4">🏠</span>
            <h3 className="text-xl font-bold text-charcoal mb-2">{t('noSublets')}</h3>
            <p className="text-charcoal-muted text-sm mb-6">{t('noSubletsDesc')}</p>
            <Link href={`/${locale}/sublets/post`} className="btn-primary">
              {t('postCta')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
