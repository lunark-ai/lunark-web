"use client"
import { motion } from "framer-motion";
import { baseContainerStyle, baseButtonStyle } from '@/constants';
import { Copy, MessageText, SendDiagonal, ThumbsUp, ThumbsDown } from 'iconoir-react';
import { processText } from '../Message/ProcessText';
import Link from 'next/link';

export default function ChatSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
              <MessageText className="w-6 h-6 mr-2" />
              Chat with Lunark
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-[#5e8284] text-base"
            >
              Experience seamless blockchain interaction through natural conversations. Get real-time insights, check balances, and manage transactions - all through simple chat commands.
            </motion.p>
            <motion.button 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
              onClick={scrollToTop} 
              className={`flex items-center w-fit mr-4 px-4 py-2 text-sm text-[#FCFCFC] rounded-full ${baseButtonStyle}`}
            >
              <span className="mr-2">Start Chatting</span>
              <SendDiagonal className="w-4 h-4" />
            </motion.button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="border border-[#888]/30 rounded-2xl p-6"
          >
            <div className="flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex items-start gap-3 flex-row-reverse w-full"
              >
                <div className="flex flex-col gap-2 w-full items-end">
                  <div className={`group max-w-[95%] w-fit p-4 ${baseContainerStyle} rounded-xl shadow-sm break-words relative`}>
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
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex items-start gap-3 flex-row w-full"
              >
                <div className="flex flex-col gap-2 w-full items-start">
                  <div className={`group max-w-[95%] w-fit p-4 ${baseContainerStyle} rounded-xl shadow-sm break-words relative`}>
                    <div className="text-[#FCFCFC] text-start">
                      Your current balance is {processText('2.5 ETH')}
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 