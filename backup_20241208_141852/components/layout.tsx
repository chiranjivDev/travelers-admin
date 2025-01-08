import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './Navigation'
import Footer from './Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DeliveryConnect - Connect Travelers with Package Senders',
  description: 'Save money on shipping by connecting with travelers heading to your destination. Join our community of trusted travelers and senders.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
