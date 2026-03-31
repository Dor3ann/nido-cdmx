import Link from 'next/link';
import { useLocale } from 'next-intl';

interface NidoLogoProps {
  className?: string;
}

export default function NidoLogo({ className = '' }: NidoLogoProps) {
  const locale = useLocale();

  return (
    <Link href={`/${locale}`} className={`flex items-center gap-2 group ${className}`}>
      {/* Nest icon — stylized rooftop/nest shape */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Rooftop arch */}
        <path
          d="M4 18 C4 10 28 10 28 18"
          stroke="#C4622D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Nest base curves */}
        <path
          d="M7 20 C7 24 25 24 25 20"
          stroke="#C4622D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M9 22 C9 26 23 26 23 22"
          stroke="#C4622D"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        {/* Dot — egg / center */}
        <circle cx="16" cy="17" r="2.5" fill="#C4622D" />
      </svg>

      {/* Wordmark */}
      <span
        className="text-xl font-bold tracking-tight text-charcoal group-hover:text-terracotta transition-colors"
        style={{ fontFamily: 'var(--font-plus-jakarta), var(--font-inter), sans-serif' }}
      >
        Nid<span className="text-terracotta">ō</span>
      </span>
    </Link>
  );
}
