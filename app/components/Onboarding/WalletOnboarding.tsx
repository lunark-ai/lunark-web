import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, NavArrowLeft } from 'iconoir-react';
import { baseButtonStyle, baseContainerStyle } from '@/constants';

interface OnboardingStep {
  id: number;
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    target: '[data-onboarding="balance"]',
    title: 'Your Balance',
    description: 'This is your current platform balance. You can use it for Lunark AI interactions.',
    position: 'bottom'
  },
  {
    id: 2,
    target: '[data-onboarding="add-balance"]',
    title: 'Add Balance',
    description: 'Click here to add more balance to your account.',
    position: 'left'
  },
  {
    id: 3,
    target: '[data-onboarding="tokens"]',
    title: 'Your Tokens',
    description: 'View your (supported) token balances on connected network.',
    position: 'right'
  },
  {
    id: 4,
    target: '[data-onboarding="usage"]',
    title: 'Usage History',
    description: 'Track your Lunark AI usage and associated costs here.',
    position: 'left'
  }
];

interface WalletOnboardingProps {
  isOpen: boolean;
  onComplete: () => void;
}

const WalletOnboarding = ({ isOpen, onComplete }: WalletOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [targetElement, setTargetElement] = useState<DOMRect | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Lock scroll when onboarding is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const updateTargetPosition = () => {
    const step = steps.find(s => s.id === currentStep);
    if (!step) return;

    const element = document.querySelector(step.target);
    if (element) {
      const rect = element.getBoundingClientRect();
      // Use transform instead of top/left for smoother animations
      setTargetElement(rect);
    }
  };

  // Handle resize and scroll with RAF for smoother updates
  useEffect(() => {
    if (!isOpen) return;

    let rafId: number;
    let lastScrollY = window.scrollY;
    let lastUpdate = 0;
    const minUpdateInterval = 16; // ~60fps

    const handleUpdate = () => {
      const now = Date.now();
      if (now - lastUpdate >= minUpdateInterval) {
        lastUpdate = now;
        updateTargetPosition();
      }
      rafId = requestAnimationFrame(handleUpdate);
    };

    // Start the animation frame loop
    rafId = requestAnimationFrame(handleUpdate);

    // Cleanup
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isOpen, currentStep]);

  // Update position when step changes
  useEffect(() => {
    if (!isOpen) return;
    
    const element = document.querySelector(steps.find(s => s.id === currentStep)?.target || '');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'center'
      });
      
      // Update position continuously during scroll animation
      let rafId: number;
      const startTime = Date.now();
      const duration = 500;

      const updateDuringScroll = () => {
        const elapsed = Date.now() - startTime;
        updateTargetPosition();
        
        if (elapsed < duration) {
          rafId = requestAnimationFrame(updateDuringScroll);
        }
      };

      rafId = requestAnimationFrame(updateDuringScroll);

      return () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };
    }
  }, [currentStep, isOpen]);

  const handleNext = () => {
    if (currentStep === steps.length) {
      setIsClosing(true);
      setTimeout(onComplete, 300);
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    setIsClosing(true);
    setTimeout(onComplete, 300);
  };

  if (!targetElement) return null;

  const currentStepData = steps.find(s => s.id === currentStep);
  if (!currentStepData) return null;

  const getPopupPosition = () => {
    const padding = 12;
    const popupWidth = 300;
    const popupHeight = 200;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let position = { top: 0, left: 0, transform: 'translate3d(0, 0, 0)' };
    const elementCenter = targetElement.top + (targetElement.height / 2);
    const isElementInUpperHalf = elementCenter < viewportHeight / 2;
    
    switch (currentStepData.position) {
      case 'top':
      case 'bottom': {
        position = isElementInUpperHalf
          ? {
              top: Math.min(viewportHeight - popupHeight - padding, targetElement.bottom + padding),
              left: targetElement.left + (targetElement.width / 2) - 150,
              transform: 'translate3d(0, 0, 0)'
            }
          : {
              top: Math.max(padding, targetElement.top - padding - 140),
              left: targetElement.left + (targetElement.width / 2) - 150,
              transform: 'translate3d(0, 0, 0)'
            };
        break;
      }
      case 'left': {
        position = {
          top: targetElement.top + (targetElement.height / 2) - 60,
          left: Math.max(padding, targetElement.left - padding - 300),
          transform: 'translate3d(0, 0, 0)'
        };
        break;
      }
      case 'right': {
        position = {
          top: targetElement.top + (targetElement.height / 2) - 60,
          left: Math.min(viewportWidth - popupWidth - padding, targetElement.right + padding),
          transform: 'translate3d(0, 0, 0)'
        };
        break;
      }
    }

    // Ensure boundaries
    position.left = Math.max(padding, Math.min(viewportWidth - popupWidth - padding, position.left));
    position.top = Math.max(padding, Math.min(viewportHeight - popupHeight - padding, position.top));

    return position;
  };

  const getArrowPosition = () => {
    const elementCenter = targetElement.top + (targetElement.height / 2);
    const isElementInUpperHalf = elementCenter < window.innerHeight / 2;

    switch (currentStepData.position) {
      case 'top':
      case 'bottom':
        return isElementInUpperHalf
          ? {
              top: -8,
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)'
            }
          : {
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)'
            };
      case 'left':
        return {
          right: -8,
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)'
        };
      case 'right':
        return {
          left: -8,
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)'
        };
    }
  };

  return (
    <AnimatePresence mode="wait">
      {(isOpen && !isClosing) && (
        <div className="fixed inset-0 z-50 w-full h-full pointer-events-none">
          {/* Backdrop blur overlay */}
          <div className="absolute inset-0 pointer-events-auto" />
          
          {/* Target element highlight */}
          {targetElement && (
            <div 
              className="absolute bg-transparent pointer-events-none"
              style={{
                top: targetElement.top - 8,
                left: targetElement.left - 8,
                width: targetElement.width + 16,
                height: targetElement.height + 16,
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.5)',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              <div 
                className="absolute inset-0 pointer-events-auto"
                style={{
                  backdropFilter: 'none',
                  WebkitBackdropFilter: 'none'
                }}
              />
            </div>
          )}
          
          <motion.div
            key={currentStep}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ 
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              ...getPopupPosition(),
              willChange: 'transform'
            }}
            className={`${baseContainerStyle} fixed w-[300px] rounded-xl p-3 pointer-events-auto`}
          >
            <motion.div 
              className={`absolute w-4 h-4 ${baseContainerStyle} border border-[#888]/30`}
              style={{
                ...getArrowPosition(),
                willChange: 'transform'
              }}
              transition={{ 
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1]
              }}
            />
            
            <div className="flex items-center justify-between mb-3 border-b border-[#888]/30 pb-3">
              <div className="flex items-center gap-2">
                {currentStep > 1 && (
                  <button 
                    onClick={handleBack}
                    className={`${baseButtonStyle} flex items-center justify-center w-7 h-7 rounded-full hover:bg-[#FCFCFC]/5`}
                  >
                    <NavArrowLeft className="w-4 h-4 text-[#FCFCFC]" />
                  </button>
                )}
                <span className="text-xs font-medium text-[#FCFCFC]/60">Step {currentStep} of {steps.length}</span>
              </div>
              <button 
                onClick={handleSkip}
                className={`${baseButtonStyle} text-xs font-medium hover:text-[#FCFCFC] px-2 py-1 rounded-md hover:bg-[#FCFCFC]/5`}
              >
                Skip
              </button>
            </div>
            
            <h3 className="text-lg font-medium text-[#FCFCFC] mb-1.5">
              {currentStepData.title}
            </h3>
            
            <p className="text-sm text-[#FCFCFC]/60 mb-4">
              {currentStepData.description}
            </p>
            
            <button
              onClick={handleNext}
              className={`${baseButtonStyle} w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-[#888]/30 hover:bg-[#FCFCFC]/5`}
            >
              {currentStep === steps.length ? 'Finish' : 'Next'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center gap-1 mt-3">
              {steps.map(step => (
                <div
                  key={step.id}
                  className={`w-6 h-0.5 rounded-full transition-colors duration-200 ${
                    step.id === currentStep 
                      ? 'bg-[#FCFCFC]/80' 
                      : step.id < currentStep 
                        ? 'bg-[#FCFCFC]/40'
                        : 'bg-[#FCFCFC]/10'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WalletOnboarding; 