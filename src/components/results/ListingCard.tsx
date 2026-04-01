import { ExternalLink, MapPin, Bed, Bath, Star } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import FadeImage from '@/components/ui/FadeImage';
import type { Listing } from '@/types/listing';

const FALLBACK_PHOTO = 'https://picsum.photos/seed/apartment/800/500';

interface ListingCardProps {
  listing: Listing;
  perMonthLabel: string;
  viewLabel: string;
}

export default function ListingCard({ listing, perMonthLabel, viewLabel }: ListingCardProps) {
  const matchColor =
    listing.matchScore >= 80
      ? 'text-sage-dark bg-sage-light'
      : listing.matchScore >= 60
      ? 'text-terracotta bg-terracotta-pale'
      : 'text-charcoal-muted bg-cream';

  const bedroomsLabel =
    listing.bedrooms === 0 || listing.bedrooms === 'studio' ? 'Studio' : `${listing.bedrooms} bed`;

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
        {/* Neighborhood tag + title */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <MapPin className="w-3 h-3 text-terracotta" />
            <span className="text-xs font-semibold text-terracotta uppercase tracking-wide">
              {listing.colonia}
            </span>
          </div>
          <h3 className="font-bold text-charcoal text-sm leading-snug line-clamp-2">
            {listing.title}
          </h3>
        </div>

        {/* Price */}
        <div>
          <span className="text-xl font-bold text-charcoal">
            {listing.currency === 'MXN' ? '$' : 'US$'}
            {listing.price.toLocaleString()}
          </span>
          <span className="text-xs text-charcoal-muted ml-1">{perMonthLabel}</span>
        </div>

        {/* Bedrooms + bathrooms + sqm */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-charcoal-muted">
          <span className="flex items-center gap-1 bg-cream px-2 py-1 rounded-lg">
            <Bed className="w-3 h-3" />
            {bedroomsLabel}
          </span>
          {listing.bathrooms !== undefined && (
            <span className="flex items-center gap-1 bg-cream px-2 py-1 rounded-lg">
              <Bath className="w-3 h-3" />
              {listing.bathrooms} bath
            </span>
          )}
          {listing.sqMeters && (
            <span className="bg-cream px-2 py-1 rounded-lg">{listing.sqMeters} m²</span>
          )}
        </div>

        {/* Furnished + pets badges */}
        <div className="flex gap-2 flex-wrap">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              listing.furnished
                ? 'bg-sage-light text-sage-dark'
                : 'bg-cream-deep text-charcoal-muted'
            }`}
          >
            {listing.furnished ? '✓ Furnished' : 'Unfurnished'}
          </span>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              listing.petsAllowed
                ? 'bg-sage-light text-sage-dark'
                : 'bg-cream-deep text-charcoal-muted'
            }`}
          >
            {listing.petsAllowed ? '✓ Pets OK' : 'No pets'}
          </span>
        </div>

        {/* Short description */}
        <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
          {listing.description}
        </p>

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
