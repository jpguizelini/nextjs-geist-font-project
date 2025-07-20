import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Urban Skate Track - Community Hub',
  description: 'Join the ultimate skateboard track community. Explore our gallery, support through donations, and discover exclusive NFTs.',
  keywords: 'skateboard, skate track, community, gallery, donations, NFT, urban',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
