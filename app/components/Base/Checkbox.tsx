"use client"

import { Check } from "iconoir-react";

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Checkbox({ checked, onChange, className = '' }: CheckboxProps) {
  return (
    <div className="relative inline-block w-5 h-5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`absolute inset-0 w-5 h-5 shadow-sm rounded appearance-none border border-emerald-500 bg-emerald-800/50 cursor-pointer checked:bg-emerald-600 checked:border-bg-emerald-600 ${className}`}
      />
      {checked && (
        <Check className="absolute pointer-events-none text-[#FCFCFC] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5" />
      )}
    </div>
  );
}