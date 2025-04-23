"use client"
import { motion } from "framer-motion";
import { baseContainerStyle, baseButtonStyle } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { RiTwitterXFill } from "react-icons/ri";

export default function BlogSection() {
  const post = {
    title: "Lunark AI is on X",
    date: "Dec 4, 2024",
    excerpt: "Hey X, Lunark has entered the chat.",
    views: "189",
    link: "https://x.com/lunarkaiorg/status/1864409229580173670"
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-xl mb-4 text-[#FCFCFC] uppercase tracking-[0.25rem] flex items-center gap-2 w-full"
            >
              <RiTwitterXFill className="w-6 h-6 mr-2" />
              Join our community
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-[#5e8284] text-base"
            >
              Stay updated with our latest news and announcements on X. Follow us to get real-time updates about Lunark AI's development and community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Link 
                href="https://x.com/intent/user?screen_name=lunarkaiorg"
                target="_blank"
                className={`flex items-center w-fit mr-4 px-4 py-2 text-sm text-[#FCFCFC] rounded-full ${baseButtonStyle}`}
              >
                <span className="mr-2">Follow @lunarkaiorg on</span>
                <RiTwitterXFill className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className={`${baseContainerStyle} p-6 rounded-xl hover:bg-[#FCFCFC]/5 transition-colors`}
          >
            <motion.a 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              href={post.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex items-center gap-3 mb-4"
              >
                <Image
                  src="/images/icons/icon-x.png"
                  alt="Lunark AI Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-[#FCFCFC] font-semibold">Lunark AI</h3>
                  <p className="text-sm text-[#5e8284]">@lunarkaiorg</p>
                </div>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-[#FCFCFC] mb-3"
              >
                {post.excerpt}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="flex items-center gap-4 text-sm text-[#5e8284]"
              >
                <span>{post.date}</span>
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 