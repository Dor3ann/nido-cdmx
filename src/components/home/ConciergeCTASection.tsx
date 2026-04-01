import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Shield, Clock, MessageCircle } from 'lucide-react';

const NIGHT_PHOTO = 'https://picsum.photos/seed/nightcity/1600/900';

const perks = [
  { icon: MessageCircle, text: 'We contact landlords in Spanish for you' },
  { icon: Clock, text: 'Schedule viewings around your availability' },
  { icon: Shield, text: 'Expert lease negotiation & support' },
];

export default function ConciergeCTASection() {
  const locale = useLocale();

  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      {/* Background street-night photo */}
      <Image
        src={NIGHT_PHOTO}
        alt="Mexico City street at night"
        fill
        unoptimized
        className="object-cover opacity-25"
        sizes="100vw"
      />

      {/* Semi-transparent dark overlay — keeps text fully readable */}
      <div className="absolute inset-0 bg-charcoal/75" />

      {/* Extra decorative glows on top */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-terracotta/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-sage/10 blur-3xl translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-terracotta mb-4">
              Relocation Concierge
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-cream leading-tight mb-6"
              style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
            >
              Don&apos;t speak Spanish?{' '}
              <span className="text-terracotta">We&apos;ve got you.</span>
            </h2>
            <p className="text-cream/60 text-lg leading-relaxed mb-8">
              Our bilingual concierge team handles everything from first contact to signed lease —
              so you can focus on falling in love with CDMX.
            </p>

            <div className="space-y-4 mb-10">
              {perks.map((perk) => {
                const Icon = perk.icon;
                return (
                  <div key={perk.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-terracotta/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-terracotta" />
                    </div>
                    <span className="text-sm text-cream/80">{perk.text}</span>
                  </div>
                );
              })}
            </div>

            <Link
              href={`/${locale}/concierge`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-terracotta text-white font-semibold text-base hover:bg-terracotta-light transition-colors shadow-lg shadow-terracotta/20"
            >
              Learn About Concierge
            </Link>
          </div>

          {/* Stats panel */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '5 sites', label: 'Searched simultaneously' },
              { value: '~30s', label: 'Average search time' },
              { value: 'Bilingual', label: 'English & Spanish results' },
              { value: 'Free', label: 'AI search, always' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p
                  className="text-3xl font-bold text-terracotta mb-1"
                  style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-cream/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
