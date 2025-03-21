import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RootLayoutContent from '@/components/RootLayoutContent';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import AuthProvider from '@/providers/RouteGuardProvider';
import RouteGuardProvider from '@/providers/RouteGuardProvider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DeliveryConnect - Connect Travelers with Package Senders',
  description:
    'Save money on shipping by connecting with travelers heading to your destination. Join our community of trusted travelers and senders.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <body
        className={`${inter.className} min-h-screen  bg-[#0f172a] text-white`}
      >
        <NextIntlClientProvider messages={messages}>
          <RootLayoutContent>
            <RouteGuardProvider>{children}</RouteGuardProvider>
          </RootLayoutContent>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
