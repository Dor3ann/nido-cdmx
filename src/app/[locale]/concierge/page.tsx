'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { CheckCircle, MessageCircle, Calendar, Shield, Star } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const benefits = [
  { icon: MessageCircle, titleKey: 'benefit1Title' as const, descKey: 'benefit1Desc' as const },
  { icon: Calendar, titleKey: 'benefit2Title' as const, descKey: 'benefit2Desc' as const },
  { icon: Star, titleKey: 'benefit3Title' as const, descKey: 'benefit3Desc' as const },
  { icon: Shield, titleKey: 'benefit4Title' as const, descKey: 'benefit4Desc' as const },
];

export default function ConciergePage() {
  const t = useTranslations('concierge');
  const locale = useLocale();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [timeline, setTimeline] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, whatsapp, timeline, budget, notes, locale }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <div className="bg-charcoal py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-terracotta/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-sage/10 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-label text-terracotta mb-4">Relocation Concierge</p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-cream mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
          >
            {t('title')}
          </h1>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Benefits */}
          <div>
            <h2
              className="text-3xl font-bold text-charcoal mb-8"
              style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
            >
              What&apos;s included
            </h2>

            <div className="space-y-6">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.titleKey} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-terracotta-pale flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal mb-1">{t(b.titleKey)}</h3>
                      <p className="text-sm text-charcoal-muted leading-relaxed">{t(b.descKey)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pricing & guarantee */}
            <div className="mt-10 space-y-3">
              <div className="flex items-center gap-3 p-4 bg-terracotta-pale rounded-xl">
                <span className="text-2xl">💰</span>
                <p className="text-sm font-semibold text-terracotta">{t('pricing')}</p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-sage-light rounded-xl">
                <span className="text-2xl">✅</span>
                <p className="text-sm font-medium text-sage-dark">{t('guarantee')}</p>
              </div>
            </div>

            {/* Testimonial placeholder */}
            <div className="mt-8 card p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-terracotta text-terracotta" />
                ))}
              </div>
              <p className="text-sm text-charcoal-muted italic leading-relaxed mb-4">
                &ldquo;I moved from New York to Roma Norte without speaking Spanish. Nidō&apos;s team handled everything — found me an apartment, negotiated my rent down by 10%, and even helped me understand the lease contract.&rdquo;
              </p>
              <p className="text-xs font-semibold text-charcoal">Sarah K. · New York → Roma Norte</p>
            </div>
          </div>

          {/* Lead capture form */}
          <div>
            {submitted ? (
              <div className="card p-10 text-center">
                <div className="w-20 h-20 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-sage-dark" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-3" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                  {t('successTitle')}
                </h3>
                <p className="text-charcoal-muted">{t('successDesc')}</p>
              </div>
            ) : (
              <div className="card p-8">
                <h2
                  className="text-2xl font-bold text-charcoal mb-1"
                  style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
                >
                  {t('formTitle')}
                </h2>
                <p className="text-sm text-charcoal-muted mb-7">{t('formSubtitle')}</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label={t('nameLabel')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('namePlaceholder')}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={t('emailLabel')}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('emailPlaceholder')}
                      required
                    />
                    <Input
                      label={t('whatsappLabel')}
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder={t('whatsappPlaceholder')}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={t('timelineLabel')}
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      placeholder={t('timelinePlaceholder')}
                      required
                    />
                    <Input
                      label={t('budgetLabel')}
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder={t('budgetPlaceholder')}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-charcoal">{t('notesLabel')}</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t('notesPlaceholder')}
                      rows={3}
                      className="input-base resize-none"
                    />
                  </div>

                  <Button type="submit" loading={loading} size="lg" className="w-full justify-center">
                    {loading ? t('submitting') : t('submit')}
                  </Button>

                  <p className="text-center text-xs text-charcoal-muted">{t('pricing')}</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
