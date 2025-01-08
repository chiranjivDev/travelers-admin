import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Saved Packages | Delivery Package',
  description: 'View and manage your saved packages',
}

export default function SavedPackagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
