"use client"
import { motion, AnimatePresence } from "framer-motion";
import ChatInput from './ChatInput';
import { ChatFooter } from '../Footer';
import MessageList from './MessageList';
import { IMessage } from "@/types/message";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useGlobalContext } from "@/contexts";
import { SendDiagonal } from "iconoir-react";
import { baseButtonStyle } from "@/constants";

interface ChatProps {
 messages: IMessage[];
 inputValue: string;
 isConnected: boolean;
 onSubmit: (value: string) => void;
 onInputChange: (value: string) => void;
 loading?: boolean;
 isStreaming?: boolean;
 onStreamControl?: () => void;
 socketStatus?: string;
}

const maskStyles = `
.mask-default {
  mask-image: linear-gradient(to bottom, transparent, black 25px, black calc(100% - 25px), transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25px, black calc(100% - 25px), transparent);
}

.mask-mobile {
  mask-image: linear-gradient(to bottom, transparent, black 10px, black calc(100% - 10px), transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 10px, black calc(100% - 10px), transparent);
}
`;

export default function Chat({
 messages,
 inputValue,
 isConnected,
 onSubmit,
 onInputChange,
 loading = false,
 isStreaming = false,
 onStreamControl,
 socketStatus
}: ChatProps) {
  const { status } = useGlobalContext();
 const [isAutoScrolling, setIsAutoScrolling] = useState(false);
 const [showScrollButton, setShowScrollButton] = useState(false);
 const [userScrolled, setUserScrolled] = useState(false);
 const [currentRows, setCurrentRows] = useState(1);
 const [containerHeight, setContainerHeight] = useState('calc(100vh - 212px)');
 const scrollTimeoutRef = useRef<NodeJS.Timeout>();
 const inputRef = useRef<HTMLTextAreaElement>(null);
 const messageContainerRef = useRef<HTMLDivElement>(null);
 const [isMobileScreen, setIsMobileScreen] = useState(false);

 useEffect(() => {
   const checkScreenSize = () => {
     setIsMobileScreen(window.innerWidth < 640); // sm breakpoint is 640px
   };
   
   checkScreenSize();
   window.addEventListener('resize', checkScreenSize);
   
   return () => window.removeEventListener('resize', checkScreenSize);
 }, []);

 useEffect(() => {
   if (!loading && messages.length > 0) {
     setTimeout(() => {
       inputRef.current?.focus();
     }, 100);
   }
 }, [loading, messages]);

 const scrollToBottomWithCheck = useCallback((forceScroll = false) => {
   if (messageContainerRef.current) {
     const container = messageContainerRef.current;
     const { scrollTop, scrollHeight, clientHeight } = container;
     const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

     if (forceScroll || isNearBottom || !userScrolled) {
       requestAnimationFrame(() => {
         container.scrollTo({
           top: container.scrollHeight,
           behavior: 'smooth'  
         });
       });
     }
   }
 }, [userScrolled]);

 const handleSubmit = (value: string) => {
   setUserScrolled(false);
   onSubmit(value);
   setTimeout(() => {
     scrollToBottomWithCheck(true);
   }, 0);
 };

 useEffect(() => {
   const messageContainer = messageContainerRef.current;
   let timeoutId: NodeJS.Timeout | undefined;

   const handleScroll = () => {
     if (timeoutId) clearTimeout(timeoutId);

     if (messageContainer) {
       const { scrollTop, scrollHeight, clientHeight } = messageContainer;
       const shouldShow = scrollHeight - scrollTop - clientHeight > 400;
       setShowScrollButton(shouldShow);

       setUserScrolled(true);

       if (scrollTimeoutRef.current) {
         clearTimeout(scrollTimeoutRef.current);
       }
       scrollTimeoutRef.current = setTimeout(() => {
         setUserScrolled(false);
       }, 2000);
     }
   };

   messageContainer?.addEventListener('scroll', handleScroll);
   return () => {
     messageContainer?.removeEventListener('scroll', handleScroll);
     if (timeoutId) clearTimeout(timeoutId);
     if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
   };
 }, []);

 useEffect(() => {
   const updateRows = () => {
     if (isStreaming) {
       setCurrentRows(1);
       setContainerHeight(`calc(100vh - 212px)`);
       return;
     }

     const textarea = inputRef.current;
     if (textarea) {
       const computedStyle = window.getComputedStyle(textarea);
       const paddingTop = parseInt(computedStyle.paddingTop) || 0;
       const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;
       const actualHeight = textarea.scrollHeight - paddingTop - paddingBottom;
       const lineHeight = parseInt(computedStyle.lineHeight) || 24;

       const rows = Math.min(6, Math.max(1, Math.round(actualHeight / lineHeight)));
       setCurrentRows(rows);
     }
   };

   updateRows();
 }, [inputValue, isStreaming]);

 useEffect(() => {
   setContainerHeight(`calc(100vh - ${isMobileScreen ? 180 : 212 + ((currentRows - 1) * 25)}px)`);
 }, [currentRows, isMobileScreen]);

 useEffect(() => {
   if (messages.length > 0 || loading || isStreaming) {
     scrollToBottomWithCheck();
   }
 }, [messages, loading, isStreaming]);

 useEffect(() => {
   // Add styles to document head
   const styleSheet = document.createElement("style");
   styleSheet.innerText = maskStyles;
   document.head.appendChild(styleSheet);

   return () => {
     document.head.removeChild(styleSheet);
   };
 }, []);

 return (
   <>
     <motion.div
       ref={messageContainerRef}
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       className="message-container overflow-y-auto pb-10 flex flex-col sm:mask-default mask-mobile"
       style={{
         height: containerHeight,
         scrollBehavior: 'smooth',
       }}
     >
       <MessageList
         messages={messages}
         isAutoScrolling={isAutoScrolling}
         loading={loading}
         isStreaming={isStreaming}
         status={socketStatus}
       />
     </motion.div>
     <div className="fixed bottom-0 left-0 right-0 p-4">
       <div className="max-w-3xl mx-auto relative">
         <div className="w-full flex justify-center">
           <AnimatePresence>
             {showScrollButton && (
               <motion.button
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 10 }}
                 transition={{ duration: 0.2 }}
                 onClick={() => scrollToBottomWithCheck(true)}
                 className={`absolute -top-16 z-[2] flex items-center gap-2 px-4 py-2 rounded-full ${baseButtonStyle}`}
               >
                 <svg
                   className="w-4 h-4"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor"
                   strokeWidth="2"
                 >
                   <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                 </svg>
                 <span className="text-sm">Latest messages</span>
               </motion.button>
             )}
           </AnimatePresence>
         </div>
         <ChatInput
           ref={inputRef}
           onSubmit={!isConnected || isStreaming ? undefined : handleSubmit}
           value={inputValue}
           onChange={onInputChange}
           disabled={!isConnected || isStreaming}
           loading={loading}
           placeholder={!status ? 'Lunark is sleeping...' : (isStreaming || loading ? "Please wait while Lunark processes your request..." : "How can Lunark help you today?")}
           submitIcon={SendDiagonal}
           showSubmitButton
           isStreaming={isStreaming}
           onStreamControl={onStreamControl}
         />
         <ChatFooter />
       </div>
     </div>
   </>
 );
}