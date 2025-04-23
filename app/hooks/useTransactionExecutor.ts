import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import { useCallback } from 'react';

export const useTransactionExecutor = () => {
  const executeTransaction = useCallback(async (tx: any) => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      
      const network = await provider.getNetwork();
      if (network.chainId !== tx.chainId) {
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: ethers.toQuantity(tx.chainId) }],
        });
      }

      const transaction = await signer.sendTransaction({
        to: tx.to,
        value: tx.value || '0',
        data: tx.data || '0x',
      });

      const receipt = await transaction.wait();
      toast.success('Transaction successful');
      return receipt;
    } catch (error: any) {
      let errorMessage = 'Unknown error occurred';
      
      if (error.code === 4001) {
        errorMessage = 'Transaction rejected by user';
      } else if (error.message?.includes('insufficient funds')) {
        errorMessage = 'Transaction failed: Insufficient funds';
      } else if (error.reason) {
        errorMessage = error.reason;
      } else if (error.data) {
        try {
          const decodedError = error.error?.data?.originalError?.data || error.data;
          if (typeof decodedError === 'string') {
            try {
              const abiCoder = new ethers.AbiCoder();
              const reason = abiCoder.decode(['string'], decodedError)[0];
              if (reason) errorMessage = reason;
            } catch {
              const match = decodedError.match(/execution reverted: (.*?)"/);
              if (match?.[1]) errorMessage = match[1];
            }
          }
        } catch {
          errorMessage = error.info?.error?.message || error.message || errorMessage;
        }
      } else if (error.info?.error?.message) {
        errorMessage = 'Transaction failed: ' + error.info.error.message;
      } else if (error.message) {
        errorMessage = 'Transaction failed: ' + error.message;
      }

      toast.error(errorMessage);
      throw error;
    }
  }, []);

  return { executeTransaction };
};