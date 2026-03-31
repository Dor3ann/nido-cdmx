import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import NidoLogo from './NidoLogo';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            {/* Logo variant — white on dark */}
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M4 18 C4 10 28 10 28 18" stroke="#C4622D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M7 20 C7 24 25 24 25 20" stroke="#C4622D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M9 22 C9 26 23 26 23 22" stroke="#C4622D" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
                <circle cx="16" cy="17" r="2.5" fill="#C4622D" />
              </svg>
              <span className="text-lg font-bold text-cream">
                Nid<span className="text-terracotta">ō</span>
              </span>
            </Link>
            <p className="text-cream/60 text-sm max-w-xs leading-relaxed">{t('tagline')}</p>
            <p className="text-cream/40 text-xs">{t('madeIn')}</p>
          </div>

          {/* Nav links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-cream/50">{t('links')}</h4>
            <ul className="space-y-2">
              {[
                { href: `/${locale}/search`, label: nav('search') },
                { href: `/${locale}/sublets`, label: nav('sublets') },
                { href: `/${locale}/concierge`, label: nav('concierge') },
                { href: `/${locale}/about`, label: nav('about') },
                { href: `/${locale}/premium`, label: nav('premium') },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/60 hover:text-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-cream/50">{t('legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm text-cream/60 hover:text-cream transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-sm text-cream/60 hover:text-cream transition-colors">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-cream/30 text-center">
          {t('copyright', { year })}
        </div>
      </div>
    </footer>
  );
}
