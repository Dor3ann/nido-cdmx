'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, ArrowLeft, Loader2, MapPin } from 'lucide-react';
import type { Amenity, Bedrooms, Currency, RentalType, SearchParams } from '@/lib/types';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';

// ─── Form steps ────────────────────────────────────────────────────────────

const TOTAL_STEPS = 4;

const AMENITY_CONFIG: { key: Amenity; icon: string }[] = [
  { key: 'furnished', icon: '🛋️' },
  { key: 'pet-friendly', icon: '🐾' },
  { key: 'parking', icon: '🚗' },
  { key: 'gym', icon: '💪' },
  { key: 'rooftop', icon: '🏙️' },
  { key: 'bills-included', icon: '⚡' },
  { key: 'near-metro', icon: '🚇' },
];

const BEDROOMS: { value: Bedrooms; labelKey: 'studio' | 'oneBed' | 'twoBed' | 'threePlus' }[] = [
  { value: 'studio', labelKey: 'studio' },
  { value: '1', labelKey: 'oneBed' },
  { value: '2', labelKey: 'twoBed' },
  { value: '3+', labelKey: 'threePlus' },
];

const RENTAL_TYPES: { value: RentalType; labelKey: 'shortTerm' | 'longTerm' | 'sublet'; emoji: string }[] = [
  { value: 'short-term', labelKey: 'shortTerm', emoji: '📅' },
  { value: 'long-term', labelKey: 'longTerm', emoji: '🏠' },
  { value: 'sublet', labelKey: 'sublet', emoji: '🔄' },
];

// ─── Component ─────────────────────────────────────────────────────────────

export default function IntakeForm() {
  const t = useTranslations('search');
  const locale = useLocale();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form state
  const [rentalType, setRentalType] = useState<RentalType>('long-term');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState<Currency>('MXN');
  const [area, setArea] = useState('');
  const [suggestArea, setSuggestArea] = useState(false);
  const [bedrooms, setBedrooms] = useState<Bedrooms>('1');
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [moveIn, setMoveIn] = useState('');
  const [moveOut, setMoveOut] = useState('');

  const needsDates = rentalType === 'short-term' || rentalType === 'sublet';

  function toggleAmenity(key: Amenity) {
    setAmenities((prev) =>
      prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key]
    );
  }

  async function handleSubmit() {
    setLoading(true);
    const params: SearchParams = {
      locale: locale as 'en' | 'es',
      rentalType,
      budget: Number(budget),
      currency,
      area: suggestArea ? '' : area,
      suggestArea,
      bedrooms,
      amenities,
      moveInDate: moveIn,
      moveOutDate: needsDates ? moveOut : undefined,
    };

    // Encode params as URL query string
    const query = new URLSearchParams({
      rentalType: params.rentalType,
      budget: String(params.budget),
      currency: params.currency,
      area: params.area,
      bedrooms: params.bedrooms,
      amenities: params.amenities.join(','),
      moveIn: params.moveInDate,
      ...(params.moveOutDate ? { moveOut: params.moveOutDate } : {}),
    });

    router.push(`/${locale}/results?${query.toString()}`);
  }

  // ─── Step content ─────────────────────────────────────────────────────────

  const stepContent = [
    // Step 1 — Rental type
    <div key="step1" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-charcoal mb-1" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
          {t('lookingFor')}
        </h2>
        <p className="text-charcoal-muted text-sm">{t('step', { current: 1, total: TOTAL_STEPS })}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {RENTAL_TYPES.map((rt) => (
          <button
            key={rt.value}
            type="button"
            onClick={() => setRentalType(rt.value)}
            className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 text-center transition-all ${
              rentalType === rt.value
                ? 'border-terracotta bg-terracotta-pale'
                : 'border-cream-deep bg-white hover:border-terracotta/40 hover:bg-terracotta-pale/30'
            }`}
          >
            <span className="text-3xl">{rt.emoji}</span>
            <span className={`text-sm font-semibold ${rentalType === rt.value ? 'text-terracotta' : 'text-charcoal'}`}>
              {t(rt.labelKey)}
            </span>
          </button>
        ))}
      </div>
    </div>,

    // Step 2 — Budget & area
    <div key="step2" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-charcoal mb-1" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
          Budget & Location
        </h2>
        <p className="text-charcoal-muted text-sm">{t('step', { current: 2, total: TOTAL_STEPS })}</p>
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-charcoal">{t('budget')}</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder={t('budgetPlaceholder')}
            className="input-base flex-1"
            min={0}
          />
          <div className="flex rounded-xl border border-cream-deep overflow-hidden">
            {(['MXN', 'USD'] as Currency[]).map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => setCurrency(cur)}
                className={`px-4 py-3 text-sm font-semibold transition-colors ${
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

      {/* Area */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-charcoal">{t('area')}</label>
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-muted" />
          <input
            type="text"
            value={area}
            onChange={(e) => { setArea(e.target.value); setSuggestArea(false); }}
            placeholder={t('areaPlaceholder')}
            disabled={suggestArea}
            className={`input-base pl-10 ${suggestArea ? 'opacity-50' : ''}`}
          />
        </div>
        <button
          type="button"
          onClick={() => { setSuggestArea(!suggestArea); if (!suggestArea) setArea(''); }}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${
            suggestArea ? 'text-terracotta' : 'text-charcoal-muted hover:text-charcoal'
          }`}
        >
          <span className={`w-4 h-4 rounded border-2 flex items-center justify-center ${suggestArea ? 'border-terracotta bg-terracotta' : 'border-cream-deep'}`}>
            {suggestArea && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          {t('areaHelp')}
        </button>
      </div>
    </div>,

    // Step 3 — Bedrooms & amenities
    <div key="step3" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-charcoal mb-1" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
          Bedrooms & Features
        </h2>
        <p className="text-charcoal-muted text-sm">{t('step', { current: 3, total: TOTAL_STEPS })}</p>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-charcoal">{t('bedrooms')}</label>
        <div className="flex gap-2 flex-wrap">
          {BEDROOMS.map((b) => (
            <button
              key={b.value}
              type="button"
              onClick={() => setBedrooms(b.value)}
              className={`px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                bedrooms === b.value
                  ? 'border-terracotta bg-terracotta-pale text-terracotta'
                  : 'border-cream-deep bg-white text-charcoal hover:border-terracotta/40'
              }`}
            >
              {t(b.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-charcoal">{t('mustHaves')}</label>
        <div className="flex flex-wrap gap-2">
          {AMENITY_CONFIG.map((a) => (
            <Checkbox
              key={a.key}
              label={t(a.key === 'pet-friendly' ? 'petFriendly' :
                        a.key === 'bills-included' ? 'billsIncluded' :
                        a.key === 'near-metro' ? 'nearMetro' :
                        a.key as 'furnished' | 'parking' | 'gym' | 'rooftop')}
              checked={amenities.includes(a.key)}
              onChange={() => toggleAmenity(a.key)}
              icon={a.icon}
            />
          ))}
        </div>
      </div>
    </div>,

    // Step 4 — Dates
    <div key="step4" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-charcoal mb-1" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
          Dates
        </h2>
        <p className="text-charcoal-muted text-sm">{t('step', { current: 4, total: TOTAL_STEPS })}</p>
      </div>

      <Input
        label={t('moveIn')}
        type="date"
        value={moveIn}
        onChange={(e) => setMoveIn(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
      />

      {needsDates && (
        <Input
          label={t('moveOut')}
          type="date"
          value={moveOut}
          onChange={(e) => setMoveOut(e.target.value)}
          min={moveIn || new Date().toISOString().split('T')[0]}
          hint={t('leaseLength')}
        />
      )}

      {/* Summary */}
      <div className="bg-cream rounded-2xl p-5 space-y-2 text-sm">
        <p className="font-semibold text-charcoal text-xs uppercase tracking-wide mb-3">Your search</p>
        <div className="grid grid-cols-2 gap-y-1.5 text-charcoal-muted">
          <span>Type</span>
          <span className="text-charcoal font-medium capitalize">{rentalType}</span>
          <span>Budget</span>
          <span className="text-charcoal font-medium">{budget ? `${budget} ${currency}/mo` : '—'}</span>
          <span>Area</span>
          <span className="text-charcoal font-medium">{suggestArea ? 'AI suggestions' : area || '—'}</span>
          <span>Bedrooms</span>
          <span className="text-charcoal font-medium">{bedrooms === 'studio' ? 'Studio' : `${bedrooms} bed`}</span>
        </div>
      </div>

      {/* Search note */}
      <div className="flex items-start gap-3 p-4 bg-sage-light rounded-xl text-sm text-sage-dark">
        <span className="text-xl">✨</span>
        <p>{t('searchNote')}</p>
      </div>
    </div>,
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-charcoal/5 border border-cream-deep p-8 sm:p-10">
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < step ? 'bg-terracotta' : 'bg-cream-deep'
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="min-h-[280px]">{stepContent[step - 1]}</div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-cream-deep">
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 1}
          className="btn-ghost gap-2 disabled:opacity-0 disabled:pointer-events-none"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('back')}
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="btn-primary gap-2"
          >
            {t('next')}
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Button loading={loading} onClick={handleSubmit} className="gap-2">
            {loading ? t('searching') : t('search')}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </Button>
        )}
      </div>
    </div>
  );
}
