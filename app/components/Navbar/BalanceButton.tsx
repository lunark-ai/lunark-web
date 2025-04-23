"use client"
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useUserContext } from '@/contexts';
import LoadingIcon from '../Base/LoadingIcon';
import { Wallet, Eye, EyeSolid } from 'iconoir-react';
import { baseButtonStyle } from '@/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RiEye2Line, RiEyeFill, RiEyeLine } from 'react-icons/ri';

interface BalanceButtonProps {
  showLabel?: boolean;
}

const BalanceButton: React.FC<BalanceButtonProps> = ({ showLabel }) => {
  const { user, refetchUser } = useUserContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [balance, setBalance] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    setBalance(user.balance);
  }, [user]);

  useEffect(() => {
    if (!isExpanded) return;
    setIsLoading(true);
    refetchUser().finally(() => {
      setIsLoading(false);
    });
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!showLabel && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (!showLabel) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLabel]);

  return (
    <div className="relative" ref={buttonRef}>
      <motion.div
        initial={false}
        animate={{
          width: showLabel ? '11rem' : (!isLoading && isExpanded) ? 
            (Number(balance) >= 1000 ? '10rem' : (Number(balance) >= 100 ? '9rem' : '8.375rem')) : '40px',
        }}
        transition={{ duration: 0.2 }}
        className={`${baseButtonStyle} flex items-center select-none cursor-pointer overflow-hidden rounded-full h-10 ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        onClick={() => !isLoading && !showLabel && setIsExpanded(!isExpanded)}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0 } }}
              transition={{ duration: 0.2 }}
              className="min-w-6 min-h-6 absolute left-1/2 -translate-x-1/2 -ml-[12px]"
            >
              <LoadingIcon isSmall />
            </motion.div>
          ) : (
            <Link href="/wallet" className="flex items-center">
              <Wallet 
                className={`text-[#FCFCFC] min-w-4 min-h-4 ${showLabel || isExpanded ? 'ml-3' : 'absolute left-1/2 -translate-x-1/2'}`} 
              />
            </Link>
          )}
        </AnimatePresence>
        <motion.span
          animate={{
            opacity: (!isLoading && isExpanded) || showLabel ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="whitespace-nowrap pl-2 text-[#FCFCFC]"
        >
          ${balance.toFixed(2)}
        </motion.span>
        {(!isLoading && isExpanded) || showLabel ? (
          <motion.div 
            className="ml-auto flex items-center justify-center h-7 w-7 mr-1 cursor-pointer border border-[#FCFCFC]/20 bg-[#FCFCFC]/20 rounded-full transition-colors duration-200 hover:bg-[#FCFCFC]/40"
            animate={{
              opacity: (!isLoading && isExpanded) || showLabel ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              router.push('/wallet');
            }}
          >
            <div className="rounded-full flex items-center h-4 w-4 justify-center">
              <RiEyeLine className="text-[#FCFCFC] h-4 w-4" />
            </div>
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  );
}

export default BalanceButton;