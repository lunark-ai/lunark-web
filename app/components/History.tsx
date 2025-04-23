"use client"

import { IHistoryItem } from '@/types/history';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Checkbox from './Base/Checkbox';
import { formatDate } from '@/utils/format';
import { useUserContext } from '@/contexts';
import toast from 'react-hot-toast';
import Popup from './Popup/Popup';
import LoadingIcon from './Base/LoadingIcon';
import Input from './Base/Input';
import { createAxiosInstance } from '@/lib/axios';
import { Search, Trash } from 'iconoir-react';
import { useRouter, usePathname } from 'next/navigation';

const containerVariants = {
 hidden: { opacity: 0 },
 visible: { 
   opacity: 1,
   transition: {
     when: "beforeChildren",
     staggerChildren: 0.1
   }
 }
};

const childVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: { 
   opacity: 1, 
   y: 0,
   transition: {
     duration: 0.4,
     ease: "easeOut"
   }
 }
};

interface HistoryProps {
 historyItems: IHistoryItem[];
 setHistoryItems: React.Dispatch<React.SetStateAction<IHistoryItem[]>>;
 isFetchingMore: boolean;
 totalChatsCount: number;
 onSelectAll: (isSelected: boolean) => void;
}

export default function History({ historyItems, setHistoryItems, isFetchingMore, totalChatsCount, onSelectAll }: HistoryProps) {
 const { user } = useUserContext();
 const router = useRouter();
 const pathname = usePathname();
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
 const [isSelectionMode, setIsSelectionMode] = useState(false);
 const [showDeletePopup, setShowDeletePopup] = useState(false);
 const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);
 const [singleDeleteId, setSingleDeleteId] = useState<string | null>(null);
 const [showSingleDeletePopup, setShowSingleDeletePopup] = useState(false);
 const [isDeleting, setIsDeleting] = useState(false);
 const [isDeletingMultiple, setIsDeletingMultiple] = useState(false);
 const [isLoadingAll, setIsLoadingAll] = useState(false);

 const filteredItems = historyItems.filter(item =>
   item.title.toLowerCase().includes(searchQuery.toLowerCase())
 );

 const toggleSelection = (index: number, e: React.MouseEvent | React.ChangeEvent<HTMLInputElement>) => {
   e.stopPropagation();
   
   if (!isSelectionMode) {
     setIsSelectionMode(true);
   }
   
   setSelectedItems(prev => {
     const newSelected = new Set(prev);
     if (newSelected.has(index)) {
       newSelected.delete(index);
     } else {
       newSelected.add(index);
     }
     return newSelected;
   });
 };

 const handleSelectAll = async () => {
   if (selectedItems.size === filteredItems.length) {
     setSelectedItems(new Set());
     onSelectAll(false);
   } else {
     if (historyItems.length < totalChatsCount) {
       try {
         setIsLoadingAll(true);
         const loadingToast = toast.loading('Loading all chats...');
         
         const { data } = await createAxiosInstance().get(`/history`, {
           params: {
             userId: user.id,
             limit: -1
           }
         });
         setHistoryItems(data.history);
         setSelectedItems(new Set(data.history.map((_: IHistoryItem, index: number) => index)));
         
         toast.dismiss(loadingToast);
         onSelectAll(true);
       } catch (error) {
         console.error('Error fetching all chats:', error);
         toast.error('Failed to load all chats');
       } finally {
         setIsLoadingAll(false);
       }
     } else {
       setSelectedItems(new Set(filteredItems.map((_, index) => index)));
       onSelectAll(true);
     }
   }
 };
 
 const handleDeleteSelected = () => {
   const selectedIds = Array.from(selectedItems).map(index => filteredItems[index].id);
   setItemsToDelete(selectedIds);
   setShowDeletePopup(true);
 };
 
 const deleteConfirmed = async () => {
   try {
     setIsDeletingMultiple(true);
     await createAxiosInstance().delete('/history', {
       data: { 
         ids: itemsToDelete,
         userId: user.id 
       }
     });
 
     const { data } = await createAxiosInstance().get(`/history`, {
       params: { userId: user.id }
     });
     setHistoryItems(data.history);
     setSelectedItems(new Set());
     setIsSelectionMode(false);
     onSelectAll(false);
     
     toast.success('Chats deleted successfully');

     // If we're in a chat view, redirect to home page
     if (pathname?.startsWith('/chat/')) {
       router.push('/');
     }
   } catch (error: any) {
     console.error('Error deleting chats:', error);
     toast.error(error.response?.data?.error || 'Failed to delete chats');
   } finally {
     setIsDeletingMultiple(false);
     setShowDeletePopup(false);
   }
 };

 const handleSingleDelete = (index: number, e: React.MouseEvent) => {
   e.stopPropagation();
   const id = filteredItems[index].id;
   setSingleDeleteId(id);
   setShowSingleDeletePopup(true);
 };

 const singleDeleteConfirmed = async () => {
   if (singleDeleteId === null) return;
 
   try {
     setIsDeleting(true);
     await createAxiosInstance().delete('/history', {
       data: { 
         ids: [singleDeleteId],
         userId: user.id 
       }
     });
 
     setHistoryItems(prev => prev.filter(item => item.id !== singleDeleteId));
     setSingleDeleteId(null);
     
     toast.success('Chat deleted successfully');

     // If we're in a chat view, redirect to home page
     if (pathname?.startsWith('/chat/')) {
       router.push('/');
     }
   } catch (error: any) {
     toast.error(error.response?.data?.error || 'Failed to delete chat');
   } finally {
     setIsDeleting(false);
     setShowSingleDeletePopup(false);
   }
 };

 return (
   <motion.div 
     className="w-full max-w-[1280px] mx-auto pt-6 pb-12 px-4 sm:px-6"
     variants={containerVariants}
   >
     <motion.div variants={childVariants}>
       <Input
         value={searchQuery}
         onChange={setSearchQuery}
         placeholder="Search your chats..."
         icon={Search}
         iconPosition="left"
         className="mb-6"
       />
     </motion.div>

     <motion.div variants={childVariants}>
       {isSelectionMode ? (
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 px-4">
           <span className="text-[#FCFCFC]/90">
             {selectedItems.size} selected chats
           </span>
           <div className="flex flex-col sm:flex-row items-start sm:items-center mt-6 sm:mt-0 gap-6">
             <button
               onClick={handleSelectAll}
               disabled={isLoadingAll}
               className={`text-[#FCFCFC]/90 hover:text-[#FCFCFC] transition-colors duration-200 flex items-center gap-2 ${isLoadingAll ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
               Select all
               {isLoadingAll && <LoadingIcon isSmall />}
             </button>
             <button
               onClick={() => {
                 setIsSelectionMode(false);
                 setSelectedItems(new Set());
                 onSelectAll(false);
               }}
               className="text-[#FCFCFC]/60 hover:text-[#FCFCFC]/90 transition-colors duration-200"
             >
               Cancel
             </button>
             {selectedItems.size > 0 ? (
               <button
                 onClick={handleDeleteSelected}
                 disabled={isDeletingMultiple}
                 className={`px-4 py-2 rounded-full border border-[#888]/30
                   bg-[radial-gradient(70%_70%_at_center,rgba(8,10,12,0.98)_0%,rgba(160,165,180,0.25)_100%)]
                   backdrop-blur-sm
                   transition-all duration-400 ease-in-out
                   shadow-[0_0_10px_rgba(0,0,0,0.2),inset_0_0_20px_4px_rgba(0,0,0,0.3)]
                   hover:border-[#aaa]/50
                   hover:shadow-[0_0_15px_rgba(0,0,0,0.3),inset_0_0_25px_6px_rgba(0,0,0,0.3)]
                   text-[#FCFCFC]/90 flex items-center gap-2 ${isDeletingMultiple ? 'opacity-50 cursor-not-allowed' : ''}`}
                 >
                   <Trash className="w-5 h-5" />
                   Delete Selected
                   {isDeletingMultiple && <LoadingIcon isSmall />}
                 </button>
               ) : (
                 <button
                   disabled
                   className={`px-4 py-2 rounded-full border border-[#888]/30
                     bg-[radial-gradient(70%_70%_at_center,rgba(8,10,12,0.98)_0%,rgba(160,165,180,0.25)_100%)]
                     backdrop-blur-sm
                     opacity-50 cursor-not-allowed
                     shadow-[0_0_10px_rgba(0,0,0,0.2),inset_0_0_20px_4px_rgba(0,0,0,0.3)]
                     text-[#FCFCFC]/40 flex items-center gap-2`}
                 >
                   <Trash className="w-5 h-5" />
                   Delete Selected
                 </button>
               )}
           </div>
         </div>
       ) : (
         <div className="mb-6 w-full px-4">
           <p className="text-[#FCFCFC]/90 flex flex-row items-center justify-between w-full">
             You have {historyItems.length} previous chats with Lunark AI 
             <button 
               onClick={() => setIsSelectionMode(true)}
               className={`px-4 py-2 rounded-full border border-[#888]/30
                 bg-[radial-gradient(70%_70%_at_center,rgba(8,10,12,0.98)_0%,rgba(160,165,180,0.25)_100%)]
                 backdrop-blur-sm
                 transition-all duration-400 ease-in-out
                 shadow-[0_0_10px_rgba(0,0,0,0.2),inset_0_0_20px_4px_rgba(0,0,0,0.3)]
                 hover:border-[#aaa]/50
                 hover:shadow-[0_0_15px_rgba(0,0,0,0.3),inset_0_0_25px_6px_rgba(0,0,0,0.3)]
                 text-[#FCFCFC]/90`}
             >
               Select
             </button>
           </p>
         </div>
       )}
     </motion.div>

     <motion.div 
       className="grid grid-cols-1 gap-4"
       variants={childVariants}
     >
       {filteredItems.map((item, index) => (
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.2 }}
           key={index}
           variants={childVariants}
           className="relative flex items-center group w-full"
         >
           <div className={`absolute -left-2 mt-[5px] z-10 ${isSelectionMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
             <Checkbox
               checked={selectedItems.has(index)}
               onChange={(e) => {
                 e.stopPropagation();
                 toggleSelection(index, e);
               }}
             />
           </div>
           <div 
             className={`p-4 pl-6 border border-[#888]/30
               bg-[radial-gradient(70%_70%_at_center,rgba(8,10,12,0.98)_0%,rgba(160,165,180,0.25)_100%)]
               backdrop-blur-sm rounded-xl w-full
               transition-all duration-400 ease-in-out
               shadow-[0_0_10px_rgba(0,0,0,0.2),inset_0_0_20px_4px_rgba(0,0,0,0.3)]
               ${!isSelectionMode ? 'hover:border-[#aaa]/50 hover:shadow-[0_0_15px_rgba(0,0,0,0.3),inset_0_0_25px_6px_rgba(0,0,0,0.3)]' : ''} 
               ${selectedItems.has(index) ? 'border-[#aaa]/40 shadow-[0_0_20px_rgba(0,0,0,0.4),inset_0_0_30px_8px_rgba(0,0,0,0.3)] bg-[radial-gradient(70%_70%_at_center,rgba(8,10,12,0.98)_0%,rgba(160,165,180,0.4)_100%)]' : ''}`}
           >
             <div className="flex justify-between items-center">
               <a 
                 href={isSelectionMode ? undefined : `/chat/${item.id}`}
                 onClick={(e) => {
                   if (isSelectionMode) {
                     e.preventDefault(); 
                     toggleSelection(index, e);
                   }
                 }}
                 className="flex-1 cursor-pointer"
               >
                 <h3 className="font-medium mb-2 text-[#FCFCFC]/90">{item.title}</h3>
                 <p className="text-sm text-[#FCFCFC]/60">
                   Last message at {formatDate(new Date(item.updatedAt).toLocaleString()) + ' ' + new Date(item.updatedAt).toLocaleTimeString()}
                 </p>
               </a>
               <button
                 onClick={(e) => handleSingleDelete(index, e)}
                 disabled={isDeleting && singleDeleteId === item.id}
                 className={`text-[#FCFCFC]/60 hover:text-[#FCFCFC]/90 p-2 rounded-lg transition duration-200 flex items-center gap-2
                   ${isSelectionMode ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}
                   ${isDeleting && singleDeleteId === item.id ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                 <Trash className="w-5 h-5" />
                 {isDeleting && singleDeleteId === item.id && <LoadingIcon isSmall />}
               </button>
             </div>
           </div>
         </motion.div>
       ))}
     </motion.div>

     <AnimatePresence>
       {isFetchingMore && (
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="text-center py-8 w-full flex justify-center"
         >
           <LoadingIcon />
         </motion.div>
       )}
     </AnimatePresence>

     <Popup 
       isOpen={showDeletePopup}
       onClose={() => setShowDeletePopup(false)}
       onConfirm={deleteConfirmed}
       title="Delete Chats"
       message={`Are you sure you want to delete ${itemsToDelete.length} chat${itemsToDelete.length > 1 ? 's' : ''}?`}
       confirmText="Delete"
       cancelText="Cancel"
       type="danger"
     />
     <Popup 
       isOpen={showSingleDeletePopup}
       onClose={() => setShowSingleDeletePopup(false)}
       onConfirm={singleDeleteConfirmed}
       title="Delete Chat"
       message="Are you sure you want to delete this chat?"
       confirmText="Delete"
       cancelText="Cancel"
       type="danger"
     />
   </motion.div>
 );
}