"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { baseButtonStyle, baseContainerStyle } from '@/constants';
import { Brain, Xmark, Settings as SettingsIcon, User, Book } from 'iconoir-react';
import { useUserContext, useGlobalContext } from '@/contexts';
import { createAxiosInstance } from '@/lib/axios';
import { IMemory } from '@/types/memory';
import Popup from '../Popup';
import GeneralSettings from './GeneralSettings';
import MemorySettings from './MemorySettings';
import ProfileSettings from './ProfileSettings';
import { toast } from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import ContractSettings from './ContractSettings';

interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  {
    id: 'general',
    label: 'General',
    icon: <SettingsIcon className="w-5 h-5" />,
  },
  {
    id: 'contracts',
    label: 'Contracts',
    icon: <Book className="w-5 h-5" />,
  },
  {
    id: 'memory',
    label: 'Memory',
    icon: <Brain className="w-5 h-5" />,
  },
  {
    id: 'profile',
    label: 'Account',
    icon: <User className="w-5 h-5" />,
  },
];

const SettingsPopup: React.FC<SettingsPopupProps> = ({ isOpen, onClose }) => {
  const { selectedMenu, setSelectedMenu } = useGlobalContext();
  const [memories, setMemories] = useState<IMemory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteChatsConfirmation, setShowDeleteChatsConfirmation] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isDeletingChats, setIsDeletingChats] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const { user, disconnect } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen && user && selectedMenu === 'memory') {
      fetchMemories();
    }
  }, [isOpen, user, selectedMenu]);

  const fetchMemories = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const response = await createAxiosInstance().get(`/memory/${user.id}`);
      setMemories(response.data);
    } catch (error) {
      console.error('Failed to fetch memories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (memoryId: string) => {
    setSelectedMemoryId(memoryId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    if (!user || !selectedMemoryId) return;
    
    try {
      await createAxiosInstance().delete(`/memory/${user.id}?memoryId=${selectedMemoryId}`);
      setMemories(memories.filter(memory => memory.id !== selectedMemoryId));
      setShowDeleteConfirmation(false);
      setSelectedMemoryId(null);
    } catch (error) {
      console.error('Failed to delete memory:', error);
    }
  };

  const handleDeleteAllChats = async () => {
    if (!user) return;
    
    setIsDeletingChats(true);
    try {
      // First get all chat IDs
      const { data } = await createAxiosInstance().get(`/history`, {
        params: {
          userId: user.id,
          limit: -1
        }
      });
      
      // Then delete all chats using the history DELETE endpoint
      await createAxiosInstance().delete('/history', {
        data: { 
          ids: data.history.map((chat: any) => chat.id),
          userId: user.id 
        }
      });

      setShowDeleteChatsConfirmation(false);
      toast.success('All chats deleted successfully');

      // If we're in a chat view, redirect to home page
      if (pathname?.startsWith('/chat/')) {
        router.push('/');
      }
    } catch (error: any) {
      console.error('Failed to delete all chats:', error);
      toast.error(error.response?.data?.error || 'Failed to delete all chats');
    } finally {
      setIsDeletingChats(false);
    }
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      await disconnect();
      onClose();
    } catch (error) {
      console.error('Failed to disconnect:', error);
      toast.error('Failed to disconnect');
    } finally {
      setIsDisconnecting(false);
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'general':
        return (
          <GeneralSettings
            language={language}
            setLanguage={setLanguage}
            onDeleteAllChats={() => setShowDeleteChatsConfirmation(true)}
            onDisconnect={handleDisconnect}
            isDeleting={isDeletingChats}
            isDisconnecting={isDisconnecting}
          />
        );
      case 'memory':
        return (
          <MemorySettings
            memories={memories}
            isLoading={isLoading}
            onDeleteClick={handleDeleteClick}
            onClearAllClick={fetchMemories}
          />
        );
      case 'profile':
        return (
          <ProfileSettings
            onClose={onClose}
          />
        );
      case 'contracts':
        return <ContractSettings />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-6 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`${baseContainerStyle} rounded-xl w-full max-w-3xl h-[500px] flex flex-col sm:flex-row overflow-hidden relative`}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className={`${baseButtonStyle} absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full z-10`}
            >
              <Xmark className="w-5 h-5" />
            </button>
            <div className="flex-none w-full sm:w-48 border-b sm:border-b-0 sm:border-r border-[#888]/30">
              <div className="p-4">
                <div className="flex sm:block items-center justify-between mb-4 sm:mb-0">
                  <h2 className="text-[#FCFCFC] font-medium text-lg">Settings</h2>
                </div>
                <div className="sm:mt-6 grid grid-cols-2 sm:grid-cols-1 gap-3">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedMenu(item.id)}
                      className={`${baseButtonStyle} text-sm flex items-center gap-3 px-4 py-2 rounded-full ${
                        selectedMenu === item.id ? 'bg-[rgba(255,255,255,0.1)]' : ''
                      }`}
                    >
                      {item.icon}
                      <span className="text-[#FCFCFC]">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col min-h-0">
              {renderContent()}
            </div>
          </motion.div>

          <Popup
            isOpen={showDeleteConfirmation}
            onClose={() => {
              setShowDeleteConfirmation(false);
              setSelectedMemoryId(null);
            }}
            onConfirm={handleDeleteConfirm}
            title="Delete Memory"
            message="Are you sure you want to delete this memory? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            type="danger"
          />
          <Popup
            isOpen={showDeleteChatsConfirmation}
            onClose={() => setShowDeleteChatsConfirmation(false)}
            onConfirm={handleDeleteAllChats}
            title="Delete All Chats"
            message="Are you sure you want to delete all your chats? This action cannot be undone."
            confirmText="Delete All"
            cancelText="Cancel"
            type="danger"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsPopup; 