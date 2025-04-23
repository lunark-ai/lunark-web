"use client"
import { motion } from "framer-motion";
import Image from 'next/image';
import { ecosystemPartners, baseContainerStyle, baseButtonStyle } from '@/constants';
import { RiTeamLine } from "react-icons/ri";
import Link from 'next/link';

export default function EcosystemPartnersSection() {
  return (
    <section className="py-20 relative px-2 sm:px-0">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-lg uppercase tracking-[0.75rem] text-center mb-16 text-[#FCFCFC]"
        >
          Ecosystem Partners
        </motion.h2>
        {ecosystemPartners.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-[3rem] w-full">
            {ecosystemPartners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex flex-col items-center justify-center gap-2 w-[14rem]`}
              >
                <Link href={partner.url} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={240}
                    height={80}
                    className="w-full h-auto object-contain opacity-60 transition-opacity hover:opacity-100"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
            className={`flex flex-col justify-center items-center gap-2 max-w-xl mx-auto`}
          >
            <p className="text-[#5e8284] text-center mb-6">
              Become a part of our growing ecosystem. We're looking for innovative partners who share our vision for the future of blockchain technology.
            </p>
            <Link 
              href="https://x.com/lunarkaiorg" 
              target="_blank" 
              className={`flex items-center w-fit px-4 py-2 text-sm text-[#FCFCFC] rounded-full ${baseButtonStyle}`}
            >
              <span className="mr-2">Contact Us</span>
              <RiTeamLine className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
} 