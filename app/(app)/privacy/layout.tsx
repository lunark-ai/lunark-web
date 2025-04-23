import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lunark AI - Privacy Policy',
  description: 'Privacy Policy for Lunark AI',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 