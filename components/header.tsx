import { Star } from "lucide-react"
import { ConnectWallet } from "@/components/connect-wallet"
import { VisitContract } from "./visit-contract"

export function Header() {
  return (
    <header className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-full flex items-center justify-between mb-6">
        <div className="w-32">{/* Empty div for spacing */}</div>
        <div className="flex items-center justify-center">
          <Star className="h-8 w-8 text-yellow-500 mr-2" fill="currentColor" />
          <h1 className="text-4xl md:text-6xl font-bold text-red-600 tracking-tight">
            BUY ME A <span className="text-yellow-500">VODKA</span>
          </h1>
          <Star className="h-8 w-8 text-yellow-500 ml-2" fill="currentColor" />
        </div>
        <div className="w-32 flex justify-end">
          <VisitContract />
          <ConnectWallet />
        </div>
      </div>
      <div className="relative">
        <p className="text-xl text-red-200 max-w-2xl mt-4 font-medium">
          The People's NFT Platform: Mint for Comrades, Not for Self
        </p>
        {/* Propaganda-style banner */}
        <div className="absolute -top-2 -right-4 transform rotate-12 bg-red-700 text-yellow-500 text-xs px-4 py-1 font-bold">
          PARTY APPROVED
        </div>
      </div>
      <div className="w-full max-w-md border-b-2 border-red-800 mt-6"></div>
    </header>
  )
}
