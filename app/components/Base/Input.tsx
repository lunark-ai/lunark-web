"use client"
import { forwardRef } from 'react';
import LoadingIcon from './LoadingIcon';
import { IconoirProvider } from 'iconoir-react';
import { ComponentType, SVGAttributes } from 'react';

interface InputProps {
  onSubmit?: (value: string) => void;
  icon?: ComponentType<SVGAttributes<SVGElement>>;
  iconPosition?: 'left' | 'right';
  showSubmitButton?: boolean;
  submitIcon?: ComponentType<SVGAttributes<SVGElement>>;
  loading?: boolean;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  onSubmit,
  icon,
  iconPosition = 'left',
  showSubmitButton = false,
  submitIcon: SubmitIcon,
  className = "",
  loading = false,
  disabled,
  onChange,
  value,
  ...inputProps
}, ref) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value && !disabled && onSubmit) {
      onSubmit(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const Icon = icon;
  const isDisabled = disabled || loading;

  return (
    <form onSubmit={handleSubmit} className={`w-full mx-auto ${className}`}>
      <div className="relative">
        <div className={`flex items-center w-full p-3 md:p-4 rounded-full border border-[#888]/30
          bg-[radial-gradient(70%_70%_at_center,rgba(8,10,12,0.98)_0%,rgba(160,165,180,0.25)_100%)]
          backdrop-blur-sm
          transition-all duration-400 ease-in-out
          shadow-[0_0_10px_rgba(0,0,0,0.2),inset_0_0_20px_4px_rgba(0,0,0,0.3)]
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 
            `hover:border-[#aaa]/50
             hover:shadow-[0_0_15px_rgba(0,0,0,0.3),inset_0_0_25px_6px_rgba(0,0,0,0.3)]`}
          ${icon && iconPosition === 'left' ? 'pl-8' : ''}`}
        >
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={handleChange}
            disabled={isDisabled}
            className={`w-full outline-0 px-1 bg-transparent text-[#FCFCFC]/90 placeholder:text-[#FCFCFC]/60
              ${(showSubmitButton || (icon && iconPosition === 'left')) ? 'pl-8' : ''}`}
            {...inputProps}
          />
        </div>

        {Icon && (
          <div className={`absolute top-1/2 -translate-y-1/2 ${iconPosition === 'left' ? 'left-4' : 'right-4'}`}>
            <Icon className="w-5 h-5 text-[#FCFCFC]/60" />
          </div>
        )}
        
        {showSubmitButton && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <button
              type="submit"
              disabled={isDisabled}
              className={`p-2 rounded-full transition duration-200 border border-transparent
                ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-[#FCFCFC]/10 hover:border-[#FCFCFC]/25'}`}
            >
              {loading ? 
                <LoadingIcon /> : 
                SubmitIcon && <SubmitIcon className={`w-5 h-5 ${isDisabled ? 'text-[#FCFCFC]/40' : 'text-[#FCFCFC]/90'}`} />
              }
            </button>
          </div>
        )}
      </div>
    </form>
  );
});

Input.displayName = 'Input';

export default Input;