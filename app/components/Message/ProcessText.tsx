import { ReactNode } from 'react';
import Image from 'next/image';
import { networks } from '@/constants';
import { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { baseButtonStyle } from '@/constants';

interface MarkerInfo {
 text?: string;
 icon?: string;
 type?: string;
}

const AddressCode = ({ address }: { address: string }) => {
 const [displayText, setDisplayText] = useState(address);
 const containerRef = useRef<HTMLElement>(null);
 
 const handleClick = async () => {
   await navigator.clipboard.writeText(address);
   setDisplayText('Copied address to clipboard!');
   toast.success('Copied address to clipboard!');
   
   setTimeout(() => {
     setDisplayText(address);
   }, 2000);
 };

 return (
   <code 
     ref={containerRef}
     className={`${baseButtonStyle} inline-flex items-center cursor-pointer rounded-full px-2 py-0.5 text-center text-sm font-mono text-pink-600 max-w-full`}
     onClick={handleClick}
   >
    <span className="block sm:hidden truncate">
      {displayText.slice(0, 4) + '...' + displayText.slice(-4)}
    </span>
    <span className="hidden sm:block truncate">
      {displayText}
    </span>
   </code>
 );
};

export const processText = (children: ReactNode): ReactNode[] => {
 if (!children || typeof children !== 'string') {
   return [children];
 }

 let processedText = children;
 const markers = new Map<string, MarkerInfo>();
 let markerCount = 0;

 // First handle Ethereum addresses
 const ethAddressRegex = /\b(0x\s*[a-fA-F0-9\s]{40})\b/gi;
 processedText = processedText.replace(ethAddressRegex, (match) => {
   const marker = `%%MARKER${markerCount}%%`;
   markers.set(marker, {
     text: match.replace(/\s+/g, ''),
     type: 'address'
   });
   markerCount++;
   return marker;
 });

 // Then handle networks
 networks.forEach(network => {
   // Create exact match patterns for network names
   const exactNetworkName = network.name.toLowerCase();
   const exactCurrency = network.nativeCurrency.symbol.toLowerCase();
   
   // Match exact network names only
   const nameRegex = new RegExp(`\\b${exactNetworkName}\\b`, 'i');
   const match = processedText.match(nameRegex);
   if (match) {
     const marker = `%%MARKER${markerCount}%%`;
     markers.set(marker, {
       text: network.name,
       icon: network.icon,
       type: 'network'
     });
     markerCount++;
     processedText = processedText.replace(match[0], marker);
   }
 
   // Match exact currency symbols only
   const currencyRegex = new RegExp(`\\b${exactCurrency}\\b`, 'i');
   const currencyMatch = processedText.match(currencyRegex);
   if (currencyMatch) {
     const marker = `%%MARKER${markerCount}%%`;
     markers.set(marker, {
       text: network.nativeCurrency.symbol.toUpperCase(),
       icon: network.icon,
       type: 'currency'
     });
     markerCount++;
     processedText = processedText.replace(currencyMatch[0], marker);
   }
 });

 // Finally handle balances
 const balanceRegex = /Balance of (\d+(?:,\d{3})*(?:\.\d+)?)\b/g;
 processedText = processedText.replace(balanceRegex, (match, number) => {
   const marker = `%%BALANCE${markerCount}%%`;
   markers.set(marker, {
     text: number,
     type: 'balance'
   });
   markerCount++;
   return `Balance of ${marker}`;
 });

 const parts = processedText.split(/(%%(?:MARKER|BALANCE)\d+%%)/);
 const intermediateResults: ReactNode[] = parts.map((part, idx) => {
   if (part.startsWith('%%MARKER') && part.endsWith('%%')) {
     const markerInfo = markers.get(part);
     if (markerInfo) {
       if (markerInfo.type === 'address') {
         return <AddressCode key={`address-${idx}`} address={markerInfo.text as string} />;
       }
       if (markerInfo.type === 'network' || markerInfo.type === 'currency') {
         return (
           <span key={`marker-${idx}`} className="inline-flex items-center font-semibold">
             {markerInfo.text}
             {markerInfo.icon && (
               <Image 
                 src={markerInfo.icon} 
                 alt={`${markerInfo.type} icon`}
                 width={32}
                 height={32}
                 className="w-4 h-4 ml-1 rounded-full object-contain"
               />
             )}
           </span>
         );
       }
       return markerInfo.text;
     }
   } else if (part.startsWith('%%BALANCE') && part.endsWith('%%')) {
     const markerInfo = markers.get(part);
     if (markerInfo) {
       return (
         <span key={`balance-${idx}`} className="font-semibold">
           {markerInfo.text}
         </span>
       );
     }
   }
   return part;
 });

 const results: ReactNode[] = [];
 intermediateResults.forEach((part, index) => {
   if (typeof part !== 'string') {
     results.push(part);
     return;
   }

   let lastIndex = 0;
   const segments: ReactNode[] = [];
   
   const urlRegex = /(?:"|')?(?:https?:\/\/[^\s"']+|www\.[^\s"']+|[^\s"']+\.(?:com|org|net|edu|gov|mil|io|dev|ai)[^\s"']*)(?:"|')?/g;
   let urlMatch;

   while ((urlMatch = urlRegex.exec(part)) !== null) {
     if (urlMatch.index > lastIndex) {
       segments.push(part.slice(lastIndex, urlMatch.index));
     }

     let url = urlMatch[0];
     url = url.replace(/^["']|["']$/g, '');
     const href = url.startsWith('www.') ? `https://${url}` : url;
     
     segments.push(
       <a
         key={`url-${index}-${urlMatch.index}`}
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         className={`${baseButtonStyle} !border-0 text-sky-500 hover:text-sky-600 hover:border-sky-500/50 cursor-pointer break-all`}
       >
         {url}
       </a>
     );
     lastIndex = urlMatch.index + urlMatch[0].length;
   }

   if (lastIndex < part.length) {
     segments.push(part.slice(lastIndex));
   }

   results.push(...segments);
 });

 return results;
};