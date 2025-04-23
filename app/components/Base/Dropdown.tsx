"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { baseButtonStyle } from '@/constants';
import { NavArrowDown } from 'iconoir-react';

interface DropdownProps {
  value: string;
  options: { value: string; label: string; disabled?: boolean }[];
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ value, options, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${baseButtonStyle} w-full text-sm flex items-center justify-between gap-2 px-4 py-2 rounded-full`}
      >
        <span className="text-[#FCFCFC]">{selectedOption?.label}</span>
        <NavArrowDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`${baseButtonStyle} !duration-0 rounded-xl absolute z-[100] top-full left-0 mt-2 w-full`}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.25))'
            }}
          >
            <div className={`overflow-hidden rounded-xl w-full max-h-48 overflow-y-auto bg-[#1A1A1A50] border border-[#2A2A2A]`}>
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    if (!option.disabled) {
                      onChange(option.value);
                      setIsOpen(false);
                    }
                  }}
                  disabled={option.disabled}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-[rgba(255,255,255,0.1)] transition-colors ${
                    option.value === value ? 'bg-[rgba(255,255,255,0.1)]' : ''
                  } ${option.disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent text-[#5e8284]' : ''}`}
                >
                  <span className="text-[#FCFCFC]">{option.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown; 