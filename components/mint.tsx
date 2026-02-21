"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ExternalLink, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAccount, useChainId, useConnect, useReadContract, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { formatEther, isAddress } from "viem"
import { abiConfig } from "@/lib/contract-abi"
import { contractAddressesByChain } from "@/lib/config"
import { monad, monadTestnet } from "@wagmi/core/chains"

export function Mint() {
  const [recipientAddress, setRecipientAddress] = useState("")
  const [message, setMessage] = useState("")
  const [mintStatus, setMintStatus] = useState<"idle" | "minting" | "success">("idle")
  const [error, setError] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const chainId = useChainId()
  const activeChainId = chainId || monadTestnet.id
  const { isConnected, address } = useAccount()
  const { connectors, connect } = useConnect()
  const { switchChainAsync } = useSwitchChain()

  const contractAddress = contractAddressesByChain[activeChainId]
  const contractConfig = useMemo(() => ({
    address: contractAddress,
    abi: abiConfig,
  }), [contractAddress])

  const { data: mintFee } = useReadContract({
    ...contractConfig,
    functionName: "mintFee",
    chainId: activeChainId,
  })

  const { data: totalMinted } = useReadContract({
    ...contractConfig,
    functionName: "totalMinted",
    chainId: activeChainId,
  })

  const requiredMintFee = mintFee !== undefined && totalMinted !== undefined
    ? mintFee * totalMinted
    : undefined;

  const { data: txHash, writeContractAsync } = useWriteContract()

  const { isSuccess: isTxConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  const handleMint = async () => {
    const connector = connectors[0]
    if (!isConnected) {
      connect({ connector, chainId: activeChainId })
      return
    }

    if (!recipientAddress) {
      setError("Recipient address is required")
      return
    }

    if (!isAddress(recipientAddress)) {
      setError("Please enter a valid address starting with 0x")
      return
    }

    if (message.length > 20) {
      setError("Message must be 20 symbols or fewer")
      return
    }

    if (requiredMintFee === undefined) {
      setError("Mint price is not loaded yet")
      return
    }

    setError("")
    setShowSuccessMessage(false)
    setMintStatus("minting")

    try {
      if (chainId !== activeChainId) {
        await switchChainAsync({ chainId: activeChainId })
      }

      await writeContractAsync({
        ...contractConfig,
        functionName: "mint",
        value: requiredMintFee,
        account: address,
        args: [recipientAddress, message],
      })
    } catch (mintError: unknown) {
      const err = mintError as Error
      setError(err.message || "Failed to mint")
      setMintStatus("idle")
    }
  }

  useEffect(() => {
    if (isTxConfirmed && mintStatus === "minting") {
      setMintStatus("success")
      setShowSuccessMessage(true)
    }
  }, [isTxConfirmed, mintStatus])

  const explorerBaseUrl = activeChainId === monad.id
    ? "https://monadexplorer.com/tx/"
    : "https://testnet.monadexplorer.com/tx/"

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-red-900/20 border-2 border-red-800 rounded-lg p-6 relative overflow-hidden">
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
              onChange={(e) => { setRecipientAddress(e.target.value); setError("") }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-red-200">
              Message (max 20 symbols)
            </Label>
            <Input
              id="message"
              placeholder="For comrades"
              maxLength={20}
              className="bg-red-900/20 border-red-800 text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <Button
            onClick={handleMint}
            disabled={mintStatus === "minting"}
            className="w-full bg-red-700 hover:bg-red-800 text-white"
          >
            {mintStatus === "minting" ? (
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <AlertDescription className="text-green-200">
                  NFT minted successfully.
                </AlertDescription>
              </div>
              {txHash && (
                <div className="mt-2">
                  <a className="flex items-center text-sm text-yellow-400" href={`${explorerBaseUrl}${txHash}`} target="_blank" rel="noopener noreferrer">
                    Transaction: {txHash.slice(0, 10)}...{txHash.slice(-8)}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              )}
            </Alert>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-red-900/30 border border-red-800 rounded-md">
        <p className="text-xs text-red-300">
          <strong>Minting Cost:</strong> {requiredMintFee !== undefined ? `${formatEther(requiredMintFee)} MON` : "Loading..."} + gas fees
        </p>
      </div>
    </div>
  )
}
