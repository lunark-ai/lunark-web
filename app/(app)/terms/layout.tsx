import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lunark AI - Terms of Service',
  description: 'Terms of Service for Lunark AI',
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 