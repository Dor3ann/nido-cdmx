import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Search, SlidersHorizontal } from 'lucide-react';
import ListingCard from '@/components/results/ListingCard';
import ConciergeUpsellBanner from '@/components/results/ConciergeUpsellBanner';
import type { Listing } from '@/lib/types';

// ─── Placeholder listings for MVP shell ──────────────────────────────────────

const PLACEHOLDER_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Charming 1BR with balcony in Roma Norte',
    colonia: 'Roma Norte',
    price: 16500,
    currency: 'MXN',
    bedrooms: 1,
    bathrooms: 1,
    sqMeters: 65,
    amenities: ['furnished', 'near-metro'],
    images: [],
    source: 'Inmuebles24',
    sourceUrl: '#',
    aiSummary: 'A well-lit apartment in a sought-after building on Álvaro Obregón. Walking distance to metro Insurgentes and the Roma Norte food scene. No parking included.',
    matchScore: 92,
    postedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Modern 2BR with rooftop terrace — Condesa',
    colonia: 'Condesa',
    price: 24000,
    currency: 'MXN',
    bedrooms: 2,
    bathrooms: 2,
    sqMeters: 95,
    amenities: ['furnished', 'rooftop', 'parking', 'gym'],
    images: [],
    source: 'Lamudi',
    sourceUrl: '#',
    aiSummary: 'Spacious 2BR in a boutique building with a stunning rooftop. Ideal for remote workers or couples. Slightly above your budget but offers excellent value for Condesa.',
    matchScore: 84,
    postedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Cozy studio — Juárez, steps from Insurgentes',
    colonia: 'Juárez',
    price: 12000,
    currency: 'MXN',
    bedrooms: 0,
    bathrooms: 1,
    sqMeters: 38,
    amenities: ['near-metro', 'bills-included'],
    images: [],
    source: 'Vivanuncios',
    sourceUrl: '#',
    aiSummary: 'Compact but efficient studio in the heart of Juárez. Bills included — great value. The building is secure with 24-hr concierge. No pets allowed.',
    matchScore: 78,
    postedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Bright 1BR loft — Polanco near Presidente Masaryk',
    colonia: 'Polanco',
    price: 21000,
    currency: 'MXN',
    bedrooms: 1,
    bathrooms: 1,
    sqMeters: 72,
    amenities: ['furnished', 'parking', 'gym'],
    images: [],
    source: 'Inmuebles24',
    sourceUrl: '#',
    aiSummary: 'Stylish loft in Polanco\'s most desirable stretch. High ceilings and natural light. Parking included. A bit above typical 1BR pricing for Polanco.',
    matchScore: 71,
    postedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Pet-friendly 2BR with parking — Nápoles',
    colonia: 'Nápoles',
    price: 18500,
    currency: 'MXN',
    bedrooms: 2,
    bathrooms: 1,
    sqMeters: 80,
    amenities: ['pet-friendly', 'parking'],
    images: [],
    source: 'Facebook Marketplace',
    sourceUrl: '#',
    aiSummary: 'A rare pet-friendly 2BR with a large terrace in a quiet Nápoles street. Central location. The building is older but well maintained.',
    matchScore: 66,
    postedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Furnished studio near Parque México — Condesa',
    colonia: 'Condesa',
    price: 950,
    currency: 'USD',
    bedrooms: 0,
    bathrooms: 1,
    sqMeters: 42,
    amenities: ['furnished', 'near-metro'],
    images: [],
    source: 'Nidō Sublets',
    sourceUrl: '#',
    aiSummary: 'A beautifully furnished studio one block from Parque México. Listed exclusively on Nidō Sublets by a departing tenant. Available immediately.',
    matchScore: 89,
    postedAt: new Date().toISOString(),
  },
];

interface ResultsPageProps {
  searchParams: {
    rentalType?: string;
    budget?: string;
    currency?: string;
    area?: string;
    bedrooms?: string;
  };
}

export default function ResultsPage({ searchParams }: ResultsPageProps) {
  const t = useTranslations('results');
  const locale = useLocale();

  const listings = PLACEHOLDER_LISTINGS;
  const area = searchParams.area || 'CDMX';

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1
              className="text-3xl font-bold text-charcoal"
              style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
            >
              {t('title')}
            </h1>
            <p className="text-charcoal-muted mt-1 text-sm">
              {t('subtitle', { count: listings.length })}
              {area && <span className="font-medium text-terracotta"> · {area}</span>}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/search`}
              className="btn-secondary gap-2 text-sm py-2.5"
            >
              <Search className="w-3.5 h-3.5" />
              {t('newSearch')}
            </Link>
          </div>
        </div>

        {/* Sort/filter bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-cream-deep">
          <div className="flex items-center gap-2 text-sm text-charcoal-muted">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="font-medium">{t('sortBy')}:</span>
            {[t('sortMatch'), t('sortPrice'), t('sortDate')].map((sort, i) => (
              <button
                key={sort}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  i === 0 ? 'bg-terracotta text-white' : 'hover:bg-cream-warm text-charcoal-muted'
                }`}
              >
                {sort}
              </button>
            ))}
          </div>
          <span className="text-xs text-charcoal-muted hidden sm:block">
            Powered by Claude AI
          </span>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              locale={locale as 'en' | 'es'}
              perMonthLabel={t('perMonth')}
              aiSummaryLabel={t('aiSummary')}
              viewLabel={t('viewListing')}
            />
          ))}
        </div>

        {/* Concierge upsell */}
        <ConciergeUpsellBanner />
      </div>
    </div>
  );
}
