import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  // Prefix all locales including default for clarity
  localePrefix: 'as-needed',
});
