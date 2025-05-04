import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Buy Me A Vodka',
  description: 'Buy me a vodka, comrade! Mint an NFT for a comrade and support the cause.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
