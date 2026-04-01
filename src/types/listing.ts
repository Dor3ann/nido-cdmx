export type Currency = 'MXN' | 'USD';

export type ListingSource =
  | 'Inmuebles24'
  | 'Lamudi'
  | 'Vivanuncios'
  | 'Facebook Marketplace'
  | 'Nidō Sublets';

export interface Listing {
  id: string;
  title: string;
  colonia: string;
  price: number;
  currency: Currency;
  bedrooms: number | 'studio';
  bathrooms?: number;
  sqMeters?: number;
  furnished: boolean;
  petsAllowed: boolean;
  description: string;
  images: string[];
  source: ListingSource;
  sourceUrl: string;
  matchScore: number; // 0–100
  postedAt: string;   // ISO date string
}
