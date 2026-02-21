"use client"

import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useAccount, useDisconnect } from "wagmi"
import { WalletOptions } from "./wallet-options"


export function ConnectWallet() {
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect();

  // const { address, isConnected, connect, disconnect } = useWallet()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden md:block px-3 py-1 bg-red-900/50 border border-red-800 rounded-md">
          <p className="text-xs text-red-200">
            Comrade: {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {disconnect()}}
          className="text-gray-300 hover:bg-gray-700/60 hover:text-gray-200"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return <WalletOptions />;
}
