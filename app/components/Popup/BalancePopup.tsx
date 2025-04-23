"use client";
import { balanceOptions, baseButtonStyle, baseContainerStyle } from '@/constants';
import { motion, AnimatePresence } from 'framer-motion';
import Checkbox from '../Base/Checkbox';
import LoadingIcon from '../Base/LoadingIcon';
import { useState } from 'react';
import Popup from './Popup';
import { Brain } from 'iconoir-react';

interface BalancePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (amount: number) => void;
  loading: boolean;
}

const BalancePopup: React.FC<BalancePopupProps> = ({ isOpen, onClose, onSelect, loading }) => {
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tempSelectedPrice, setTempSelectedPrice] = useState<number | null>(null);

  const handleSelect = (price: number) => {
    if (!loading) {
      setTempSelectedPrice(price);
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    if (tempSelectedPrice !== null) {
      setSelectedPrice(tempSelectedPrice);
      onSelect(tempSelectedPrice);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-6"
            onClick={loading ? undefined : onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${baseContainerStyle} rounded-xl max-w-xl w-full flex flex-col`}
              onClick={e => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-[#888]/30">
                <h2 className="text-xl font-medium text-[#FCFCFC]">Add Balance</h2>
                <p className="text-sm text-[#5e8284] mt-1">Select a package and add balance to use Lunark AI</p>
              </div>
              <div className="p-6">
                <div className="flex flex-row items-center justify-between gap-4">
                  {balanceOptions.map((option, index) => {
                    const isSelected = loading && selectedPrice === option.price;
                    return (
                      <motion.button
                        key={option.price}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.2,
                          scale: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.15 },
                          delay: index * 0.1 
                        }}
                        onClick={() => handleSelect(option.price)}
                        disabled={loading}
                        className={`${baseButtonStyle} select-none flex sm:flex-row flex-col gap-2 sm:gap-4 items-center w-1/4 justify-center p-3
                          ${option.isRecommended ? 'border-orange-500' : ''} 
                          ${loading && !isSelected ? '!opacity-25' : ''} 
                          rounded-xl`}
                      >
                        {!isSelected && (
                          <div className="bg-[rgba(255,255,255,0.1)] rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center">
                            <Brain className={`text-[#FCFCFC] ${
                              index === 0 ? 'h-[12px] w-[12px]' : 
                              index === 1 ? 'h-[16px] w-[16px]' : 
                              index === 2 ? 'h-[19px] w-[19px]' : 
                              'h-[21px] w-[21px]'
                            }`} />
                          </div>
                        )}
                        {isSelected && (
                          <div className="rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center">
                            <LoadingIcon isSmall />
                          </div>
                        )}
                        {!isSelected && (
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-[#FCFCFC]">${option.price}</span>
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                <div className="flex flex-col gap-4 mt-6">
                  <motion.p 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ 
                      duration: 0.2,
                      scale: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.15 },
                      delay: 0.4 
                    }} 
                    className="text-sm text-[#5e8284]"
                  >
                    We recommend starting with the smallest package for new users to explore the platform before deciding to add more balance. Credits are non-refundable. Service availability depends on system status.
                  </motion.p>
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      transition={{ 
                        duration: 0.2,
                        scale: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.15 },
                        delay: 0.6 
                      }} 
                    >
                      <Checkbox checked={true} onChange={() => {}} />
                    </motion.div>
                    <motion.p 
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      transition={{ 
                        duration: 0.2,
                        scale: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.15 },
                        delay: 0.5 
                      }} 
                      className="text-sm text-[#5e8284]"
                    >
                      By adding balance, you acknowledge and agree to Lunark AI's <a href="/terms" target="_blank" className="text-blue-400 hover:underline">Terms of Service</a> and <a href="/privacy" target="_blank" className="text-blue-400 hover:underline">Privacy Policy</a>.  
                    </motion.p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-[#888]/30">
                <div className="flex justify-end">
                  <button 
                    onClick={loading ? undefined : onClose}
                    disabled={loading}
                    className={`${baseButtonStyle} flex items-center select-none px-4 py-2 text-[#FCFCFC] rounded-full text-sm 
                      ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Popup
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        title="Confirm Purchase"
        message={`Are you sure you want to add $${tempSelectedPrice} to your balance?`}
        confirmText="Yes, Continue"
        cancelText="Cancel"
        type="info"
      />
    </>
  );
};

export default BalancePopup;