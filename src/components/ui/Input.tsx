'use client';

import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-charcoal">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`input-base ${error ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : ''} ${className}`}
          {...props}
        />
        {hint && !error && <p className="text-xs text-charcoal-muted">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
