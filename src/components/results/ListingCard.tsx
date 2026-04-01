import { ExternalLink, MapPin, Bed, Bath, Zap, Star } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import FadeImage from '@/components/ui/FadeImage';
import type { Listing } from '@/lib/types';

const FALLBACK_PHOTO = 'https://picsum.photos/seed/apartment/800/500';

interface ListingCardProps {
  listing: Listing;
  locale: 'en' | 'es';
  perMonthLabel: string;
  aiSummaryLabel: string;
  viewLabel: string;
}

export default function ListingCard({
  listing,
  perMonthLabel,
  aiSummaryLabel,
  viewLabel,
}: ListingCardProps) {
  const matchColor =
    listing.matchScore >= 80
      ? 'text-sage-dark bg-sage-light'
      : listing.matchScore >= 60
      ? 'text-terracotta bg-terracotta-pale'
      : 'text-charcoal-muted bg-cream';

  return (
    <div className="card overflow-hidden hover:shadow-md transition-all duration-200 group">
      {/* Image */}
      <div className="relative h-[200px] w-full overflow-hidden rounded-t-2xl bg-cream-warm">
        <FadeImage
          src={listing.images?.[0] ?? FALLBACK_PHOTO}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="group-hover:scale-105 transition-transform duration-500"
        />

        {/* Match score badge */}
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold ${matchColor}`}>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            {listing.matchScore}%
          </span>
        </div>

        {/* Source badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="dark" className="text-xs">{listing.source}</Badge>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {/* Title & price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-charcoal text-sm leading-snug line-clamp-2 flex-1">
            {listing.title}
          </h3>
          <div className="text-right shrink-0">
            <p className="text-lg font-bold text-charcoal">
              {listing.currency === 'MXN' ? '$' : 'US$'}
              {listing.price.toLocaleString()}
            </p>
            <p className="text-xs text-charcoal-muted">{perMonthLabel}</p>
          </div>
        </div>

        {/* Location & details */}
        <div className="flex items-center gap-4 text-xs text-charcoal-muted">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-terracotta" />
            {listing.colonia}
          </span>
          {listing.bedrooms !== undefined && (
            <span className="flex items-center gap-1">
              <Bed className="w-3 h-3" />
              {listing.bedrooms === 0 || listing.bedrooms === 'studio' ? 'Studio' : `${listing.bedrooms} bed`}
            </span>
          )}
          {listing.bathrooms && (
            <span className="flex items-center gap-1">
              <Bath className="w-3 h-3" />
              {listing.bathrooms}
            </span>
          )}
          {listing.sqMeters && (
            <span>{listing.sqMeters} m²</span>
          )}
        </div>

        {/* AI summary */}
        {listing.aiSummary && (
          <div className="bg-sage-light/50 rounded-xl p-3">
            <p className="text-xs font-semibold text-sage-dark flex items-center gap-1.5 mb-1.5">
              <Zap className="w-3 h-3" />
              {aiSummaryLabel}
            </p>
            <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
              {listing.aiSummary}
            </p>
          </div>
        )}

        {/* View listing CTA */}
        <a
          href={listing.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-terracotta/20 text-terracotta text-sm font-semibold hover:bg-terracotta-pale transition-colors"
        >
          {viewLabel}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
