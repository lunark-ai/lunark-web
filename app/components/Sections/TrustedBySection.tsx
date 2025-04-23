"use client"
import { motion } from "framer-motion";
import Image from 'next/image';

const partners: { name: string; logo: string }[] = [];

export default function TrustedBySection() {
    if (partners.length === 0) return null;

    return (
        <motion.section 
            className="py-20 relative px-2 sm:px-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-lg uppercase tracking-[0.75rem] text-center mb-16 text-[#FCFCFC]">
                    Trusted by Leading Tech Innovators and Research Institutions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center opacity-80">
                    {partners.map((partner: any) => (
                        <Image 
                            key={partner.name}
                            src={partner.logo} 
                            alt={partner.name} 
                            width={120} 
                            height={40} 
                            className="h-8 w-auto" 
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}