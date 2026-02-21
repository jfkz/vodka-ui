"use client"

import { Button } from "@/components/ui/button"
import { monad, monadTestnet } from "@wagmi/core/chains"
import { useChainId, useSwitchChain } from "wagmi"

export function NetworkSwitcher() {
  const chainId = useChainId()
  const { switchChainAsync, isPending } = useSwitchChain()

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        size="sm"
        variant={chainId === monad.id ? "default" : "outline"}
        className={chainId === monad.id ? "bg-red-700 hover:bg-red-800" : "border-gray-600 bg-gray-800/40 text-gray-300 hover:bg-gray-700/60 hover:text-gray-200"}
        disabled={isPending}
        onClick={() => switchChainAsync({ chainId: monad.id })}
      >
        Mainnet
      </Button>
      <Button
        type="button"
        size="sm"
        variant={chainId === monadTestnet.id ? "default" : "outline"}
        className={chainId === monadTestnet.id ? "bg-red-700 hover:bg-red-800" : "border-gray-600 bg-gray-800/40 text-gray-300 hover:bg-gray-700/60 hover:text-gray-200"}
        disabled={isPending}
        onClick={() => switchChainAsync({ chainId: monadTestnet.id })}
      >
        Testnet
      </Button>
    </div>
  )
}
