export interface INetwork {
  id: string;
  name: string;
  chainId: number;
  rpcUrl: string;
  icon: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
    logoURI?: string;
  };
}