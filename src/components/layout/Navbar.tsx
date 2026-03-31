'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X, Home, Star } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import NidoLogo from './NidoLogo';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}/search`, label: t('search') },
    { href: `/${locale}/sublets`, label: t('sublets') },
    { href: `/${locale}/concierge`, label: t('concierge') },
    { href: `/${locale}/about`, label: t('about') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-cream-deep">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NidoLogo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-charcoal-soft hover:text-charcoal hover:bg-cream-warm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageToggle />

            {/* Premium CTA — desktop */}
            <Link
              href={`/${locale}/premium`}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl border border-terracotta/30 text-terracotta text-sm font-semibold hover:bg-terracotta-pale transition-colors"
            >
              <Star className="w-3.5 h-3.5" />
              {t('premium')}
            </Link>

            {/* Post sublet — desktop */}
            <Link
              href={`/${locale}/sublets/post`}
              className="hidden md:flex btn-primary text-sm py-2 px-4"
            >
              {t('postSublet')}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-charcoal-soft hover:bg-cream-warm"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-cream-deep py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-charcoal hover:bg-cream-warm transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link
                href={`/${locale}/sublets/post`}
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full justify-center"
              >
                {t('postSublet')}
              </Link>
              <Link
                href={`/${locale}/premium`}
                onClick={() => setMenuOpen(false)}
                className="btn-secondary w-full justify-center"
              >
                <Star className="w-4 h-4 text-terracotta" />
                {t('premium')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
