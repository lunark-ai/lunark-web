"use client"
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import { baseContainerStyle, backedBy } from '@/constants';

export default function BackedBySection() {
  return (
    <motion.section 
      className="py-20 relative px-2 sm:px-0 bg-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-lg uppercase tracking-[0.75rem] text-center mb-16 text-[#FCFCFC]">
          Backed by Visionaries
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-[3rem] w-full">
          {backedBy.map((investor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex flex-col items-center justify-center gap-2 w-[14rem]`}
            >
              <Link href={investor.url} target="_blank" rel="noopener noreferrer" className="w-full">
                <Image
                  src={investor.image}
                  alt={investor.name}
                  width={240}
                  height={80}
                  className="w-full h-auto object-contain transition-opacity hover:opacity-80"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
} 