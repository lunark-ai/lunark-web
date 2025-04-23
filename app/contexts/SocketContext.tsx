"use client";
import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUserContext } from '@/contexts';
import { IMessage } from '@/types/message';
import toast from 'react-hot-toast';

interface SocketContextState {
  socket: Socket | null;
  isConnected: boolean;
  currentChatId: string;
  reconnectionAttempts: number;
}

interface SocketContextValue extends SocketContextState {
  joinChat: (chatId: string) => void;
  leaveChat: () => void;
  stopStream: () => void;
  startStream: () => Promise<void>;
}

const initialState: SocketContextState = {
  socket: null,
  isConnected: false,
  currentChatId: '',
  reconnectionAttempts: 0
};

export const SocketContext = createContext<SocketContextValue>({
  ...initialState,
  joinChat: () => {},
  leaveChat: () => {},
  stopStream: () => {},
  startStream: async () => {},
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentChatId, setCurrentChatId] = useState('');
  const reconnectCount = useRef(0);
  const { user } = useUserContext();

  const initializeSocket = useCallback(() => {
    if (!user?.id) {
      return null;
    }

    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken) {
      return null;
    }

    // Clean up existing socket if it exists
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
    }

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
      timeout: 5000,
      auth: {
        userId: user.id,
        sessionToken
      }
    });

    newSocket.on('connect_error', (error) => {
      reconnectCount.current += 1;
      if (reconnectCount.current >= 3) {
        newSocket.disconnect();
        setIsConnected(false);
      }
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      reconnectCount.current = 0;
    });

    newSocket.on('error', ({ message }) => {
      setIsConnected(false);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      setCurrentChatId('');
    });

    newSocket.on('joinedChat', ({ chatId }) => {
      setCurrentChatId(chatId);
    });

    setSocket(newSocket);
    return newSocket;
  }, [user?.id]);

  const joinChat = useCallback((chatId: string) => {
    if (!chatId || !user?.id) {
      return;
    }

    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken) {
      return;
    }

    if (!socket?.connected) {
      const newSocket = initializeSocket();
      if (!newSocket) {
        return;
      }
      
      // Wait for connection before joining
      newSocket.on('connect', () => {
        newSocket.emit('joinChat', {
          chatId,
          userId: user.id,
          sessionToken
        });
      });
    } else {
      socket.emit('joinChat', {
        chatId,
        userId: user.id,
        sessionToken
      });
    }
  }, [user?.id, socket, initializeSocket]);

  const leaveChat = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
      setCurrentChatId('');
    }
  }, [socket]);

  const stopStream = useCallback(() => {
    if (socket?.connected && currentChatId) {
      socket.emit('stopStream');
    }
  }, [socket, currentChatId]);

  const startStream = useCallback(async () => {
    if (!socket?.connected || !currentChatId) return;
    socket.emit('streamStart');
  }, [socket, currentChatId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
      }
    };
  }, [socket]);

  // Handle socket cleanup on user change
  useEffect(() => {
    if (!user?.id) {
      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
      }
      setIsConnected(false);
      setCurrentChatId('');
    }
  }, [user?.id, socket]);

  // Initialize socket on mount
  useEffect(() => {
    if (user?.id && !socket) {
      initializeSocket();
    }
  }, [user?.id, initializeSocket]);

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      currentChatId,
      reconnectionAttempts: reconnectCount.current,
      joinChat,
      leaveChat,
      stopStream,
      startStream,
    }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocketContext = () => useContext(SocketContext); 