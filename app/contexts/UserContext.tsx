"use client";
import { useAppKitAccount, useAppKitNetwork, useAppKitProvider, useDisconnect } from "@reown/appkit/react";
import React, { useEffect, useState, useContext } from "react";
import { useAppKitContext, useGlobalContext } from ".";
import toast from "react-hot-toast";
import { JsonRpcProvider, BrowserProvider } from "ethers";
import { useRouter } from "next/navigation";
import TermsOfServicePopup from "@/components/Popup/TermsOfServicePopup";
import { createAxiosInstance } from "@/lib/axios";
import axios from "axios";

interface IUserContextProps {
  user: any | undefined;
  setUser: (user: any | undefined) => void;
  isConnecting: boolean;
  isDisconnecting: boolean;
  disconnect: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

export const UserContext = React.createContext<IUserContextProps>({
  user: undefined,
  setUser: (user: any | undefined) => {},
  isConnecting: false,
  isDisconnecting: false,
  disconnect: async () => {},
  refetchUser: async () => {}
});

export const UserContextProvider = (props: any) => {
  const { defaultProvider, setDefaultProvider, ethersProvider, setEthersProvider, ethersSigner, setEthersSigner } = useGlobalContext();
  const { appKitNetworks } = useAppKitContext();
  const { walletProvider } = useAppKitProvider('eip155');
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const disconnectWallet = useDisconnect();
  const [user, setUser] = useState<any | undefined>(undefined);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isDisconnecting, setIsDisconnecting] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!user || !(user.sessionToken)) return;

    const verifySession = async () => {
      try {
        const sessionToken = localStorage.getItem('sessionToken');
        
        if (!sessionToken || sessionToken !== user.sessionToken) {
          if (user) {
            await disconnect();
            router.push('/');
          }
          return;
        }

        const response = await axios.post('/api/auth/verify', {
          userId: user.id,
          sessionToken
        });

        if (!response.data.valid) {
          await disconnect();
          router.push('/');
        }
      } catch (error) {
        await disconnect();
        router.push('/');
      }
    };

    const interval = setInterval(verifySession, 60 * 60 * 1000);
    verifySession(); 
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
      if (defaultProvider || !address || !isConnected) return;

      const currentNetwork = appKitNetworks.find((net: any) => net.id === chainId);
      if (!currentNetwork) return;
  
      const defaultProviderTemp = new JsonRpcProvider(currentNetwork.rpcUrls.default.http[0]);
      setDefaultProvider(defaultProviderTemp);
  }, [chainId, address, isConnected]);

  useEffect(() => {
      if (!walletProvider || ethersProvider || !address || !isConnected) return;

      const ethersProviderTemp = new BrowserProvider(walletProvider as any, "any");
      setEthersProvider(ethersProviderTemp);
  }, [walletProvider, address, isConnected]);

  const refetchUser = async () => {
    try {
      const response = await axios.get(`/api/user/${address}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
      if (!ethersProvider) return;

      const updateEthersSigner = async () => {
        const ethersSignerTemp = await ethersProvider.getSigner();
        setEthersSigner(ethersSignerTemp);
      };

      updateEthersSigner();
  }, [ethersProvider]);

  const checkAndCreateUser = async () => {
    const address = await ethersSigner.getAddress();
    
    try {
      try {
        const response = await axios.get(`/api/user/${address}`);
        const userData = response.data;
        
        if (!userData.sessionToken) {
          const sessionResponse = await axios.post('/api/auth/login', {
            user: userData
          });
          userData.sessionToken = sessionResponse.data.sessionToken;
          localStorage.setItem('sessionToken', sessionResponse.data.sessionToken);
        } else {
          localStorage.setItem('sessionToken', userData.sessionToken);
        }
        
        setUser(userData);
      } catch (error: any) {
        if (error.response?.status === 404 || error.response?.status === 403) {
          const { data } = await createAxiosInstance().post('/user', { address });
          setUser(data.user);
          localStorage.setItem('sessionToken', data.token);
          data.user.sessionToken = data.token;
        } else {
          throw error;
        }
      }
    } catch (error) {
      toast.error('Failed to authenticate. Please try again.');
    }
  };

  useEffect(() => {
    if (!address || !isConnected || !ethersSigner || isDisconnecting) return;

    checkAndCreateUser();
  }, [address, isConnected, ethersSigner, isDisconnecting]);

  useEffect(() => {
    if (!address || !isConnected) {
      setIsConnecting(false);
      return;
    }
    setIsConnecting(true);
  }, [address, isConnected]);

  
  const disconnect = async () => {
    try {
      setIsDisconnecting(true);
      if (user?.id) {
        try {
          await axios.post('/api/auth/logout', {
            userId: user.id
          });
        } catch (error) {}
      }
      await disconnectWallet.disconnect();
      setEthersProvider(undefined);
      setEthersSigner(undefined);
      setUser(undefined);
      localStorage.removeItem('sessionToken');
      setIsDisconnecting(false);
      router.push('/'); 
    } catch (error) {
      toast.error('Failed to sign out. Please try again.');
      setIsDisconnecting(false);
    }
  };

  useEffect(() => {
    if (!window || !window.ethereum || !user) return;

    const handleAccountsChanged = (accounts: string[]) => {
      disconnect();
    };

    (window.ethereum as any).on('accountsChanged', handleAccountsChanged);

    return () => {
      (window.ethereum as any).removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);
  
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isConnecting,
        isDisconnecting,
        disconnect,
        refetchUser
      }}
    >
      {props.children}
      <TermsOfServicePopup />
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);