import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Nidō — Your CDMX Home, Found',
    template: '%s | Nidō',
  },
  description:
    'Bilingual AI-powered housing search for Mexico City. Search across Inmuebles24, Lamudi, Vivanuncios and more — all at once.',
  keywords: ['CDMX', 'Mexico City', 'housing', 'rental', 'apartments', 'expat', 'housing search'],
  openGraph: {
    title: 'Nidō — Your CDMX Home, Found',
    description: 'Find your Mexico City home with AI-powered search across all major platforms.',
    locale: 'en_US',
    alternateLocale: 'es_MX',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>{children}</body>
    </html>
  );
}
