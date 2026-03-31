// ─── Search & Intake ────────────────────────────────────────────────────────

export type RentalType = 'short-term' | 'long-term' | 'sublet';
export type Currency = 'MXN' | 'USD';
export type Bedrooms = 'studio' | '1' | '2' | '3+';
export type Locale = 'en' | 'es';

export type Amenity =
  | 'furnished'
  | 'pet-friendly'
  | 'parking'
  | 'gym'
  | 'rooftop'
  | 'bills-included'
  | 'near-metro';

export interface SearchParams {
  locale: Locale;
  rentalType: RentalType;
  budget: number;
  currency: Currency;
  area: string;
  suggestArea: boolean;
  bedrooms: Bedrooms;
  amenities: Amenity[];
  moveInDate: string;
  moveOutDate?: string;   // only for short-term / sublet
  leaseLength?: string;   // only for short-term / sublet
}

// ─── Listings ─────────────────────────────────────────────────────────────────

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
  amenities: Amenity[];
  images: string[];
  source: ListingSource;
  sourceUrl: string;
  aiSummary: string;
  matchScore: number; // 0-100
  postedAt: string;   // ISO date string
}

// ─── Sublets ──────────────────────────────────────────────────────────────────

export type FurnishedStatus = 'furnished' | 'unfurnished' | 'part-furnished';
export type ContactMethod = 'email' | 'whatsapp';

export interface SubletListing {
  id: string;
  colonia: string;
  price: number;
  currency: Currency;
  furnishedStatus: FurnishedStatus;
  bedrooms: number | 'studio';
  moveInDate: string;
  leaseEndDate: string;
  description: string;
  photos: string[];
  contactMethod: ContactMethod;
  contactValue: string;
  createdAt: string;
  expiresAt: string;
  isBoosted: boolean;
}

export interface SubletFormData {
  colonia: string;
  price: number;
  currency: Currency;
  bedrooms: Bedrooms;
  furnishedStatus: FurnishedStatus;
  moveInDate: string;
  leaseEndDate: string;
  description: string;
  photos: File[];
  contactMethod: ContactMethod;
  contactValue: string;
}

// ─── Concierge Lead ───────────────────────────────────────────────────────────

export interface ConciergeLead {
  name: string;
  email: string;
  whatsapp?: string;
  timeline: string;
  budget: string;
  notes?: string;
  locale: Locale;
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface SearchResponse {
  listings: Listing[];
  total: number;
  searchId: string;
  generatedAt: string;
}

export interface ApiError {
  error: string;
  code?: string;
}
