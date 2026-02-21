"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, Star } from "lucide-react"
import { monadTestnet } from "viem/chains";
import { useAccount, useChainId, useDisconnect } from "wagmi"


export function VisitContract() {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
  const chainId = useChainId();
  const testnetPrefix = chainId === monadTestnet.id ? 'testnet.' : '';
  const link = `https://${testnetPrefix}monadvision.com/token/${contractAddress}`;
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(link, '_blank')}
        className="text-gray-300 hover:bg-gray-700/60 hover:text-gray-200"
      >
        Party's contract
        <ExternalLink className="ml-2" href={link} />
      </Button>
    </div>
  )
}
