import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Providers from "./providers"
import { headers } from "next/headers";

export const metadata = {
  title: "Buy Me A Vodka - The People's NFT Platform",
  description: "Mint NFTs for your comrades in true communist spirit",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
