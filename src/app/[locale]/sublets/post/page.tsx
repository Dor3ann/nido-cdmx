'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { CheckCircle, Upload } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import type { Currency, FurnishedStatus, ContactMethod, Bedrooms } from '@/lib/types';

const BEDROOMS_OPTS = ['studio', '1', '2', '3+'] as const;
const FURNISHED_OPTS: FurnishedStatus[] = ['furnished', 'unfurnished', 'part-furnished'];

export default function PostSubletPage() {
  const t = useTranslations('postSublet');
  const locale = useLocale();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [colonia, setColonia] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState<Currency>('MXN');
  const [bedrooms, setBedrooms] = useState<Bedrooms>('1');
  const [furnished, setFurnished] = useState<FurnishedStatus>('furnished');
  const [moveIn, setMoveIn] = useState('');
  const [leaseEnd, setLeaseEnd] = useState('');
  const [description, setDescription] = useState('');
  const [contactMethod, setContactMethod] = useState<ContactMethod>('whatsapp');
  const [contactValue, setContactValue] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // POST to /api/sublets
    try {
      const res = await fetch('/api/sublets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          colonia, price: Number(price), currency, bedrooms,
          furnishedStatus: furnished, moveInDate: moveIn, leaseEndDate: leaseEnd,
          description, contactMethod, contactValue, locale,
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-sage-dark" />
          </div>
          <h2 className="text-3xl font-bold text-charcoal mb-3" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
            {t('successTitle')}
          </h2>
          <p className="text-charcoal-muted mb-8">{t('successDesc')}</p>
          <div className="bg-terracotta-pale border border-terracotta/20 rounded-2xl p-5 mb-6 text-left">
            <p className="text-xs font-semibold text-terracotta mb-2">Pricing</p>
            <p className="text-sm text-charcoal">{t('pricingNote')}</p>
          </div>
          <a href={`/${locale}/sublets`} className="btn-primary">View All Sublets</a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-charcoal mb-3" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
            {t('title')}
          </h1>
          <p className="text-charcoal-muted">{t('subtitle')}</p>

          {/* Pricing strip */}
          <div className="mt-5 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-terracotta-pale border border-terracotta/20 text-sm text-terracotta font-medium">
            🎉 {t('pricingNote')}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-cream-deep shadow-sm p-8 sm:p-10 space-y-6">

          {/* Colonia + bedrooms */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('colonia')}
              value={colonia}
              onChange={(e) => setColonia(e.target.value)}
              placeholder={t('coloniaPlaceholder')}
              required
              className="col-span-2 sm:col-span-1"
            />
            <div className="col-span-2 sm:col-span-1 space-y-1.5">
              <label className="block text-sm font-medium text-charcoal">Bedrooms</label>
              <div className="flex gap-2">
                {BEDROOMS_OPTS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBedrooms(b as Bedrooms)}
                    className={`flex-1 py-3 rounded-xl border-2 text-xs font-semibold transition-all ${
                      bedrooms === b
                        ? 'border-terracotta bg-terracotta-pale text-terracotta'
                        : 'border-cream-deep bg-white text-charcoal'
                    }`}
                  >
                    {b === 'studio' ? 'Studio' : b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price + currency */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-charcoal">{t('price')}</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={t('pricePlaceholder')}
                required
                className="input-base flex-1"
                min={0}
              />
              <div className="flex rounded-xl border border-cream-deep overflow-hidden">
                {(['MXN', 'USD'] as Currency[]).map((cur) => (
                  <button
                    key={cur}
                    type="button"
                    onClick={() => setCurrency(cur)}
                    className={`px-4 text-sm font-semibold transition-colors ${
                      currency === cur
                        ? 'bg-terracotta text-white'
                        : 'bg-white text-charcoal-soft hover:bg-cream'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Furnished */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-charcoal">{t('furnished')}</label>
            <div className="flex gap-2 flex-wrap">
              {FURNISHED_OPTS.map((opt) => {
                const label = opt === 'furnished' ? t('furnishedOpt')
                  : opt === 'unfurnished' ? t('unfurnishedOpt')
                  : t('partFurnishedOpt');
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFurnished(opt)}
                    className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      furnished === opt
                        ? 'border-terracotta bg-terracotta-pale text-terracotta'
                        : 'border-cream-deep bg-white text-charcoal hover:border-terracotta/40'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('moveIn')}
              type="date"
              value={moveIn}
              onChange={(e) => setMoveIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
            <Input
              label={t('leaseEnd')}
              type="date"
              value={leaseEnd}
              onChange={(e) => setLeaseEnd(e.target.value)}
              min={moveIn || new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-charcoal">{t('description')}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('descPlaceholder')}
              required
              rows={4}
              className="input-base resize-none"
            />
          </div>

          {/* Photos placeholder */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-charcoal">{t('photos')}</label>
            <div className="border-2 border-dashed border-cream-deep rounded-xl p-8 text-center hover:border-terracotta/40 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-charcoal-muted mx-auto mb-3" />
              <p className="text-sm text-charcoal-muted">{t('photosHelp')}</p>
              <p className="text-xs text-charcoal-muted/60 mt-1">JPG, PNG up to 10MB each</p>
            </div>
          </div>

          {/* Contact method */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-charcoal">{t('contactMethod')}</label>
            <div className="flex gap-3">
              {(['email', 'whatsapp'] as ContactMethod[]).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setContactMethod(method)}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all capitalize ${
                    contactMethod === method
                      ? 'border-terracotta bg-terracotta-pale text-terracotta'
                      : 'border-cream-deep bg-white text-charcoal'
                  }`}
                >
                  {method === 'email' ? `✉️ ${t('contactEmail')}` : `💬 ${t('contactWhatsApp')}`}
                </button>
              ))}
            </div>
            <Input
              label={t('contactValue')}
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              placeholder={t('contactValuePlaceholder')}
              type={contactMethod === 'email' ? 'email' : 'tel'}
              required
            />
          </div>

          {/* Submit */}
          <Button type="submit" loading={loading} size="lg" className="w-full justify-center mt-2">
            {loading ? t('submitting') : t('submit')}
          </Button>

          <p className="text-center text-xs text-charcoal-muted">
            {t('pricingNote')}
          </p>
        </form>
      </div>
    </div>
  );
}
