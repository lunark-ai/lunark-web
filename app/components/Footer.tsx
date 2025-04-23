"use client"
import { motion } from "framer-motion";
import Image from 'next/image';
import { RiTwitterXFill, RiGithubFill } from "react-icons/ri";

export function HomeFooter() {
  return (
    <footer className="py-20 relative mt-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 md:col-span-2"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Image 
                src="/images/icons/icon-light.svg" 
                alt="Lunark AI" 
                width={48} 
                height={48} 
                className="mb-4"
              />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-[#5e8284] mb-4"
            >
              Making blockchain human-friendly. Tell Lunark AI what you need, and watch the magic happen.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex gap-4 mb-6"
            >
              <a href="https://x.com/lunarkaiorg" target="_blank" rel="noopener noreferrer" className="text-[#5e8284] hover:text-[#FCFCFC] transition-colors">
                <RiTwitterXFill width={32} height={32} className="w-6 h-6" />
              </a>
              <a href="https://github.com/lunark-ai" target="_blank" rel="noopener noreferrer" className="text-[#5e8284] hover:text-[#FCFCFC] transition-colors">
                <RiGithubFill width={32} height={32} className="w-6 h-6" />
            </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-[#FCFCFC] font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="https://docs.lunarkai.org/" target="_blank" rel="noopener noreferrer" className="text-[#5e8284] hover:text-[#FCFCFC] transition-colors">Documentation</a></li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-[#FCFCFC] font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#5e8284] hover:text-[#FCFCFC] transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#5e8284] hover:text-[#FCFCFC] transition-colors">Privacy Policy</a></li>
            </ul>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="border-t border-[#888]/30 mt-8 pt-8 text-center text-[#5e8284]"
        >
          <p>© {new Date().getFullYear()} Lunark AI. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

export function ChatFooter() {
 return (
   <div className="flex justify-center sm:justify-between items-center px-4 mt-4 text-xs">
     <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.4 }}
      className="text-[#4F6263]"
     >
       Built by <span className="text-[#9CA3AF]">Lunark AI</span> © {new Date().getFullYear()}  
     </motion.div>
     <div className="hidden sm:flex flex-row gap-3 text-[#4F6263] max-w-2xl text-center">
      <motion.a 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.5 }}
          href="/terms" 
          target="_blank" 
        className="hover:underline mx-auto"
      >
        Terms of Service
      </motion.a> 
      <motion.a 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.5 }}
        href="/privacy" 
        target="_blank" 
        className="hover:underline mx-auto"
      >
        Privacy Policy
      </motion.a>
     </div>
   </div>
 );
}