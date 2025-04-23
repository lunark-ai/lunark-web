"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface IStatus {
  status: string;
  timestamp: string;
  uptime: number;
  version: string;
}

interface IGlobalContextProps {
  defaultProvider: any | undefined;
  setDefaultProvider: (defaultProvider: any | undefined) => void;
  ethersProvider: any | undefined;
  setEthersProvider: (ethersProvider: any | undefined) => void;
  ethersSigner: any | undefined;
  setEthersSigner: (ethersSigner: any | undefined) => void;
  status: IStatus | undefined;
  fetchStatus: () => Promise<void>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (isOpen: boolean) => void;
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  ethersProvider: undefined,
  setEthersProvider: (ethersProvider: any | undefined) => {},
  defaultProvider: undefined,
  setDefaultProvider: (defaultProvider: any | undefined) => {},
  ethersSigner: undefined,
  setEthersSigner: (ethersSigner: any | undefined) => {},
  status: undefined,
  fetchStatus: async () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
  isSettingsOpen: false,
  setIsSettingsOpen: () => {},
  selectedMenu: 'general',
  setSelectedMenu: () => {}
});

export const GlobalContextProvider = (props: any) => {
  const [defaultProvider, setDefaultProvider] = useState<any | undefined>(undefined);
  const [ethersProvider, setEthersProvider] = useState<any | undefined>(undefined);
  const [ethersSigner, setEthersSigner] = useState<any | undefined>(undefined);
  const [status, setStatus] = useState<IStatus | undefined>(undefined);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('general');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const systemPreference = mediaQuery.matches
    
    const savedPreference = localStorage.getItem('darkMode')
    const initialDarkMode = savedPreference ? savedPreference === 'true' : systemPreference
    
    setIsDarkMode(initialDarkMode)
    if (initialDarkMode) {
      document.documentElement.classList.add('dark')
    }
  
    const handler = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('darkMode') === null) {
        setIsDarkMode(e.matches)
        if (e.matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }
  
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('darkMode', String(newValue))
      if (newValue) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return newValue
    })
  }

  const fetchStatus = async () => {
    try {
      const response = await axios.get('/api/status');
      setStatus(response.data);
      return response.data;
    } catch (error) {
      console.error('Could not fetch status:', error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);
  
  return (
    <GlobalContext.Provider
      value={{
        defaultProvider,
        setDefaultProvider,
        ethersProvider,
        setEthersProvider,
        ethersSigner,
        setEthersSigner,
        status,
        fetchStatus,
        isDarkMode, 
        toggleDarkMode,
        isSettingsOpen,
        setIsSettingsOpen,
        selectedMenu,
        setSelectedMenu
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => React.useContext(GlobalContext);