"use client"

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { baseButtonStyle, networks } from '@/constants';
import { INetwork } from '@/types/networks';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useAppKitContext } from '@/contexts';
import LoadingIcon from '../Base/LoadingIcon';
import Tooltip from '../Base/Tooltip';

const dropdownStyle = `
 bg-[radial-gradient(70%_70%_at_center,rgba(8,10,12,0.98)_0%,rgba(160,165,180,0.25)_100%)]
 backdrop-blur-sm
 border border-[#888]/30
 shadow-[0_0_15px_rgba(0,0,0,0.3)]
`;

interface NetworkButtonProps {
 showLabel?: boolean;
}

export default function NetworkButton({ showLabel = false }: NetworkButtonProps) {
 const { chainId, switchNetwork } = useAppKitNetwork();
 const { appKitNetworks } = useAppKitContext();
 const [isOpen, setIsOpen] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [isNetworkSwitching, setIsNetworkSwitching] = useState(false);
 const [loadedNetworks, setLoadedNetworks] = useState<INetwork[]>([]);
 const buttonRef = useRef<HTMLDivElement>(null);
 const targetChainIdRef = useRef<string | null>(null);

 const selectedNetwork = networks.find((net: INetwork) => net.chainId === (appKitNetworks.find((n: any) => n.id === chainId)?.id)) || networks[0];

 useEffect(() => {
   if (targetChainIdRef.current && chainId === targetChainIdRef.current) {
     setIsNetworkSwitching(false);
     targetChainIdRef.current = null;
   }
 }, [chainId]);

 const handleNetworkSelect = async (network: INetwork) => {
   try {
     setIsNetworkSwitching(true);
     const appKitNetwork = appKitNetworks.find((n: any) => n.id === network.chainId);
     if (appKitNetwork) {
       targetChainIdRef.current = appKitNetwork.id;
       switchNetwork(appKitNetwork);
       setTimeout(() => {
         setIsNetworkSwitching(false);
         targetChainIdRef.current = null;
       }, 3000);
     }
   } catch (error) {
     console.error('Network switch error:', error);
     setIsNetworkSwitching(false);
     targetChainIdRef.current = null;
   } finally {
     setIsOpen(false);
   }
 };

 const handleOpen = async () => {
   if (!isOpen) {
     setIsOpen(true);
     setIsLoading(true);
     await new Promise(resolve => setTimeout(resolve, 500));
     setLoadedNetworks([...networks]);
     setIsLoading(false);
   } else {
     setIsOpen(false);
     setLoadedNetworks([]);
   }
 };

 useEffect(() => {
   const handleClickOutside = (event: MouseEvent) => {
     if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
       setIsOpen(false);
       setLoadedNetworks([]);
     }
   };

   document.addEventListener('mousedown', handleClickOutside);
   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, []);

 return (
   <div className="relative" ref={buttonRef}>
     <Tooltip text="Network">
       <motion.div
         initial={false}
         animate={{
           width: isOpen ? '10.25rem' : showLabel ? '10.25rem' : '40px',
         }}
         transition={{ duration: 0.2 }}
         className={`${baseButtonStyle} flex items-center select-none h-10 rounded-full overflow-hidden relative ${
           !isNetworkSwitching ? 'cursor-pointer' : 'opacity-70 cursor-not-allowed'
         }`}
         onClick={() => !isNetworkSwitching && !isLoading && handleOpen()}
       >
         <div className={`h-10 flex items-center justify-center ${isOpen || showLabel ? 'w-10' : 'w-full absolute left-0 right-0'}`}>
           <AnimatePresence mode="wait">
             {isNetworkSwitching ? (
               <motion.div
                 key="loading"
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 transition={{ duration: 0.2 }}
               >
                 <LoadingIcon isSmall />
               </motion.div>
             ) : (
               <motion.div
                 key="network-icon"
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 transition={{ duration: 0.2 }}
               >
                 <Image
                   src={selectedNetwork.icon}
                   alt={selectedNetwork.name}
                   width={24}
                   height={24}
                   className="rounded-full"
                 />
               </motion.div>
             )}
           </AnimatePresence>
         </div>
         <motion.div
           animate={{
             opacity: isOpen || showLabel ? 1 : 0,
           }}
           transition={{ duration: isOpen ? 0.2 : 0.1 }}
           className="flex items-center gap-2 pr-4"
         >
           <span className="whitespace-nowrap text-[#FCFCFC]">{selectedNetwork.name}</span>
         </motion.div>
       </motion.div>
     </Tooltip>
     <AnimatePresence mode="wait">
       {isOpen && !isNetworkSwitching && (
         <motion.div
           initial={{ opacity: 0, y: -5 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -5 }}
           transition={{ duration: 0.2 }}
           className={`${dropdownStyle} absolute right-0 mt-2 rounded-xl overflow-hidden z-50 ${
             isOpen ? 'w-[10.25rem]' : showLabel ? 'w-[10.25rem]' : 'w-40'
           }`}
         >
           <div className="max-h-[320px] overflow-y-auto">
             {isLoading ? (
               <div className="py-2 flex justify-center">
                 <LoadingIcon isSmall />
               </div>
             ) : (
               loadedNetworks.map((network, index) => (
                 <motion.button
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.2, delay: 0.05 * (index + 1) }}
                   key={index}
                   onClick={() => handleNetworkSelect(network)}
                   className={`w-full flex items-center gap-2 px-3 py-2 text-[#FCFCFC]
                     hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-200
                     ${selectedNetwork.id === network.id ? 'bg-[rgba(255,255,255,0.15)]' : ''}`}
                 >
                   <Image
                     src={network.icon}
                     alt={network.name}
                     width={24}
                     height={24}
                     className="flex-shrink-0 w-6 h-6 rounded-full"
                   />
                   <span className="whitespace-nowrap">{network.name}</span>
                 </motion.button>
               ))
             )}
           </div>
         </motion.div>
       )}
     </AnimatePresence>
   </div>
 );
}