"use client"

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Navbar from '../../components/Navbar/Navbar';
import History from '../../components/History';
import { IHistoryItem } from '@/types/history';
import { useUserContext } from '@/contexts';
import LoadingIcon from '@/components/Base/LoadingIcon';
import { HomeFooter } from '@/components/Footer';
import { createAxiosInstance } from '@/lib/axios';

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

export default function HistoryPage() {
  const { user } = useUserContext();
  const [historyItems, setHistoryItems] = useState<IHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [totalChatsCount, setTotalChatsCount] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const fetchHistory = async (pageNum: number) => {
    if (!user?.id) return;
   
    try {
      setIsFetchingMore(true);
      const { data } = await createAxiosInstance().get(`/history`, {
        params: {
          userId: user.id,
          page: pageNum
        }
      });
      
      if (pageNum === 1) {
        setHistoryItems(data.history);
      } else {
        if (!isAllSelected) {
          setHistoryItems(prev => [...prev, ...data.history]);
        }
      }
      
      setHasMore(data.hasMore);
      setTotalChatsCount(data.total);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'An error occurred';
      console.error('Error fetching history:', err);
    } finally {
      setIsFetchingMore(false);
      if (pageNum === 1) setIsLoading(false);
    }
   };

  const handleScroll = useCallback(() => {
    if (
      isAllSelected || 
      historyItems.length >= totalChatsCount
    ) return;
  
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      if (hasMore && !isFetchingMore) {
        setPage(prev => prev + 1);
        fetchHistory(page + 1);
      }
    }
  }, [hasMore, isFetchingMore, page, isAllSelected, historyItems.length, totalChatsCount]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    fetchHistory(1);
  }, [user]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col w-screen min-h-screen bg-black py-6"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Navbar />
        </motion.div>
        
        <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 w-full flex justify-center"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <LoadingIcon />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1"
              >
                <History 
                  historyItems={historyItems}
                  setHistoryItems={setHistoryItems}
                  isFetchingMore={isFetchingMore}
                  totalChatsCount={totalChatsCount}
                  onSelectAll={(isSelected) => setIsAllSelected(isSelected)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  );
}