import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Basement Poker — Live Analytics',
  description: 'Live standings, stack race, and settle-up for basement poker night.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
