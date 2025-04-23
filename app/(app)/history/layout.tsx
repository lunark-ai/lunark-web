import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lunark AI - History',
  description: 'View your chat history with Lunark AI',
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 