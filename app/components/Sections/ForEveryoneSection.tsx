"use client"
import { motion } from "framer-motion";
import { baseButtonStyle } from '@/constants';
import { Cube, Building } from 'iconoir-react';
import Link from 'next/link';
import { RiBookOpenLine, RiTwitterXFill } from "react-icons/ri";

export default function ForEveryoneSection() {
  return (
    <motion.section 
      className="py-20 relative px-2 sm:px-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-lg uppercase tracking-[0.75rem] text-center mb-16 text-[#FCFCFC]"
        >
          Lunark AI is for Everyone
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
            className={`p-8 flex flex-col gap-2`}
          >
            <h3 className="text-xl mb-4 text-[#FCFCFC] uppercase tracking-[0.25rem] flex items-center gap-2 w-full">
              <Cube className="w-6 h-6 mr-2" />
              Blockchain Adoption
            </h3>
            <p className="text-[#5e8284] mb-6">Start your blockchain journey with Lunark AI. Our platform makes blockchain technology accessible and easy to understand for everyone.</p>
            <Link href="https://docs.lunarkai.org/getting-started" target="_blank" className={`flex items-center w-fit mr-4 px-4 py-2 text-sm text-[#FCFCFC] rounded-full ${baseButtonStyle}`}>
                <span className="mr-2">Learn More</span>
                <RiBookOpenLine className="w-4 h-4" /> 
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
            className={`p-8 flex flex-col gap-2`}
          >
            <h3 className="text-xl mb-4 text-[#FCFCFC] uppercase tracking-[0.25rem] flex items-center gap-2 w-full">
              <Building className="w-6 h-6 mr-2" />
              Enterprise
            </h3>
            <p className="text-[#5e8284] mb-6">Transform your business with enterprise-grade blockchain solutions. Lunark AI provides the infrastructure needed to implement blockchain technology at scale.</p>
            <Link href="https://x.com/lunarkaiorg" target="_blank" className={`flex w-fit mr-4 items-center px-4 py-2 text-sm text-[#FCFCFC] rounded-full ${baseButtonStyle}`}>
              <span className="mr-2">Contact Us</span>
              <RiTwitterXFill className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
} 