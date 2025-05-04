"use client"

import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import * as React from 'react'
import { Connector, useConnect } from 'wagmi'
import { monadTestnet } from "wagmi/chains"

export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.filter(c => c.id === 'injected').map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector, chainId: monadTestnet.id })}
    />
  ))
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <Button className="bg-red-700 hover:bg-red-800 text-white flex items-center gap-2" size="sm" disabled={!ready} onClick={onClick}>
      <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
      Connect {!connector.icon && 'Wallet'} {connector.icon && <img src={connector.icon} alt={connector.name} className="h-4 w-4" />}
    </Button>
  )
}