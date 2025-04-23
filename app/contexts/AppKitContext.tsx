'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, holesky, bsc as bnb, polygon, avalanche, arbitrum, optimism, fantom, base, zksync, metis, celo, cronos, gnosis, kava, mantle } from '@reown/appkit/networks';
import React, { createContext } from 'react'

const metadata = {
  name: '',
  description: '',
  url: 'https://mywebsite.com', 
  icons: ['https://avatars.mywebsite.com/']
}

const appKitNetworks: any = [
  mainnet,
  holesky,
  bnb,
  polygon,
  avalanche,
  arbitrum,
  optimism,
  fantom,
  base,
  // zksync,
  metis,
  celo,
  cronos,
  gnosis,
  kava,
  mantle
];

createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: appKitNetworks,
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!,
  features: {
    analytics: true 
  },
  defaultNetwork: mainnet,
  themeMode: 'dark'
})

interface IAppKitProps {
  appKitNetworks: any
};

export const AppKitContext = createContext<IAppKitProps>({ 
  appKitNetworks
});

export function AppKitContextProvider(props: any) {
    return (
        <AppKitContext.Provider value={{ appKitNetworks }}>
            {props.children}
        </AppKitContext.Provider>
    )
}

export const useAppKitContext = () => React.useContext(AppKitContext);