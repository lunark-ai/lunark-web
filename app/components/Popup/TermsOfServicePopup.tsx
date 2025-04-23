"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Checkbox from '../Base/Checkbox';
import { useGlobalContext, useUserContext } from '@/contexts';
import { createAxiosInstance } from '@/lib/axios';
import { usePathname } from 'next/navigation';
import { Check } from 'iconoir-react';
import { baseButtonStyle, baseContainerStyle } from '@/constants';

interface Props {
  onAccept?: () => void;
}

const TermsOfServicePopup: React.FC<Props> = ({ onAccept }) => {
  const pathname = usePathname();
  const { ethersSigner } = useGlobalContext();
  const { user, setUser } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (pathname === '/terms' || pathname === '/privacy') return;
    
    if (user?.termsSignature) {
      setIsOpen(false);
      setHasAccepted(true);
    } else {
      setIsOpen(true);
      setHasAccepted(false);
    }
  }, [user]);

  const handleAccept = async () => {
    if (!ethersSigner) return;

    const message = "I hereby acknowledge and accept Lunark AI's Terms of Service and Privacy Policy. I understand that I am bound by these agreements to use the platform.";
    const signature = await ethersSigner.signMessage(message);
    
    try {
      const response = await createAxiosInstance().post('/user/terms', {
        address: await ethersSigner.getAddress(),
        signature 
      });
      setUser(response.data);
      setIsOpen(false);
      onAccept?.();
    } catch (error) {
      console.error('Failed to update terms:', error);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`${baseContainerStyle} rounded-xl max-w-xl w-full max-h-[70vh] flex flex-col`}
          >
            <div className="px-6 py-3 border-b border-[#888]/30">
              <h2 className="text-xl font-medium text-[#FCFCFC]">Terms of Services</h2>
            </div>
            <div className="p-6 overflow-y-auto w-full">
              <div className="space-y-4 text-gray-300">
                <p>
                  To use Lunark AI's services, you must accept our <a href="/terms" target="_blank" className="text-blue-400 hover:text-blue-300 hover:underline">Terms of Service</a> and <a href="/privacy" target="_blank" className="text-blue-400 hover:text-blue-300 hover:underline">Privacy Policy</a>. These agreements establish the framework for our relationship and detail how our platform operates. They comprehensively outline your rights and responsibilities, data handling practices, service limitations, and usage guidelines.
                </p>
              </div>
            </div>
            <div className="px-6 py-3 border-t border-[#888]/30 w-full">
              <div className="flex flex-col sm:flex-row gap-4 justify-end sm:justify-between items-center w-full">
                <label className="flex items-start gap-2 text-sm cursor-pointer text-gray-300">
                  <div className='mt-2 mr-2'>
                    <Checkbox
                      checked={hasAccepted}
                      onChange={(e) => setHasAccepted(e.target.checked)}
                    />
                  </div>
                  <span className='select-none'>
                    I acknowledge that I have read and agree to the <a href="/terms" target="_blank" className="text-blue-400 hover:text-blue-300 hover:underline">Terms of Service</a> and <a href="/privacy" target="_blank" className="text-blue-400 hover:text-blue-300 hover:underline">Privacy Policy</a>.
                  </span>
                </label>
                <button
                  onClick={handleAccept}
                  disabled={!hasAccepted}
                  className={`${baseButtonStyle} select-none px-4 py-2 text-sm rounded-full sm:ms-auto text-[#FCFCFC] flex items-center gap-2 ${
                    !hasAccepted ? 'opacity-50 cursor-not-allowed hover:border-[#888]/30 hover:bg-[radial-gradient(70%_70%_at_center,rgba(8,10,12,0.98)_0%,rgba(160,165,180,0.25)_100%)]' : ''
                  }`}
                >
                  <Check />
                  <span>Accept</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TermsOfServicePopup;