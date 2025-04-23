import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lunark AI - Wallet',
  description: 'Manage your Lunark AI wallet and view your token balances',
};

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 