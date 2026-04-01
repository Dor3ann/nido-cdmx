'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, ArrowLeft, Home } from 'lucide-react';
import type { Bedrooms, Currency, RentalType } from '@/lib/types';
import Button from '@/components/ui/Button';

// ─── Constants ─────────────────────────────────────────────────────────────

const TOTAL_STEPS = 4;

const RENTAL_TYPES: { value: RentalType; labelKey: 'shortTerm' | 'longTerm' | 'sublet'; emoji: string }[] = [
  { value: 'short-term', labelKey: 'shortTerm', emoji: '📅' },
  { value: 'long-term', labelKey: 'longTerm', emoji: '🏠' },
  { value: 'sublet', labelKey: 'sublet', emoji: '🔄' },
];

const NEIGHBORHOODS = [
  'Polanco',
  'Condesa',
  'Roma Norte',
  'Juárez',
  'Del Valle',
  'Escandón',
  'Nápoles',
] as const;

const BEDROOMS: { value: Bedrooms; label: string }[] = [
  { value: 'studio', label: 'Studio' },
  { value: '1',      label: '1 bed'  },
  { value: '2',      label: '2 beds' },
  { value: '3+',     label: '3+'     },
];

type TriOption = 'yes' | 'no' | 'either';

// ─── Component ─────────────────────────────────────────────────────────────

export default function IntakeForm() {
  const t = useTranslations('search');
  const locale = useLocale();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1
  const [rentalType, setRentalType] = useState<RentalType>('long-term');

  // Step 2
  const [budgetMin, setBudgetMin]         = useState('');
  const [budgetMax, setBudgetMax]         = useState('');
  const [currency, setCurrency]           = useState<Currency>('MXN');
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);

  // Step 3
  const [bedrooms,  setBedrooms]  = useState<Bedrooms>('1');
  const [furnished, setFurnished] = useState<TriOption>('either');
  const [pets,      setPets]      = useState<TriOption>('either');
  const [moveIn,    setMoveIn]    = useState('');

  // Step 4
  const [notes, setNotes] = useState('');

  // ─── Helpers ─────────────────────────────────────────────────────────────

  function toggleNeighborhood(name: string) {
    setNeighborhoods((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }

  function triButton(value: TriOption, current: TriOption, set: (v: TriOption) => void, label: string) {
    return (
      <button
        key={value}
        type="button"
        onClick={() => set(value)}
        className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
          current === value
            ? 'border-terracotta bg-terracotta-pale text-terracotta'
            : 'border-cream-deep bg-white text-charcoal hover:border-terracotta/40'
        }`}
      >
        {label}
      </button>
    );
  }

  // ─── Submit ───────────────────────────────────────────────────────────────

  function handleSubmit() {
    setLoading(true);
    const data = {
      rentalType,
      budgetMin, budgetMax, currency,
      neighborhoods,
      bedrooms, furnished, pets, moveIn,
      notes,
    };
    sessionStorage.setItem('nido_search', JSON.stringify(data));
    router.push(`/${locale}/results`);
  }

  // ─── Step content ─────────────────────────────────────────────────────────

  const stepContent = [

    // ── Step 1 — Rental type (unchanged) ────────────────────────────────────
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

    // ── Step 2 — Budget & neighborhoods ─────────────────────────────────────
    <div key="step2" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-charcoal mb-1" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
          Budget & Location
        </h2>
        <p className="text-charcoal-muted text-sm">{t('step', { current: 2, total: TOTAL_STEPS })}</p>
      </div>

      {/* Budget min / max */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-charcoal">Monthly budget</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={budgetMin}
            onChange={(e) => setBudgetMin(e.target.value)}
            placeholder="Min"
            className="input-base flex-1"
            min={0}
          />
          <span className="text-charcoal-muted text-sm font-medium shrink-0">to</span>
          <input
            type="number"
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
            placeholder="Max"
            className="input-base flex-1"
            min={0}
          />
          {/* Currency toggle */}
          <div className="flex rounded-xl border border-cream-deep overflow-hidden shrink-0">
            {(['MXN', 'USD'] as Currency[]).map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => setCurrency(cur)}
                className={`px-3 py-3 text-sm font-semibold transition-colors ${
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

      {/* Neighborhood multi-select */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-charcoal">
          Neighborhoods
          <span className="ml-2 text-xs text-charcoal-muted font-normal">select all that interest you</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {NEIGHBORHOODS.map((name) => {
            const selected = neighborhoods.includes(name);
            return (
              <button
                key={name}
                type="button"
                onClick={() => toggleNeighborhood(name)}
                className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                  selected
                    ? 'border-terracotta bg-terracotta-pale text-terracotta'
                    : 'border-cream-deep bg-white text-charcoal hover:border-terracotta/40'
                }`}
              >
                {selected && <span className="mr-1.5">✓</span>}
                {name}
              </button>
            );
          })}
        </div>
        {neighborhoods.length === 0 && (
          <p className="text-xs text-charcoal-muted">No preference selected — we&apos;ll search all areas.</p>
        )}
      </div>
    </div>,

    // ── Step 3 — Bedrooms, furnished, pets, move-in ──────────────────────────
    <div key="step3" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-charcoal mb-1" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
          Your preferences
        </h2>
        <p className="text-charcoal-muted text-sm">{t('step', { current: 3, total: TOTAL_STEPS })}</p>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-charcoal">Bedrooms</label>
        <div className="flex gap-2">
          {BEDROOMS.map((b) => (
            <button
              key={b.value}
              type="button"
              onClick={() => setBedrooms(b.value)}
              className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                bedrooms === b.value
                  ? 'border-terracotta bg-terracotta-pale text-terracotta'
                  : 'border-cream-deep bg-white text-charcoal hover:border-terracotta/40'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Furnished */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-charcoal">Furnished?</label>
        <div className="flex gap-2">
          {triButton('yes',    furnished, setFurnished, 'Yes')}
          {triButton('no',     furnished, setFurnished, 'No')}
          {triButton('either', furnished, setFurnished, 'Either')}
        </div>
      </div>

      {/* Pets */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-charcoal">Pets allowed?</label>
        <div className="flex gap-2">
          {triButton('yes',    pets, setPets, 'Yes')}
          {triButton('no',     pets, setPets, 'No')}
          {triButton('either', pets, setPets, 'Either')}
        </div>
      </div>

      {/* Move-in date */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-charcoal">Move-in date</label>
        <input
          type="date"
          value={moveIn}
          onChange={(e) => setMoveIn(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="input-base"
        />
      </div>
    </div>,

    // ── Step 4 — Notes + submit ──────────────────────────────────────────────
    <div key="step4" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-charcoal mb-1" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
          Anything else?
        </h2>
        <p className="text-charcoal-muted text-sm">{t('step', { current: 4, total: TOTAL_STEPS })}</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-charcoal">
          Additional notes
          <span className="ml-2 text-xs text-charcoal-muted font-normal">optional</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="E.g. I need a home office, prefer a quiet street, ground floor is fine, open to new buildings…"
          rows={5}
          className="input-base resize-none"
        />
      </div>

      {/* AI search note */}
      <div className="flex items-start gap-3 p-4 bg-sage-light rounded-xl text-sm text-sage-dark">
        <span className="text-xl">✨</span>
        <p>{t('searchNote')}</p>
      </div>
    </div>,
  ];

  // ─── Render ───────────────────────────────────────────────────────────────

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
      <div className="min-h-[300px]">{stepContent[step - 1]}</div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-cream-deep">
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 1}
          className="btn-ghost gap-2 disabled:opacity-0 disabled:pointer-events-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="btn-primary gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Button loading={loading} onClick={handleSubmit} size="lg" className="gap-2 px-8">
            <Home className="w-4 h-4" />
            Find My Home
          </Button>
        )}
      </div>
    </div>
  );
}
