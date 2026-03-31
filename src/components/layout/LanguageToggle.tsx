'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(next: 'en' | 'es') {
    if (next === locale) return;

    // Replace current locale prefix in the pathname
    const segments = pathname.split('/');
    // segments[1] is current locale or the first path part
    if (segments[1] === 'en' || segments[1] === 'es') {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }

    startTransition(() => {
      router.push(segments.join('/') || '/');
    });
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-cream-deep bg-cream p-0.5">
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending}
        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors duration-150 ${
          locale === 'en'
            ? 'bg-white text-charcoal shadow-sm'
            : 'text-charcoal-muted hover:text-charcoal'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('es')}
        disabled={isPending}
        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors duration-150 ${
          locale === 'es'
            ? 'bg-white text-charcoal shadow-sm'
            : 'text-charcoal-muted hover:text-charcoal'
        }`}
      >
        ES
      </button>
    </div>
  );
}
