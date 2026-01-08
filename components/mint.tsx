"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, ExternalLink, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAccount, useConnect, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { formatEther, isAddress, parseEther } from "viem";
import { wagmiContractConfig } from "@/lib/contract-abi"
import { monad } from "@wagmi/core/chains"

export function Mint() {
  const [recipientAddress, setRecipientAddress] = useState("")
  const [message, setMessage] = useState("")
  const [mintStatus, setMintStatus] = useState<"idle" | "building" | "minting" | "success">("idle")
  const [error, setError] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const { isConnected, address } = useAccount()
  const { connectors, connect } = useConnect();

  const { data: mintFee, isSuccess: isMintFeeGetSuccess } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'mintFee',
  })
  
  const { 
    data: txHash, 
    isPending: isPendingWrite,
    writeContract,
    writeContractAsync
  } = useWriteContract() 

  const { isLoading: isTxConfirming, isSuccess: isTxConfirmed, isError: isTxError } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  const handleMint = async () => {
    const connector = connectors[0];
    if (!isConnected) {
      connect({ connector, chainId: monad.id})
      return
    }

    if (!recipientAddress) {
      setError("Comrade, a recipient address is required for the glory of the NFT!")
      return
    }

    if (!isAddress(recipientAddress)){
      setError("Comrade, please enter a valid Ethereum address starting with 0x")
      return
    }

    setError("")
    setShowSuccessMessage(false)

    setMintStatus('minting');
    // Here you would typically interact with your smart contract
    try {
      await writeContractAsync({
        ...wagmiContractConfig,
        functionName: 'mint',
        value: mintFee,
        account: address,
        args: [recipientAddress],
      });
    } catch (error: any) {
      console.error('Error minting NFT:', error);
      // toast.error('Failed to mint NFT');
    }
  }

  useEffect(() => {
    if (isTxConfirmed && mintStatus === "minting") {
      // Step 3: Success
      setMintStatus("success");
      setShowSuccessMessage(true);
    }
  }, [isTxConfirmed, mintStatus]);


  // Get transaction status message
  const getStatusMessage = () => {
    if (mintStatus === "building") return "Building contract..."
    if (mintStatus === "minting") return "Minting NFT..."
    if (mintStatus === "success") return "NFT successfully minted for your comrade!"
    return null
  }

  const statusMessage = getStatusMessage()

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col space-y-6">
        <div className="bg-red-900/20 border-2 border-red-800 rounded-lg p-6 relative overflow-hidden">
          {/* Propaganda-style banner */}
          <div className="absolute -left-8 top-6 w-32 bg-red-700 text-yellow-500 text-center transform -rotate-45 text-xs py-1 font-bold">
            FOR COMRADES
          </div>

          <h2 className="text-2xl font-bold text-red-500 mb-4">Mint NFT For A Comrade</h2>

          {error && (
            <Alert variant="destructive" className="mb-4 bg-red-900/50 border-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-red-200">
                Comrade's Wallet Address
              </Label>
              <Input
                id="recipient"
                placeholder="0x..."
                className="bg-red-900/20 border-red-800 text-white"
                value={recipientAddress}
                onChange={(e) => { setRecipientAddress(e.target.value); setError(""); }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-red-200">
                Message to Comrade (will not be displayed on the NFT)
              </Label>
              <Textarea
                id="message"
                placeholder="For the glory of our friendship..."
                className="bg-red-900/20 border-red-800 text-white min-h-[100px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <Button
              onClick={handleMint}
              disabled={mintStatus === "building" || mintStatus === "minting"}
              className="w-full bg-red-700 hover:bg-red-800 text-white"
            >
              {mintStatus === "building" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Building contract...
                </>
              ) : mintStatus === "minting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Minting NFT...
                </>
              ) : !isConnected ? (
                "Connect Wallet to Mint"
              ) : (
                "Mint NFT For Comrade"
              )}
            </Button>

            {showSuccessMessage && (
              <Alert className="mt-4 bg-green-900/50 border-green-800">
                <div className="flex items-center">
                  <div className="mr-2 bg-green-500 rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <AlertDescription className="text-green-200">
                    Congratulations, comrade! The NFT has been successfully minted for your fellow comrade!
                  </AlertDescription>
                </div>
                {txHash && (
                  <div className="mt-2">
                    <a className="flex items-center text-sm text-yellow-400" href={`https://monadexplorer.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
                      Transaction: {txHash.slice(0, 10)}...{txHash.slice(-8)}
                      <ExternalLink className="ml-1 h-3 w-3" href={`https://monadexplorer.com/tx/${txHash}`} />
                    </a>
                  </div>
                )}
              </Alert>
            )}
          </div>
        </div>

        <div className="bg-red-900/20 border-2 border-red-800 rounded-lg p-6 relative overflow-hidden">
          {/* Factory silhouette */}
          <div className="absolute bottom-0 right-0 w-32 h-16 opacity-10">
            <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="30" width="10" height="20" fill="#ffcc00" />
              <rect x="25" y="20" width="10" height="30" fill="#ffcc00" />
              <rect x="40" y="25" width="10" height="25" fill="#ffcc00" />
              <rect x="55" y="15" width="10" height="35" fill="#ffcc00" />
              <rect x="70" y="20" width="10" height="30" fill="#ffcc00" />
              <rect x="0" y="45" width="100" height="5" fill="#ffcc00" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-red-500 mb-2">The People's NFT</h3>
          <p className="text-red-200">
            In the spirit of collective prosperity, these NFTs can only be minted as gifts for your comrades.
            Self-minting is forbidden by the Party's decree.
          </p>
          <div className="mt-4 p-2 bg-red-900/30 border border-red-800 rounded-md">
            <p className="text-xs text-red-300">
              <strong>Minting Cost:</strong> {mintFee && formatEther(mintFee)} MON + gas fees
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <Card className="w-full max-w-md bg-transparent border-0 shadow-none">
          <CardContent className="p-0">
            <div className="relative aspect-square w-full overflow-hidden">
              {/* NFT Image */}
              <div className="relative w-full aspect-square">
                <div className="w-full aspect-square bg-gradient-to-br from-red-900 to-red-950 rounded-lg border-2 border-red-800 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 flex flex-col items-center justify-center relative">
                    {/* Hammer and sickle symbol */}
                    <div className="w-20 h-20 mb-4 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                          <div className="w-12 h-12 bg-red-700 rounded-full"></div>
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                        <div className="w-5 h-14 bg-yellow-500 rotate-45 absolute"></div>
                        <div className="w-5 h-14 bg-yellow-500 -rotate-45 absolute"></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-yellow-500 mb-2">VODKA NFT</h3>
                    <p className="text-red-200 text-sm px-4 py-2 bg-red-900/70 rounded-md max-w-[250px] text-center">
                      {message || "For the glory of our friendship..."}
                    </p>
                    <div className="mt-auto mb-8">
                      <div className="px-4 py-2 bg-red-900/70 rounded-md">
                        <p className="text-xs text-yellow-200 truncate max-w-[200px]">
                          To: {recipientAddress || "0x..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Propaganda-style banner */}
                <div className="absolute -right-8 -bottom-2 w-32 bg-yellow-500 text-red-900 text-center transform rotate-45 text-xs py-1 font-bold">
                  APPROVED
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <p className="text-red-300 mt-4 text-center">Preview of the NFT your comrade will receive</p>
      </div>
    </div>
  )
}
