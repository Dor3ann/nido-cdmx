'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Zap, Bell, Star } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const features = [
  { icon: '🔍', key: 'feature1' as const },
  { icon: '🔔', key: 'feature2' as const },
  { icon: '⚡', key: 'feature3' as const },
  { icon: '💬', key: 'feature4' as const },
  { icon: '🔒', key: 'feature5' as const },
];

export default function PremiumPage() {
  const t = useTranslations('premium');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <div className="bg-charcoal relative overflow-hidden py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-terracotta/10 blur-3xl -translate-y-1/3" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Coming soon badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/20 text-terracotta text-sm font-semibold mb-8">
            <Zap className="w-4 h-4" />
            {t('comingSoon')}
          </div>

          <h1
            className="text-5xl font-bold text-cream mb-4"
            style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
          >
            Nid<span className="text-terracotta">ō</span> Premium
          </h1>
          <p className="text-cream/60 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {features.map((f) => (
            <div key={f.key} className="card p-6 flex items-start gap-4 opacity-70">
              <span className="text-2xl">{f.icon}</span>
              <p className="text-sm font-medium text-charcoal">{t(f.key)}</p>
            </div>
          ))}
        </div>

        {/* Waitlist form */}
        <div className="max-w-md mx-auto text-center">
          <div className="flex gap-1 justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-terracotta text-terracotta" />
            ))}
          </div>
          <h2
            className="text-3xl font-bold text-charcoal mb-3"
            style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
          >
            {t('notifyMe')}
          </h2>

          {submitted ? (
            <div className="bg-sage-light border border-sage/20 rounded-2xl p-6 text-sage-dark font-medium">
              You&apos;re on the list! We&apos;ll reach out when Premium launches.
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex gap-2 mt-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                required
                className="flex-1"
              />
              <Button type="submit" className="shrink-0">
                {t('notifySubmit')}
                <Bell className="w-4 h-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
