'use client';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ReactNode;
}

export default function Checkbox({ label, checked, onChange, icon }: CheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 ${
        checked
          ? 'bg-terracotta-pale border-terracotta text-terracotta'
          : 'bg-white border-cream-deep text-charcoal-soft hover:border-terracotta/40 hover:bg-terracotta-pale/50'
      }`}
    >
      {icon && <span className="text-base leading-none">{icon}</span>}
      <span>{label}</span>
      {checked && (
        <span className="ml-auto w-4 h-4 rounded-full bg-terracotta flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </button>
  );
}
