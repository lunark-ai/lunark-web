import { INetwork } from "./types/networks";
import { BalanceOption } from "./types/balance";

export const networks: INetwork[] = [
  {
    id: 'eth',
    name: 'Ethereum',
    chainId: 1,
    icon: '/images/chains/ethereum.png',
    rpcUrl: 'https://ethereum-rpc.publicnode.com',
    explorerUrl: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logoURI: '/images/chains/ethereum.png'
    }
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    chainId: 42161,
    icon: '/images/chains/arbitrum.png',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorerUrl: 'https://arbiscan.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logoURI: '/images/chains/ethereum.png'
    }
  },
  {
    id: 'polygon',
    name: 'Polygon',
    chainId: 137,
    icon: '/images/chains/polygon.png',
    rpcUrl: 'https://polygon-bor-rpc.publicnode.com',
    explorerUrl: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'Polygon',
      symbol: 'MATIC',
      decimals: 18,
      logoURI: '/images/chains/polygon.png'
    }
  },
  {
    id: 'eth-holesky',
    name: 'Holesky',
    chainId: 17000,
    icon: '/images/chains/ethereum.png',
    rpcUrl: 'https://ethereum-holesky.publicnode.com',
    explorerUrl: 'https://holesky.etherscan.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logoURI: '/images/chains/ethereum.png'
    }
  },
  {
    id: 'bnb',
    name: 'BNB Chain',
    chainId: 56,
    icon: '/images/chains/bnbchain.png',
    rpcUrl: 'https://bsc-dataseed1.bnbchain.org',
    explorerUrl: 'https://bscscan.com',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
      logoURI: '/images/chains/bnbchain.png'
    }
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    chainId: 43114,
    icon: '/images/chains/avalanche.png',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorerUrl: 'https://snowtrace.io',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
      logoURI: '/images/chains/avalanche.png'
    }
  },
  {
    id: 'optimism',
    name: 'Optimism',
    chainId: 10,
    icon: '/images/chains/optimism.png',
    rpcUrl: 'https://optimism-rpc.publicnode.com',
    explorerUrl: 'https://optimistic.etherscan.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logoURI: '/images/chains/ethereum.png'
    }
  },
  {
    id: 'base',
    name: 'Base',
    chainId: 8453,
    icon: '/images/chains/base.png',
    rpcUrl: 'https://base-rpc.publicnode.com',
    explorerUrl: 'https://basescan.org',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      logoURI: '/images/chains/ethereum.png'
    }
  },
  {
    id: 'metis',
    name: 'Metis',
    chainId: 1088,
    icon: '/images/chains/metis.png',
    rpcUrl: 'https://metis-rpc.publicnode.com:443',
    explorerUrl: 'https://andromeda-explorer.metis.io',
    nativeCurrency: {
      name: 'Metis',
      symbol: 'METIS',
      decimals: 18,
      logoURI: '/images/chains/metis.png'
    }
  },
  {
    id: 'celo',
    name: 'Celo',
    chainId: 42220,
    icon: '/images/chains/celo.png',
    rpcUrl: 'https://celo-rpc.publicnode.com',
    explorerUrl: 'https://celoscan.io',
    nativeCurrency: {
      name: 'Celo',
      symbol: 'CELO',
      decimals: 18,
      logoURI: '/images/chains/celo.png'
    }
  },
  {
    id: 'cronos',
    name: 'Cronos',
    chainId: 25,
    icon: '/images/chains/cronos.png',
    rpcUrl: 'https://cronos-evm-rpc.publicnode.com',
    explorerUrl: 'https://cronoscan.com',
    nativeCurrency: {
      name: 'Cronos',
      symbol: 'CRO',
      decimals: 18,
      logoURI: '/images/chains/cronos.png'
    }
  },
  {
    id: 'gnosis',
    name: 'Gnosis',
    chainId: 100,
    icon: '/images/chains/gnosis.png',
    rpcUrl: 'https://gnosis-rpc.publicnode.com',
    explorerUrl: 'https://gnosisscan.io',
    nativeCurrency: {
      name: 'xDAI',
      symbol: 'xDAI',
      decimals: 18,
      logoURI: '/images/chains/gnosis.png'
    }
  },
  {
    id: 'kava',
    name: 'Kava',
    chainId: 2222,
    icon: '/images/chains/kava.png',
    rpcUrl: 'https://kava-evm-rpc.publicnode.com',
    explorerUrl: 'https://explorer.kava.io',
    nativeCurrency: {
      name: 'Kava',
      symbol: 'KAVA',
      decimals: 18,
      logoURI: '/images/chains/kava.png'
    }
  },
  {
    id: 'mantle',
    name: 'Mantle',
    chainId: 5000,
    icon: '/images/chains/mantle.png',
    rpcUrl: 'https://mantle-rpc.publicnode.com',
    explorerUrl: 'https://explorer.mantle.xyz',
    nativeCurrency: {
      name: 'Mantle',
      symbol: 'MNT',
      decimals: 18,
      logoURI: '/images/chains/mantle.png'
    }
  }
];

export const balanceOptions: BalanceOption[] = [
  {
    price: 5,
    isRecommended: true
  },
  {
    price: 20
  },
  {
    price: 50
  },
  {
    price: 200
  }
];

export const baseButtonStyle = `
  bg-[radial-gradient(70%_70%_at_center,rgba(8,10,12,0.98)_0%,rgba(160,165,180,0.25)_100%)]
  backdrop-blur-sm
  border border-[#888]/30
  transition-all duration-400 ease-in-out
  shadow-[0_0_10px_rgba(0,0,0,0.2),inset_0_0_20px_4px_rgba(0,0,0,0.3)]
  hover:border-[#aaa]/75
  hover:bg-[radial-gradient(70%_70%_at_center,rgba(8,10,12,0.98)_0%,rgba(160,165,180,0.5)_100%)]
  hover:shadow-[0_0_15px_rgba(0,0,0,0.3),inset_0_0_25px_6px_rgba(0,0,0,0.3)]
  active:shadow-[0_0_20px_rgba(0,0,0,0.4),inset_0_0_30px_8px_rgba(0,0,0,0.3)]
  disabled:!opacity-50 
  disabled:pointer-events-none 
  disabled:cursor-not-allowed
`;

export const baseContainerStyle = `
  bg-[radial-gradient(70%_70%_at_center,rgba(8,10,12,0.98)_0%,rgba(160,165,180,0.25)_100%)]
  backdrop-blur-sm
  border border-[#888]/30
  shadow-[0_0_10px_rgba(0,0,0,0.2),inset_0_0_20px_4px_rgba(0,0,0,0.3)]
`;

export const baseContainerStyleCss = {
  background: "radial-gradient(70% 70% at center, rgba(8,10,12,0.98) 0%, rgba(160,165,180,0.25) 100%)",
  backdropFilter: "blur(4px)",
  border: "1px solid rgba(136,136,136,0.3)",
  boxShadow: "0 0 10px rgba(0,0,0,0.2), inset 0 0 20px 4px rgba(0,0,0,0.3)",
  color: "#FCFCFC"
};

export const backedBy = [
  { id: "valentura", name: "Valentura", image: "/images/backedby/valentura.png", url: "https://valentura.com" },
  { id: "tummiad", name: "Tummiad", image: "/images/backedby/tummiad.png", url: "https://www.tummiad.org.tr/" }
] as const;

export const ecosystemPartners: Array<{ id: string; name: string; image: string; url: string }> = [
] as const;

export type Feature = {
  title: string;
  description: string;
  icon: "Brain" | "Language" | "Planet";
  bannerImage: string;
};

export const features: Feature[] = [
  {
    title: "Dual Intelligence",
    description: "Our system combines an AI Assistant for natural language communication with an Autonomous Agent that continuously learns and improves capabilities.",
    icon: "Brain",
    bannerImage: "/images/features/dual-intelligence.webp"
  },
  {
    title: "Natural Language",
    description: "Complex operations like token transfers, smart contract interactions, and cross-chain transactions become as simple as expressing your intent in natural language.",
    icon: "Language",
    bannerImage: "/images/features/natural-language.webp"
  },
  {
    title: "Platform Evolution",
    description: "The integration of sophisticated memory and RAG systems enables continuous platform improvement, evolving alongside user needs and blockchain technology.",
    icon: "Planet",
    bannerImage: "/images/features/platform-evolution.webp"
  }
] as const;