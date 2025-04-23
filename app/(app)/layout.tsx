"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
}