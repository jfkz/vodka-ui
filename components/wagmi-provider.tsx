"use client"

import type React from "react"

import { createWeb3Modal } from "@web3modal/wagmi/react"
import { WagmiConfig as WagmiConfigComponent } from "wagmi"
import { arbitrum, mainnet, polygon, sepolia } from "wagmi/chains"
import { createConfig, configureChains } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
import { InjectedConnector } from "wagmi/connectors/injected"
import { useEffect, useState } from "react"

// Get projectId from environment variable
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

// Configure chains & providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, arbitrum, sepolia],
  [publicProvider()],
)

// Set up wagmi config
const metadata = {
  name: "Buy Me A Vodka",
  description: "The People's NFT Platform",
  url: "https://buymeavodka.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

// Create wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: metadata.name,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId,
        metadata,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

// Create web3modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#b91c1c",
    "--w3m-color-fg-accent": "#fcd34d",
    "--w3m-background-color": "#450a0a",
    "--w3m-color-fg-1": "#fef2f2",
    "--w3m-color-fg-2": "#fee2e2",
    "--w3m-color-fg-3": "#fecaca",
  },
})

export function WagmiConfig({ children }: { children: React.ReactNode }) {
  // Use client-side only rendering to avoid hydration issues
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <WagmiConfigComponent config={wagmiConfig}>{children}</WagmiConfigComponent>
}
