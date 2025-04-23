"use client"
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from "framer-motion";
import Chat from '@/components/Chat/Chat';
import Navbar from '@/components/Navbar/Navbar';
import LoadingIcon from '@/components/Base/LoadingIcon';
import { IMessage } from '@/types/message';
import { useUserContext, useSocketContext } from '@/contexts';
import { useRouter } from 'next/navigation';
import { Socket } from 'socket.io-client';
import toast from 'react-hot-toast';
import { createAxiosInstance } from '@/lib/axios';
import { useAppKitNetwork } from '@reown/appkit/react';

const globalFetchTracker = new Map<string, boolean>();

export default function ChatPage({ params }: { params: { chatId: string } }) {
 const { user } = useUserContext();
 const [messages, setMessages] = useState<IMessage[]>([]);
 const [isStreaming, setIsStreaming] = useState(false);
 const [streamStatus, setStreamStatus] = useState<string>('Lunark is thinking...');
 const socketRef = useRef<Socket | null>(null);
 const [inputValue, setInputValue] = useState('');
 const [loading, setLoading] = useState(false);
 const [initialLoading, setInitialLoading] = useState(true);
 const hasAttemptedConnection = useRef(false);
 const router = useRouter();
 const { chainId } = useAppKitNetwork();
 const [lastChunk, setLastChunk] = useState('');
 const isStreamingRef = useRef(false);
 const fetchControllerRef = useRef<AbortController | null>(null);

 const { socket, isConnected, currentChatId, stopStream, startStream, joinChat } = useSocketContext();

 const handleStreamResponse = useCallback((data: any) => {
  const message: IMessage = {
    id: data.messageId || Date.now().toString(),
    chatId: data.chatId,
    role: data.role,
    content: data.message || '', 
    transaction: data.transaction || null,
    toolData: data.toolData || null,
    memories: data.memories || [],
    userId: data.userId,
    createdAt: new Date(data.timestamp),
    updatedAt: new Date(data.timestamp)
  };
  
  if (!message.content) {
    return;
  }
  if (message.content.trim() === '') {
    return;
  }
  
  setLoading(false);
  
  if (!isStreamingRef.current && message.content.trim()) {
    isStreamingRef.current = true;
    setIsStreaming(true);
  }
  
  setMessages(prev => {
    const messageIndex = prev.findIndex(m => m.id === message.id);
    
    if (messageIndex === -1) {
      return [...prev, message];
    }

    const updatedMessages = [...prev];
    const currentMessage = prev[messageIndex];
    
    updatedMessages[messageIndex] = {
      ...currentMessage,
      content: message.content,
      memories: message.memories || currentMessage.memories
    };
    
    return updatedMessages;
  });
}, []);

 const handleStreamEnd = useCallback(() => {
  requestAnimationFrame(() => {
    isStreamingRef.current = false;
    setIsStreaming(false);
    setLoading(false);
    setLastChunk('');
  });
}, []);

 const handleStreamStatus = useCallback(({ status }: { status: string }) => {
  setStreamStatus(status);
}, []);

 useEffect(() => {
   const chatId = params.chatId;
   
   if (!chatId || !user?.id) {
     return;
   }

   // Join chat when socket is available and connected
   if (socket?.connected) {
     joinChat(chatId);
   }

   // Listen for socket connection changes
   const handleConnect = () => {
     if (chatId && user?.id) {
       joinChat(chatId);
     }
   };

   socket?.on('connect', handleConnect);

   return () => {
     socket?.off('connect', handleConnect);
     if (socket?.connected) {
       socket.emit('leaveChat', { chatId });
     }
   };
 }, [params.chatId, user?.id, socket, joinChat]);

 useEffect(() => {
   if (!socket?.connected || !currentChatId) {
     return;
   }

   socket.on('streamResponse', handleStreamResponse);
   socket.on('streamEnd', handleStreamEnd);
   socket.on('streamStatus', handleStreamStatus);

   return () => {
     socket.off('streamResponse', handleStreamResponse);
     socket.off('streamEnd', handleStreamEnd);
     socket.off('streamStatus', handleStreamStatus);
   };
 }, [socket?.connected, currentChatId, handleStreamResponse, handleStreamEnd, handleStreamStatus]);

 useEffect(() => {
   if (!user?.id || !params.chatId || globalFetchTracker.get(params.chatId)) return;
   
   globalFetchTracker.set(params.chatId, true);
   
   let isMounted = true;
   fetchControllerRef.current = new AbortController();
   let attempts = 0;
   const maxAttempts = 5;

   const fetchMessages = async () => {
     if (!isMounted || attempts >= maxAttempts) return;
     
     try {
       const { data } = await createAxiosInstance().get(`/chat/${params.chatId}`, {
         params: { userId: user?.id },
         signal: fetchControllerRef.current?.signal
       });

       if (!isMounted) return;

       if (data.userId !== user?.id) {
         router.push('/');
         return;
       }
       
       if (data?.messages?.length > 0) {
         setMessages(data.messages);
         setInitialLoading(false);
         return;
       }
       
       attempts++;
       if (attempts >= maxAttempts) {
         setInitialLoading(false);
         router.push('/');
       } else {
         setTimeout(fetchMessages, 250);
       }
     } catch (error) {
       if (!isMounted) return;
       setInitialLoading(false);
     }
   };

   fetchMessages();
   
   return () => {
     isMounted = false;
     fetchControllerRef.current?.abort();
     fetchControllerRef.current = null;
   };
 }, [user?.id, params.chatId, router]);

 useEffect(() => {
   return () => {
     globalFetchTracker.delete(params.chatId);
   };
 }, [params.chatId]);

 useEffect(() => {
   const lastMessage = messages[messages.length - 1];
   
   if (lastMessage?.role === 'user' && !isStreaming) {
     const previousMessage = messages[messages.length - 2];
     if (!previousMessage || previousMessage.role === 'lunark') {
       setLoading(true);
       
       const currentTime = new Date().getTime();
       const messageTime = new Date(lastMessage.createdAt).getTime();
       const timeDifference = (currentTime - messageTime) / 1000 / 60;
       
       if (timeDifference >= 5) {
         setLoading(false);
       }
     }
   }
 }, [messages, isStreaming]);

 const handleSubmit = async (value: string) => {
  if (!value.trim() || !chainId || loading || isStreaming) {
    return;
  }
  if (!isConnected) {
    return;
  }
    
  const tempUserMessage: IMessage = {
    id: Date.now().toString(),  
    chatId: params.chatId,
    role: 'user',
    content: value,
    transaction: null,
    toolData: null,
    memories: [],
    userId: user?.id || '',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  setMessages(prev => [...prev, tempUserMessage]);
  setInputValue('');
  setLoading(true);
  
  isStreamingRef.current = false;
  setIsStreaming(false);
  setLastChunk('');

  try {
    if (isStreamingRef.current) {
      stopStream();
      socket?.emit('streamAbort', { chatId: params.chatId });
      isStreamingRef.current = false;
      setIsStreaming(false);
      setLoading(false);
      return;
    }
    
    startStream();
    await createAxiosInstance().post(`/chat/${params.chatId}/message`, {
      content: value,
      chainId,
      userId: user?.id
    });
  } catch (error: any) {
    console.error('Failed to send message:', error);
    setMessages(prev => prev.filter(msg => msg.id !== tempUserMessage.id));
    setLoading(false);
    toast.error('Failed to send message');
  }
};

 const handleStreamControl = useCallback(() => {
   if (isStreamingRef.current) {
     stopStream();
     socket?.emit('streamAbort', { chatId: params.chatId });
     isStreamingRef.current = false;
     setIsStreaming(false);
     setLoading(false);
     setStreamStatus('Lunark is thinking...');
   }
 }, [stopStream, socket, params.chatId]);

 useEffect(() => {
   const handleKeyDown = (e: KeyboardEvent) => {
     if (e.key === 'Escape' && isStreamingRef.current) {
       handleStreamControl();
     }
   };
  
   window.addEventListener('keydown', handleKeyDown);
   return () => window.removeEventListener('keydown', handleKeyDown);
 }, [handleStreamControl]);

 return (
   <main className="flex flex-col w-screen min-h-screen bg-black overflow-hidden py-6">
     <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
       <Navbar />
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="w-full max-w-3xl mx-auto relative min-h-[calc(100vh-212px)]"
       >
         {initialLoading ? (
           <div className="absolute inset-0 flex items-center justify-center">
             <LoadingIcon />
           </div>
         ) : (
           <Chat 
             messages={messages}
             inputValue={inputValue}
             isConnected={!loading && isConnected && !initialLoading}
             onSubmit={handleSubmit}
             onInputChange={setInputValue}
             loading={loading}
             isStreaming={isStreaming}
             onStreamControl={handleStreamControl}
             socketStatus={streamStatus}
           />
         )}
       </motion.div>
     </div>
   </main>
 );
}