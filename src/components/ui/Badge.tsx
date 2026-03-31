interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'terracotta' | 'sage' | 'cream' | 'dark';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-cream text-charcoal-soft border border-cream-deep',
    terracotta: 'bg-terracotta-pale text-terracotta border border-terracotta/20',
    sage: 'bg-sage-light text-sage-dark border border-sage/20',
    cream: 'bg-cream-warm text-charcoal-soft',
    dark: 'bg-charcoal text-white',
  };

  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
