"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, Star } from "lucide-react"
import { useAccount, useDisconnect } from "wagmi"


export function VisitContract() {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
  const link = `https://testnet.monadexplorer.com/address/${contractAddress}`;
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(link, '_blank')}
        className="text-red-200 hover:bg-red-900/50 hover:text-red-100"
      >
        Party's contract
        <ExternalLink className="ml-2" href={link} />
      </Button>
    </div>
  )
}
