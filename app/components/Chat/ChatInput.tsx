"use client"
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, KeyboardEvent, useEffect, useState } from 'react';
import LoadingIcon from '../Base/LoadingIcon';
import { Pause } from 'iconoir-react';
import { useGlobalContext, useUserContext, useSocketContext } from '@/contexts';
import toast from 'react-hot-toast';
import { ComponentType, SVGAttributes } from 'react';

interface ChatInputProps {
  onSubmit?: (value: string) => void;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  icon?: ComponentType<SVGAttributes<SVGElement>>;
  iconPosition?: 'left' | 'right';
  showSubmitButton?: boolean;
  submitIcon?: ComponentType<SVGAttributes<SVGElement>>;
  className?: string;
  loading?: boolean;
  isStreaming?: boolean;
  onStreamControl?: () => void;
  maxRows?: number;
  chatId?: string;
}

const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(({
  onSubmit,
  value,
  onChange,
  disabled,
  placeholder = "Type here...",
  icon,
  iconPosition = 'left',
  showSubmitButton = false,
  submitIcon: SubmitIcon,
  className = "",
  loading = false,
  isStreaming = false,
  onStreamControl,
  maxRows = 5,
  chatId
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [lineCount, setLineCount] = useState(1);
  const [smoothLineCount, setSmoothLineCount] = useState(1);
  const Icon = icon;
  const isDisabledButton = (disabled && !isStreaming) || loading;
  const isDisabled = disabled || isStreaming || loading;
  const { user } = useUserContext();
  const { status, fetchStatus } = useGlobalContext();
  const { socket, joinChat } = useSocketContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSmoothLineCount(lineCount);
    }, 50);
    return () => clearTimeout(timer);
  }, [lineCount]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) return;
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      const trimmedValue = value.trim();
      onChange(trimmedValue);
      
      if (ref && 'current' in ref && ref.current) {
        if (!trimmedValue) {
          ref.current.style.height = '24px';
          setLineCount(1);
        } else {
          requestAnimationFrame(() => {
            if (ref && 'current' in ref && ref.current) {
              ref.current.style.height = 'auto';
              const newHeight = Math.min(ref.current.scrollHeight, (maxRows + 1) * 24);
              ref.current.style.height = `${newHeight}px`;
              setLineCount(Math.min(Math.floor(newHeight / 24), maxRows));
            }
          });
        }
      }
      e.currentTarget.blur();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetchStatus();
      
      if (!user || !status) {
        return;
      }

      if (!(user?.termsSignature)) {
        toast.error('You must accept the terms and conditions to use Lunark AI.');
        return;
      }
      
      if (isStreaming && onStreamControl) {
        e.stopPropagation();
        onStreamControl();
        return;
      }

      if (chatId && socket) {
        joinChat(chatId);
      }
      
      if (value.trim() && !disabled && onSubmit) {
        onSubmit(value);
      }
    } catch (error) {
      toast.error('Failed to verify connection status.');
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    
    if (isStreaming) {
      textarea.style.height = '24px';
      setLineCount(1);
    } else {
      const newHeight = Math.min(textarea.scrollHeight, (maxRows + 1) * 24);
      textarea.style.height = `${newHeight}px`;
      setLineCount(Math.min(Math.floor(newHeight / 24), maxRows));
    }
    
    onChange(e.target.value);
  };

  useEffect(() => {
    if ((loading || isStreaming) && ref && 'current' in ref && ref.current) {
      ref.current.style.height = '24px';
      setLineCount(1);
    }
  }, [isStreaming, loading, ref]);

  return (
    <form onSubmit={handleSubmit} className={`w-full mx-auto transition-[border-radius] duration-500 ease-out ${smoothLineCount > 1 ? 'rounded-2xl' : 'rounded-[48px]'} ${className}`}>
      <div className="relative">
        <div className={`flex items-center w-full p-3 md:p-4 transition-[border-radius] duration-500 ease-out ${smoothLineCount > 1 ? 'rounded-2xl' : 'rounded-[48px]'} border border-[#888]/30
          bg-[radial-gradient(70%_70%_at_center,rgba(8,10,12,0.98)_0%,rgba(160,165,180,0.25)_100%)]
          backdrop-blur-sm
          shadow-[0_0_10px_rgba(0,0,0,0.2),inset_0_0_20px_4px_rgba(0,0,0,0.3)]
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 
            `hover:border-[#aaa]/50 hover:transition-[border,shadow] hover:duration-300
              hover:shadow-[0_0_15px_rgba(0,0,0,0.3),inset_0_0_25px_6px_rgba(0,0,0,0.3)]
              ${isFocused ? 
                '!border-[#aaa]/40 shadow-[0_0_20px_rgba(0,0,0,0.4),inset_0_0_30px_8px_rgba(0,0,0,0.3)]' : ''
              }`
          }
          ${Icon && iconPosition === 'left' ? 'pl-12' : ''}`}
        >
          <textarea
            ref={ref}
            value={value}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isDisabled}
            rows={1}
            className={`w-full text-sm sm:text-base outline-0 px-1 resize-none bg-transparent leading-6 text-[#FCFCFC]/90 placeholder:text-[#FCFCFC]/60 ${(showSubmitButton || (Icon && iconPosition === 'right')) ? 'pr-12' : ''}`}
            style={{ minHeight: '24px', maxHeight: `${maxRows * 24}px` }}
            placeholder={placeholder}
          />
        </div>

        {Icon && (
          <div className={`absolute top-4 ${iconPosition === 'left' ? 'left-4' : 'right-4'}`}>
            <Icon className="w-5 h-5 text-[#4F6263]" />
          </div>
        )}
        
        {showSubmitButton && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <button
              type="submit"
              disabled={isDisabledButton}
              className={`p-2 rounded-full transition duration-200 border border-transparent
                ${isDisabledButton ? 'cursor-not-allowed' : 'hover:bg-[#FCFCFC]/10 hover:border-[#FCFCFC]/25'}`}
            >
              <AnimatePresence mode="wait">
                {isStreaming ? (
                  <motion.div
                    key="stop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Pause className={`w-5 h-5 ${isDisabledButton ? 'text-[#4F6263]' : 'text-[#FCFCFC]/90'}`} />
                  </motion.div>
                ) : loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='-mt-[3px]'
                  >
                    <LoadingIcon isSmall />
                  </motion.div>
                ) : (
                  <motion.div
                    key="submit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {SubmitIcon && <SubmitIcon className={`w-5 h-5 ${isDisabledButton ? 'text-[#FCFCFC]/40' : 'text-[#FCFCFC]/90'}`} />}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        )}
      </div>
    </form>
  );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;