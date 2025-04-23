"use client"
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";

export default function ChatLayout({ children, isChatMode }: { children: React.ReactNode, isChatMode: boolean }) {
  return (
    <main className="flex flex-col w-screen min-h-screen bg-black py-6">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
        <Navbar />
        <div className={`w-full max-w-3xl mx-auto relative min-h-[calc(100vh-212px)] ${isChatMode ? '' : 'pt-4 mt-6 sm:mt-8'}`}>
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}