import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { baseButtonStyle, baseContainerStyle } from '@/constants';
import { ArrowLeft, ArrowRight, Copy, ThumbsUp, ThumbsDown } from 'iconoir-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { processText } from '../Message/ProcessText';

const images = [
  {
    lowRes: '/images/onboarding/welcome-low.webp',
    highRes: '/images/onboarding/welcome.webp',
    width: 1080,
    height: 608,
    alt: 'Welcome'
  },
  {
    lowRes: '/images/onboarding/sign-in-low.webp',
    highRes: '/images/onboarding/sign-in.webp',
    width: 1080,
    height: 608,
    alt: 'Sign in'
  },
  {
    lowRes: '/images/onboarding/payment-low.webp',
    highRes: '/images/onboarding/payment.webp',
    width: 1080,
    height: 608,
    alt: 'Payment'
  }
];

interface OnboardingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const StepContent = dynamic(() => Promise.resolve(({ step }: { step: number }) => {
  const [shouldLoadHigh, setShouldLoadHigh] = useState(false);
  const [isHighLoaded, setIsHighLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadHigh(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleHighLoad = () => {
    setIsHighLoaded(true);
  };

  switch (step) {
    case 0:
      return (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="w-full relative aspect-video">
            <Image 
              src={images[0].lowRes}
              alt={images[0].alt}
              width={images[0].width}
              height={images[0].height}
              className={`rounded-lg object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-300 ${isHighLoaded ? 'opacity-0' : 'opacity-100'}`}
              priority
            />
            {shouldLoadHigh && (
              <Image 
                src={images[0].highRes}
                alt={images[0].alt}
                width={images[0].width}
                height={images[0].height}
                className={`rounded-lg object-cover w-full h-full transition-opacity duration-300 ${isHighLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoadingComplete={handleHighLoad}
              />
            )}
          </div>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="w-full relative aspect-video">
            <Image 
              src={images[1].lowRes}
              alt={images[1].alt}
              width={images[1].width}
              height={images[1].height}
              className={`rounded-lg object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-300 ${isHighLoaded ? 'opacity-0' : 'opacity-100'}`}
              priority
            />
            {shouldLoadHigh && (
              <Image 
                src={images[1].highRes}
                alt={images[1].alt}
                width={images[1].width}
                height={images[1].height}
                className={`rounded-lg object-cover w-full h-full transition-opacity duration-300 ${isHighLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoadingComplete={handleHighLoad}
              />
            )}
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="w-full relative aspect-video">
            <Image 
              src={images[2].lowRes}
              alt={images[2].alt}
              width={images[2].width}
              height={images[2].height}
              className={`rounded-lg object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-300 ${isHighLoaded ? 'opacity-0' : 'opacity-100'}`}
              priority
            />
            {shouldLoadHigh && (
              <Image 
                src={images[2].highRes}
                alt={images[2].alt}
                width={images[2].width}
                height={images[2].height}
                className={`rounded-lg object-cover w-full h-full transition-opacity duration-300 ${isHighLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoadingComplete={handleHighLoad}
              />
            )}
          </div>
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className={`w-full aspect-video rounded-lg p-4 bg-black/50`}>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-3 flex-row-reverse w-full">
                <div className="flex flex-col gap-2 w-full items-end">
                  <div className={`group max-w-[95%] w-fit p-4 ${baseContainerStyle}  rounded-xl shadow-sm break-words relative`}>
                    <div className="text-[#FCFCFC] text-end">How much ETH do I have?</div>
                    <div className="absolute right-2 -bottom-6">
                      <div className={`${baseContainerStyle} flex items-center gap-1 px-1 py-1 rounded-lg`}>
                        <button className={`${baseButtonStyle} rounded-md flex justify-center items-center gap-1 h-[20px] w-[60px] text-sky-600 hover:text-sky-500`}>
                          <Copy className="w-3 h-3" />
                          <span className="text-[12px]">Copy</span>
                        </button>
                        <button className={`${baseButtonStyle} rounded-md flex justify-center items-center gap-2 h-[20px] w-[20px] text-green-600 hover:text-green-500`}>
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button className={`${baseButtonStyle} rounded-md flex justify-center items-center gap-2 h-[20px] w-[20px] text-rose-600 hover:text-rose-500`}>
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-[#4F6263] mt-6 mx-3 text-right">
                    User - Just now
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 flex-row w-full">
                <div className="flex flex-col gap-2 w-full items-start">
                  <div className={`group max-w-[95%] w-fit p-4 ${baseContainerStyle} rounded-xl shadow-sm break-words relative`}>
                    <div className="text-[#FCFCFC] text-start">
                      Your balance is {processText('1.245 ETH')}
                    </div>
                    <div className="absolute left-2 -bottom-6">
                      <div className={`${baseContainerStyle} flex items-center gap-1 px-1 py-1 rounded-lg`}>
                        <button className={`${baseButtonStyle} rounded-md flex justify-center items-center gap-1 h-[20px] w-[60px] text-sky-600 hover:text-sky-500`}>
                          <Copy className="w-3 h-3" />
                          <span className="text-[12px]">Copy</span>
                        </button>
                        <button className={`${baseButtonStyle} rounded-md flex justify-center items-center gap-2 h-[20px] w-[20px] text-green-600 hover:text-green-500`}>
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button className={`${baseButtonStyle} rounded-md flex justify-center items-center gap-2 h-[20px] w-[20px] text-rose-600 hover:text-rose-500`}>
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-[#4F6263] mt-6 mx-3 text-left">
                    Lunark - Just now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}), { ssr: false });

const OnboardingPopup = ({ isOpen, onClose }: OnboardingPopupProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [countdown, setCountdown] = useState(1);
  const [showNextButton, setShowNextButton] = useState(false);
  const [viewedSteps, setViewedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (currentStep < steps.length) {
      setShowNextButton(false);
      
      if (viewedSteps.includes(currentStep)) {
        setShowNextButton(true);
        return;
      }

      setCountdown(1);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowNextButton(true);
            setViewedSteps(prev => [...prev, currentStep]);
            return 0;
          }
          return prev - 1;
        });
      }, 500);

      return () => clearInterval(timer);
    }
  }, [currentStep, viewedSteps]);

  const steps = [
    {
      title: "Welcome to Lunark AI",
      description: "Your intelligent companion for blockchain exploration. We provide personalized assistance and expert guidance throughout your journey."
    },
    {
      title: "Sign in to your account",
      description: "To start using Lunark AI, please connect your account using your wallet, email, or social media. Choose your preferred authentication method to begin."
    },
    {
      title: "Buy Credits",
      description: "Purchase platform credits using cryptocurrency, making it simple and fast. These credits enable you to chat and interact with Lunark AI for blockchain interaction and guidance."
    },
    {
      title: "Start Chatting",
      description: "Begin your journey with Lunark AI. Ask questions, get insights, and receive expert guidance about blockchain technology and cryptocurrency."
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('hasCompletedOnboarding', 'true');
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15, delay: 0.1 }}
            className={`${baseContainerStyle} rounded-xl max-w-xl w-full flex flex-col max-h-[90vh] min-h-[500px] sm:h-[600px] overflow-y-auto`}
          >
            <div className="p-6 flex flex-col flex-1">
              <div className="flex-1 flex flex-col items-center text-center justify-start">
                <motion.div
                  key={currentStep}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="mb-6 w-full"
                >
                  <StepContent step={currentStep} />
                </motion.div>
                <div className="flex flex-grow flex-col justify-center items-center gap-2">
                    <motion.h3
                    key={`title-${currentStep}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl font-medium mb-2 text-[#FCFCFC]"
                    >
                    {steps[currentStep].title}
                    </motion.h3>
                    <motion.p
                    key={`desc-${currentStep}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-[#5e8284]"
                    >
                    {steps[currentStep].description}
                    </motion.p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 w-full mt-8">
                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep ? 'bg-[rgba(255,255,255,0.8)]' : 'bg-[#888]/30'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between w-full gap-4">
                  <div className="flex-1 w-full sm:w-[180px]">
                    <div className="w-full sm:w-[100px]">
                      {currentStep > 0 && (
                        <button
                          onClick={handleBack}
                          className={`${baseButtonStyle} w-full sm:w-auto px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2`}
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 w-full sm:w-[180px]">
                    <div className="w-full sm:min-w-[100px] flex justify-center sm:justify-end">
                      <button
                        onClick={handleNext}
                        className={`${baseButtonStyle} w-full sm:w-auto !transition-all ${showNextButton ? 'opacity-100 scale-100' : 'scale-90 opacity-0 pointer-events-none'} px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 relative`}
                      >
                        {viewedSteps.includes(currentStep + 1) ? (
                          <div className="flex items-center gap-2">
                            {currentStep === steps.length - 1 ? (
                              <>
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                              </>
                            ) : (
                              <>
                                Next
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </div>
                        ) : (
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentStep === steps.length - 1 ? 'get-started' : 'next'}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              {currentStep === steps.length - 1 ? (
                                <>
                                  Get Started
                                  <ArrowRight className="w-4 h-4" />
                                </>
                              ) : (
                                <>
                                  Next
                                  <ArrowRight className="w-4 h-4" />
                                </>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingPopup; 