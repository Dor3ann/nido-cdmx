'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Search, Loader2, Home, SlidersHorizontal } from 'lucide-react';
import ListingCard from '@/components/results/ListingCard';
import ConciergeUpsellBanner from '@/components/results/ConciergeUpsellBanner';
import type { Listing } from '@/types/listing';

// ─── Mock listings ─────────────────────────────────────────────────────────────

const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Charming 1BR with balcony — Álvaro Obregón',
    colonia: 'Roma Norte',
    price: 16500,
    currency: 'MXN',
    bedrooms: 1,
    bathrooms: 1,
    sqMeters: 65,
    furnished: true,
    petsAllowed: false,
    description:
      'A well-lit apartment in a sought-after art-deco building on Álvaro Obregón. Walking distance to metro Insurgentes and the best restaurants in Roma. Laundry on-site. No parking included.',
    images: ['https://picsum.photos/seed/apt-roma/800/500'],
    source: 'Inmuebles24',
    sourceUrl: '#',
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
    furnished: true,
    petsAllowed: true,
    description:
      'Spacious 2BR in a boutique building with a stunning rooftop. High ceilings, natural light, private parking. Ideal for remote workers or couples. Slightly above market but excellent value for Condesa.',
    images: ['https://picsum.photos/seed/apt-condesa/800/500'],
    source: 'Lamudi',
    sourceUrl: '#',
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
    furnished: false,
    petsAllowed: false,
    description:
      'Compact but efficient studio in the heart of Juárez. Bills included in the rent — great value for the location. The building has 24-hr concierge. Metro Insurgentes is a 3-minute walk.',
    images: ['https://picsum.photos/seed/apt-juarez/800/500'],
    source: 'Vivanuncios',
    sourceUrl: '#',
    matchScore: 78,
    postedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Bright 1BR loft — Polanco, near Presidente Masaryk',
    colonia: 'Polanco',
    price: 21000,
    currency: 'MXN',
    bedrooms: 1,
    bathrooms: 1,
    sqMeters: 72,
    furnished: true,
    petsAllowed: false,
    description:
      'Stylish loft in Polanco\'s most sought-after stretch. High ceilings, natural light, and dedicated parking. Gym and doorman in building. A step above typical 1BR pricing but worth it.',
    images: ['https://picsum.photos/seed/apt-polanco/800/500'],
    source: 'Inmuebles24',
    sourceUrl: '#',
    matchScore: 71,
    postedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Pet-friendly 2BR with garden terrace — Nápoles',
    colonia: 'Nápoles',
    price: 18500,
    currency: 'MXN',
    bedrooms: 2,
    bathrooms: 1,
    sqMeters: 80,
    furnished: false,
    petsAllowed: true,
    description:
      'Rare pet-friendly 2BR with a large private terrace in a quiet Nápoles street. Parking included. The building is older but well maintained with a friendly community feel.',
    images: ['https://picsum.photos/seed/apt-napoles/800/500'],
    source: 'Facebook Marketplace',
    sourceUrl: '#',
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
    furnished: true,
    petsAllowed: true,
    description:
      'Beautifully furnished studio one block from Parque México. Listed exclusively on Nidō Sublets by a departing tenant. Available immediately. Cat and small dog-friendly building.',
    images: ['https://picsum.photos/seed/apt-sublet/800/500'],
    source: 'Nidō Sublets',
    sourceUrl: '#',
    matchScore: 89,
    postedAt: new Date().toISOString(),
  },
];

// ─── Platforms ─────────────────────────────────────────────────────────────────

const PLATFORMS = ['Inmuebles24', 'Lamudi', 'Vivanuncios', 'Facebook', 'Nidō'];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const [searchLabel, setSearchLabel] = useState('CDMX');
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    async function fetchListings() {
      let criteria: Record<string, unknown> = {};

      const raw = sessionStorage.getItem('nido_search');
      if (raw) {
        try {
          criteria = JSON.parse(raw) as Record<string, unknown>;
          const hoods = criteria.neighborhoods as string[] | undefined;
          if (hoods && hoods.length > 0) {
            setSearchLabel(hoods.join(', '));
          }
        } catch {
          // ignore malformed data
        }
      }

      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(criteria),
        });
        const data = await res.json() as { listings?: Listing[] };
        if (Array.isArray(data.listings) && data.listings.length > 0) {
          setListings(data.listings);
        } else {
          setListings(MOCK_LISTINGS);
        }
      } catch {
        setListings(MOCK_LISTINGS);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  // ── Loading state ────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-5 px-4">
        <div className="w-16 h-16 rounded-2xl bg-terracotta-pale flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-terracotta animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-charcoal mb-1">Searching across 5 platforms…</p>
          <p className="text-sm text-charcoal-muted">This usually takes about 30 seconds</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          {PLATFORMS.map((p, i) => (
            <div
              key={p}
              className="h-1.5 w-10 rounded-full bg-terracotta/20 overflow-hidden"
            >
              <div
                className="h-full bg-terracotta rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.25}s` }}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {PLATFORMS.map((p) => (
            <span key={p} className="text-xs text-charcoal-muted bg-white px-3 py-1 rounded-full border border-cream-deep">
              {p}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // ── Empty state ──────────────────────────────────────────────────────────────

  if (listings.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-20 h-20 rounded-3xl bg-cream-warm flex items-center justify-center">
          <Home className="w-9 h-9 text-charcoal-muted" />
        </div>
        <div className="text-center max-w-sm">
          <h2
            className="text-xl font-bold text-charcoal mb-2"
            style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
          >
            No listings found
          </h2>
          <p className="text-charcoal-muted text-sm mb-6">
            We couldn&apos;t find any listings matching your criteria. Try broadening your budget,
            adding more neighborhoods, or adjusting your bedroom count.
          </p>
          <Link href={`/${locale}/search`} className="btn-primary gap-2">
            <Search className="w-4 h-4" />
            Adjust Search
          </Link>
        </div>
      </div>
    );
  }

  // ── Results ──────────────────────────────────────────────────────────────────

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="section-label mb-1">Search results</p>
            <h1
              className="text-3xl font-bold text-charcoal"
              style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
            >
              {listings.length} listings found
            </h1>
            <p className="text-charcoal-muted mt-1 text-sm">
              Searching in{' '}
              <span className="font-medium text-terracotta">{searchLabel}</span>
              {' · '}Ranked by match score
            </p>
          </div>
          <Link
            href={`/${locale}/search`}
            className="btn-secondary gap-2 text-sm py-2.5 self-start"
          >
            <Search className="w-3.5 h-3.5" />
            New Search
          </Link>
        </div>

        {/* Sort bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-cream-deep">
          <div className="flex items-center gap-2 text-sm text-charcoal-muted">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="font-medium">Sort by:</span>
            {['Best match', 'Lowest price', 'Newest'].map((sort, i) => (
              <button
                key={sort}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  i === 0
                    ? 'bg-terracotta text-white'
                    : 'hover:bg-cream-warm text-charcoal-muted'
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

        {/* Listings grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              perMonthLabel="/mo"
              viewLabel="View Listing"
            />
          ))}
        </div>

        {/* Concierge upsell */}
        <ConciergeUpsellBanner />
      </div>
    </div>
  );
}
