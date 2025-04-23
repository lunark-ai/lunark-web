"use client";

import { Trash } from 'iconoir-react';
import { baseButtonStyle, baseContainerStyle } from '@/constants';
import { IMemory } from '@/types/memory';
import LoadingIcon from '../../Base/LoadingIcon';
import { processText } from '../../Message/ProcessText';
import { useEffect, useState, useRef } from 'react';
import Popup from '../../Popup/Popup';
import { useUserContext } from '@/contexts';
import { createAxiosInstance } from '@/lib/axios';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { useAppKitNetwork } from '@reown/appkit/react';

interface MemorySettingsProps {
  memories: IMemory[];
  isLoading: boolean;
  onDeleteClick: (memoryId: string) => void;
  onClearAllClick: () => void;
}

const MemorySettings: React.FC<MemorySettingsProps> = ({
  memories,
  isLoading,
  onDeleteClick,
  onClearAllClick
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isChatExists, setIsChatExists] = useState<Map<string, boolean>>(new Map());
  const { user } = useUserContext();
  const { chainId } = useAppKitNetwork();
  const hasCheckedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (memories.length === 0) return;
    
    const checkChat = async () => {
      for (const memory of memories) {  
        try {
          if (!memory.chatId || hasCheckedRef.current.has(memory.chatId)) continue;
          
          await createAxiosInstance().get(`/chat/${memory.chatId}`, { params: { 
            chainId,
            userId: user?.id
           } });
          setIsChatExists(prev => new Map(prev).set(memory.chatId!, true));
          hasCheckedRef.current.add(memory.chatId);
        } catch (error) {
          console.error('Error checking chat existence:', error);
          if (memory.chatId) {
            setIsChatExists(prev => new Map(prev).set(memory.chatId!, false));
            hasCheckedRef.current.add(memory.chatId);
          }
        }
      }
    };

    checkChat();
  }, [memories]);

  const handleClearAll = async () => {
    if (!user?.id) return;

    try {
      await createAxiosInstance().delete(`/user/memories/clear`, {
        params: {
          userId: user.id
        }
      });

      onClearAllClick();
    } catch (error) {
      console.error('Error clearing memories:', error);
    } finally {
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-none p-6 border-b border-[#888]/30">
          <h3 className="text-lg font-medium text-[#FCFCFC]">Memory Settings</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <div className="flex flex-col gap-1 flex-1">
                  <h4 className="text-[#FCFCFC] font-medium">Clear Long Term Memories</h4>
                  <p className="text-[#5e8284] text-sm">
                    Remove all stored long term memories from your knowledge base. This action cannot be undone.
                  </p>
                </div>
                <button
                  onClick={() => setShowConfirmation(true)}
                  disabled={isLoading || memories.length === 0}
                  className={`${baseButtonStyle} border-red-500/50 hover:border-red-500/75 px-4 py-2 text-sm rounded-full flex items-center gap-2`}
                >
                  <Trash className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              </div>

              <div className="w-[90%] mx-auto h-px bg-[#888]/30" />

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-8">
                  <div className="flex flex-col gap-1 flex-1">
                    <h4 className="text-[#FCFCFC] font-medium">Stored Memories</h4>
                    <p className="text-[#5e8284] text-sm">
                      {memories.length} {memories.length === 1 ? 'memory' : 'memories'} stored in your knowledge base
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <LoadingIcon />
                    </div>
                  ) : memories.length === 0 ? (
                    <p className="text-[#5e8284] text-sm">No memories stored yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {memories.map((memory) => (
                        <div 
                          key={memory.id} 
                          className={`${baseContainerStyle} p-4 rounded-xl relative`}
                        >
                          <button
                            onClick={() => onDeleteClick(memory.id)}
                            className="absolute right-6 top-1/2 -translate-y-1/2 transition-opacity"
                          >
                            <Trash className="w-5 h-5 text-red-500 hover:text-red-600" />
                          </button>
                          <div className="text-[#FCFCFC] text-sm whitespace-pre-wrap break-words pr-12">
                            {processText(memory.content)}
                          </div>
                          {memory.chatId && (
                            <div className="flex mt-2 text-xs">
                              {isChatExists.get(memory.chatId) ? (
                                <a href={`/chat/${memory.chatId}`} target="_blank" rel="noopener noreferrer" className="text-[#5e8284] hover:text-[#7ea9ab] transition-colors flex items-center gap-1">
                                  <span>View Related Chat</span>
                                  <RiArrowRightUpLine className="w-4 h-4" />
                                </a>
                              ) : (
                                <span className="text-[#5e8284]/50 flex items-center gap-1 cursor-not-allowed">
                                  <span>View Related Chat</span>
                                  <RiArrowRightUpLine className="w-4 h-4" />
                                  <span>(Chat was deleted)</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popup
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleClearAll}
        title="Clear Long Term Memories"
        message="Are you sure you want to clear all long term memories? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default MemorySettings; 