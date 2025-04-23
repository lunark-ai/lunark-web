import { useEffect, useState } from 'react';
import { useTransactionExecutor } from '@/hooks/useTransactionExecutor';
import LoadingIcon from '../Base/LoadingIcon';
import { networks } from '@/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { ITransaction } from '@/types/transaction';
import { createAxiosInstance } from '@/lib/axios';
import { useUserContext } from '@/contexts';
import { baseButtonStyle, baseContainerStyle } from '@/constants';

interface TransactionUIProps {
   transaction: ITransaction;
}

export const TransactionUI = ({ transaction }: TransactionUIProps) => {
   const { user } = useUserContext();
   const { executeTransaction } = useTransactionExecutor();
   const [isExecuting, setIsExecuting] = useState(false);
   const [txHash, setTxHash] = useState<string | null>(null);

   useEffect(() => {
       if (!transaction.hash || transaction.hash === null) return;
       setTxHash(transaction.hash);
   }, [transaction]);

   const getExplorerUrl = (chainId: number, hash: string) => {
       const network = networks.find(n => n.chainId === chainId);
       if (!network) return '';
       return `${network.explorerUrl}/tx/${hash}`;
   };

   const handleExecute = async () => {
       if (isExecuting || !transaction?.data?.transaction || !user) return;
       
       setIsExecuting(true);
       try {
           const result = await executeTransaction(transaction.data.transaction);
           if (result?.hash) {
               setTxHash(result.hash);
               
               await createAxiosInstance().post(`transactions/${transaction.id}`, {
                   userId: user.id,
                   hash: String(result.hash)
               });
           }
       } finally {
           setIsExecuting(false);
       }
   };

   return (
       <div className={`flex items-center gap-3 rounded-lg mt-3 mb-1 text-sm sm:text-base`}>
           <motion.button
               onClick={handleExecute}
               disabled={isExecuting || transaction.hash !== null || txHash !== null}
               className={`${baseButtonStyle} rounded-lg w-fit px-4 py-1.5 ${transaction.hash || txHash || isExecuting ? 'opacity-50' : ''}`}
               initial={{ opacity: 0, y: 5 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.2 }}
           >
               <motion.div
                   initial={false}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 0.2 }}
                   className="text-green-500"
               >
                   {isExecuting ? 
                       <div className="flex items-center gap-2">
                           <LoadingIcon isSmall /> 
                           <span>Processing</span>
                       </div>
                       : 
                       transaction.data.buttonText
                   }
               </motion.div>
           </motion.button>
           <AnimatePresence>
               {(txHash || transaction.hash) && (
                   <motion.a
                       href={getExplorerUrl(transaction.data.chainId, txHash || transaction.hash!)}
                       target="_blank"
                       rel="noopener noreferrer"
                       className={`${baseButtonStyle} rounded-lg px-4 py-1.5 text-sky-500 text-sm`}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: 20 }}
                       transition={{ duration: 0.2 }}
                   >
                       View Transaction
                   </motion.a>
               )}
           </AnimatePresence>
       </div>
   );
};