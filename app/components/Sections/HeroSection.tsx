"use client"
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import ChatInput from '@/components/Chat/ChatInput';
import { SendDiagonal } from 'iconoir-react';

interface HeroSectionProps {
  inputValue: string;
  onSubmit: (value: string) => void;
  onChange: (value: string) => void;
  disabled: boolean;
  loading: boolean;
  status: boolean;
}

export default function HeroSection({ 
  inputValue, 
  onSubmit, 
  onChange, 
  disabled, 
  loading, 
  status,
}: HeroSectionProps) {
  const [showScroll, setShowScroll] = useState(true);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setShowScroll(latest < 100);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <>
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[calc(60vh)] mt-[4rem] mb-[10rem]">
            <AnimatePresence mode="wait">
                <motion.h1 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl sm:text-5xl text-center mb-3 sm:mb-6 font-dune font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#FCFCFC] via-[#FCFCFC] to-[#0F2B2500]"
                  key="title"
                >
                  Lunark AI
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="mt-4 mb-8 w-full"
                  key="chat-input"
                >
                <div className='w-[95%] md:w-[80%] mx-auto'>
                    <ChatInput 
                    onSubmit={onSubmit}
                    value={inputValue} 
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={!status ? "Lunark is sleeping..." : "How can Lunark help you today?"}
                    submitIcon={SendDiagonal}
                    showSubmitButton
                    loading={loading}
                    />
                </div>
                </motion.div>
            </AnimatePresence>
        </div>

        <div className="fixed bottom-8 w-full max-w-3xl left-1/2 -translate-x-1/2">
            <AnimatePresence>
                {showScroll && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex flex-col justify-center items-center gap-3"
                >
                    <motion.div
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-[100px] h-[3px] bg-white rounded-full"
                    />
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    </>
  );
}