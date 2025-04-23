"use client";

import { useEffect, useState } from 'react';
import { useUserContext } from '@/contexts';
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { Network, ArrowRight, InfoCircle, PlusCircle, Dollar } from 'iconoir-react';
import { createAxiosInstance } from '@/lib/axios';
import LoadingIcon from '@/components/Base/LoadingIcon';
import Navbar from '@/components/Navbar/Navbar';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import BalancePopup from '@/components/Popup/BalancePopup';
import { useRouter } from 'next/navigation';
import { baseButtonStyle, networks } from '@/constants';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import InfoButton from '@/components/Base/InfoButton';
import { Network as NetworkIcon } from 'iconoir-react';
import { INetwork } from '@/types/networks';
import WalletOnboarding from '@/components/Onboarding/WalletOnboarding';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  address: string;
  logoURI?: string;
  priceChange?: number;
  chainId: number;
  isNative?: boolean;
}

interface PaymentHistory {
  date: string;
  amount: number;
}

interface Usage {
  id: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  totalCost: number;
  createdAt: string;
  chat: {
    title: string;
  };
}

interface PaginationInfo {
  total: number;
  pages: number;
  currentPage: number;
  limit: number;
}

const WalletPage = () => {
  const { user } = useUserContext();
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const router = useRouter();
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [usages, setUsages] = useState<Usage[]>([]);
  const [usagePagination, setUsagePagination] = useState<PaginationInfo>({ total: 0, pages: 0, currentPage: 1, limit: 5 });
  const [tokenPage, setTokenPage] = useState(1);
  const tokensPerPage = 5;
  const [isBalancePopupOpen, setIsBalancePopupOpen] = useState(false);
  const [isBalancePopupLoading, setIsBalancePopupLoading] = useState(false);
  const [balanceChange, setBalanceChange] = useState({ value: 0, percentage: 0 });
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!address || !chainId || !user?.id) return;
    const loadData = async () => {
      try {
        await Promise.all([
          fetchPaymentHistory(),
        ]);
        calculateBalanceChange();
      } finally {
        setIsPageLoading(false);
      }
    };
    
    loadData();
    fetchUsageHistory(1);
  }, [address, user?.id]);

  useEffect(() => {
    if (isPageLoading) return;

    const hasCompletedWalletOnboarding = localStorage.getItem('hasCompletedWalletOnboarding');
    
    if (hasCompletedWalletOnboarding) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  }, [isPageLoading])

  useEffect(() => {
    if (!address || !chainId) return;
    fetchTokenBalances();
  }, [address, chainId]);

  const fetchTokenBalances = async () => {
    try {
      setIsLoadingBalances(true);
      
      // Fetch ERC20 tokens
      const tokenResponse = await createAxiosInstance().get(`/token-balances?address=${address}&chainId=${chainId}`);
      let newBalances = tokenResponse.data.balances || [];
      
      try {
        // Fetch native token separately with error handling
        const nativeResponse = await createAxiosInstance().get(`/native-balance?address=${address}&chainId=${chainId}`);
        if (nativeResponse.data) {
          const nativeToken = {
            ...nativeResponse.data,
            chainId,
            isNative: true
          };
          newBalances = [nativeToken, ...newBalances];
        }
      } catch (nativeError) {
        console.error('Failed to fetch native balance:', nativeError);
        // Continue with ERC20 tokens even if native token fetch fails
      }

      // Add chainId to each token balance
      newBalances = newBalances.map((balance: TokenBalance) => ({
        ...balance,
        chainId
      }));

      // Filter out old balances from the current network and merge with new ones
      const filteredBalances = tokenBalances.filter(token => token.chainId !== chainId);
      setTokenBalances([...filteredBalances, ...newBalances]);
      
    } catch (error: any) {
      console.error('Failed to fetch token balances:', error.response?.data?.error || error);
      // Keep old balances if fetch fails
      setTokenBalances(prev => prev.filter(token => token.chainId !== chainId));
    } finally {
      setIsLoadingBalances(false);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      if (!user?.id) return;
      const response = await createAxiosInstance().get(`/payments/history?userId=${user.id}`);
      setPaymentHistory(response.data);
      if (response.data.length >= 2) {
        calculateBalanceChange(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch payment history');
    }
  };

  const fetchUsageHistory = async (page: number) => {
    try {
      if (!user?.id) return;
      const response = await createAxiosInstance().get(`/usage/history?userId=${user.id}&page=${page}&limit=5`);
      setUsages(response.data.usages);
      setUsagePagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch usage history');
    }
  };

  const handleBalanceSelect = async (amount: number) => {
    try {
      setIsBalancePopupLoading(true);
      const response = await createAxiosInstance().post('/add-balance', { price: amount, userId: user.id });
      router.push(response.data.url);
    } catch (error: any) {
      console.error(error.response?.data?.error || 'Failed to add balance');
    } finally {
      setIsBalancePopupLoading(false);
    }
  };

  const calculateBalanceChange = (history = paymentHistory) => {
    if (history.length < 2) {
      setBalanceChange({ value: 0, percentage: 0 });
      return;
    }
    
    const currentBalance = history[history.length - 1].amount;
    const previousBalance = history[history.length - 2].amount;
    const change = currentBalance - previousBalance;
    const percentage = previousBalance !== 0 ? (change / previousBalance) * 100 : 0;

    setBalanceChange({
      value: change,
      percentage: percentage
    });
  };

  const chartData = {
    labels: paymentHistory.length === 1 
      ? ['Start', 'Current'] 
      : paymentHistory.map(p => p.date),
    datasets: [
      {
        fill: true,
        label: 'Balance History',
        data: paymentHistory.length === 1 
          ? [0, paymentHistory[0].amount]  // If only one value, start from 0
          : paymentHistory.map(p => Number(p.amount)),
        borderColor: '#FCFCFC',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(252, 252, 252, 0.12)');
          gradient.addColorStop(1, 'rgba(252, 252, 252, 0)');
          return gradient;
        },
        tension: 0.4,
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#FCFCFC',
        pointHoverBorderColor: '#000000',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FCFCFC',
        bodyColor: '#FCFCFC',
        padding: 12,
        displayColors: false,
        callbacks: {
          title: function(context: any) {
            if (paymentHistory.length === 1 && context[0].dataIndex === 0) {
              return 'Start';
            }
            return context[0].label;
          },
          label: function(context: any) {
            return `$${context.raw.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      y: {
        display: false,
        min: 0, // Always start from 0
      },
      x: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest' as const,
    },
    elements: {
      line: {
        borderJoinStyle: 'round' as const,
      }
    },
  };

  const getNetworkName = (chainId: number) => {
    const network = networks.find((n: INetwork) => n.chainId === chainId);
    return network ? network.name : 'Unknown';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Update paginatedTokens to only show current network tokens
  const currentNetworkTokens = tokenBalances.filter(token => token.chainId === chainId);
  const totalPages = Math.ceil(currentNetworkTokens.length / tokensPerPage);
  const paginatedTokens = currentNetworkTokens.slice(
    (tokenPage - 1) * tokensPerPage,
    tokenPage * tokensPerPage
  );

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasCompletedWalletOnboarding', 'true');
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="flex flex-col w-screen min-h-screen bg-black py-6 pb-24"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 flex-1 flex flex-col">
        <Navbar />
        
        <div className="w-full max-w-5xl mx-auto sm:px-0 px-4 flex-1 flex flex-col mt-12 gap-6">
          {isPageLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <LoadingIcon />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4 mb-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl text-[#FCFCFC] uppercase tracking-[0.25rem]">Platform Balance</h2>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-4 w-full sm:w-auto">
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      {['all', '1m', '3m', '1y'].map((range) => (
                        <button
                          key={range}
                          onClick={() => setSelectedTimeRange(range)}
                          className={`flex-1 sm:flex-none border border-[#5e8284]/20 px-4 py-1.5 rounded-lg text-sm ${
                            selectedTimeRange === range 
                              ? 'bg-[#FCFCFC]/10 text-[#FCFCFC]' 
                              : 'text-[#5e8284] hover:text-[#FCFCFC] hover:bg-[#FCFCFC]/5'
                          }`}
                        >
                          {range === 'all' ? <div><span className="flex sm:hidden">All</span><span className="hidden sm:block">All time</span></div> : range.toUpperCase()}
                        </button>
                      ))}
                    </div>
                    <button
                      data-onboarding="add-balance"
                      onClick={() => setIsBalancePopupOpen(true)}
                      className={`${baseButtonStyle} w-fit mx-auto sm:mx-0 flex items-center justify-center gap-2 px-4 py-2 text-sm hover:bg-[#FCFCFC]/10 rounded-lg`}
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add Balance
                    </button>
                  </div>
                </div>
                <div className="flex items-baseline gap-3 mb-6 sm:mt-0 mt-6">
                  <div data-onboarding="balance" className="text-4xl w-fit font-medium text-[#FCFCFC]">
                    ${user?.balance?.toFixed(2) || '0.00'}
                  </div>
                  {balanceChange.percentage !== 0 && (
                    <div className={`flex items-center gap-1 text-sm ${balanceChange.percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {balanceChange.percentage >= 0 ? '↑' : '↓'} {Math.abs(balanceChange.percentage).toFixed(2)}%
                    </div>
                  )}
                </div>
                <div className="h-[200px] sm:h-[300px] w-full mb-8 rounded-2xl overflow-hidden">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
                <div data-onboarding="tokens">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col gap-3 sm:gap-1 w-full">
                      <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row items-start sm:items-center justify-between w-full">
                        <h2 className="text-xl text-[#FCFCFC] uppercase tracking-[0.25rem]">
                          Tokens <span className="text-[#5e8284] text-sm">({address ? formatAddress(address) : '...'})</span>
                        </h2>
                        {typeof chainId === 'number' && (
                          <div className="flex items-center gap-2 sm:ml-auto">
                            <img 
                              src={networks.find(n => n.chainId === chainId)?.icon} 
                              alt={getNetworkName(chainId)}
                              className="w-4 h-4 object-contain rounded-full"
                            />
                            <span className="text-[#5e8284] text-sm">
                              {getNetworkName(chainId)}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-[#5e8284] text-sm">View your (supported) token balances on connected network</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {isLoadingBalances ? (
                      <div className="flex items-center justify-center py-12">
                        <LoadingIcon />
                      </div>
                    ) : paginatedTokens.length > 0 ? (
                      paginatedTokens.map((token, index) => (
                        <motion.div 
                          key={token.address || 'native'} 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.5,
                            delay: index * 0.1,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className="flex items-center justify-between py-4 border-b border-[#5e8284]/20"
                        >
                          <div className="flex items-center gap-4">
                            {token.logoURI ? (
                              <img src={token.logoURI} alt={token.symbol} className="h-10 w-10 rounded-full" />
                            ) : (
                              <div className={`h-10 w-10 rounded-full ${token.isNative ? 'bg-gradient-to-br from-[#FCFCFC]/30 to-[#FCFCFC]/10' : 'bg-gradient-to-br from-[#FCFCFC]/20 to-[#FCFCFC]/5'} flex items-center justify-center`}>
                                <span className="text-base font-medium text-[#FCFCFC]">{token.symbol.slice(0, 2)}</span>
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-base font-medium text-[#FCFCFC]">{token.symbol}</span>
                                {token.isNative && (
                                  <span className="text-xs text-[#5e8284] px-1.5 py-0.5 rounded-full border border-[#5e8284]/20">
                                    Native
                                  </span>
                                )}
                              </div>
                              <div className="text-[#5e8284] text-sm">{token.name}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-base font-medium text-[#FCFCFC]">
                              {parseFloat(token.balance).toFixed(4)} {token.symbol}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center py-12">
                        <p className="text-[#5e8284] text-sm">No tokens found or failed to load balances</p>
                      </div>
                    )}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <button
                        onClick={() => setTokenPage(p => Math.max(1, p - 1))}
                        disabled={tokenPage === 1}
                        className={`${baseButtonStyle} px-4 py-2 rounded-lg text-sm ${
                          tokenPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FCFCFC]/10'
                        }`}
                      >
                        Previous
                      </button>
                      <span className="text-[#5e8284]">
                        Page {tokenPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setTokenPage(p => Math.min(totalPages, p + 1))}
                        disabled={tokenPage === totalPages}
                        className={`${baseButtonStyle} px-4 py-2 rounded-lg text-sm ${
                          tokenPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FCFCFC]/10'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>

                <div data-onboarding="usage">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-xl text-[#FCFCFC] uppercase tracking-[0.25rem]">Usage History</h2>
                      <p className="text-[#5e8284] text-sm">Track your AI usage and associated costs</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {usages.length > 0 ? usages.map((usage, index) => (
                      <motion.div 
                        key={usage.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5,
                          delay: index * 0.1,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="flex items-center justify-between py-4 border-b border-[#5e8284]/20"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-[#FCFCFC]/10 flex items-center justify-center">
                            <Dollar className="h-5 w-5 text-[#FCFCFC]" />
                          </div>
                          <div className="text-base font-medium text-[#FCFCFC]">
                            ${usage.totalCost.toFixed(4)}
                          </div>
                        </div>
                        <div className="text-[#5e8284] text-xs sm:text-sm">
                          {new Date(usage.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </motion.div>
                    )) : (
                      <div className="flex items-center justify-center py-12">
                        <p className="text-[#5e8284] text-sm">No usage history found</p>
                      </div>
                    )}
                  </div>

                  {usagePagination.pages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <button
                        onClick={() => fetchUsageHistory(Math.max(1, usagePagination.currentPage - 1))}
                        disabled={usagePagination.currentPage === 1}
                        className={`${baseButtonStyle} px-4 py-2 rounded-lg text-sm ${
                          usagePagination.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FCFCFC]/10'
                        }`}
                      >
                        Previous
                      </button>
                      <span className="text-[#5e8284]">
                        Page {usagePagination.currentPage} of {usagePagination.pages}
                      </span>
                      <button
                        onClick={() => fetchUsageHistory(Math.min(usagePagination.pages, usagePagination.currentPage + 1))}
                        disabled={usagePagination.currentPage === usagePagination.pages}
                        className={`${baseButtonStyle} px-4 py-2 rounded-lg text-sm ${
                          usagePagination.currentPage === usagePagination.pages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FCFCFC]/10'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <BalancePopup 
        isOpen={isBalancePopupOpen}
        onClose={() => setIsBalancePopupOpen(false)}
        onSelect={handleBalanceSelect}
        loading={isBalancePopupLoading}
      />
      <WalletOnboarding 
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </motion.main>
  );
};

export default WalletPage; 