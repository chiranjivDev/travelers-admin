import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RootLayoutContent from '@/components/RootLayoutContent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DeliveryConnect - Connect Travelers with Package Senders',
  description:
    'Save money on shipping by connecting with travelers heading to your destination. Join our community of trusted travelers and senders.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-[#0f172a] text-white`}
      >
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
