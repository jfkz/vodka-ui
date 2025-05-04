"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function Mint() {
  const [recipientAddress, setRecipientAddress] = useState("")
  const [message, setMessage] = useState("")
  const [mintStatus, setMintStatus] = useState<"idle" | "building" | "minting" | "success" | "error">("idle")
  const [error, setError] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const handleMint = async () => {
    if (!recipientAddress) {
      setError("Comrade, a recipient address is required for the glory of the NFT!")
      return
    }

    setError("")
    setShowSuccessMessage(false)

    // Step 1: Building contract
    setMintStatus("building")
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Step 2: Minting NFT
    setMintStatus("minting")
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Step 3: Success
    setMintStatus("error")
    // setShowSuccessMessage(false)
    setShowErrorMessage(true)
  }

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
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-red-200">
                Message to Comrade
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
              disabled={mintStatus !== "idle" && mintStatus !== "success"}
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
              </Alert>
            )}

            {showErrorMessage && (
              <Alert className="mt-4 bg-red-900/50 border-red-800">
                <div className="flex items-center">
                  <div className="mr-2 bg-red-500 rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <AlertDescription className="text-red-200">
                    Error, comrade! The NFT minting process has failed. Please try again.
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </div>        </div>

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
        </div>
      </div>

      <div className="flex flex-col items-center">
        <Card className="w-full max-w-md bg-transparent border-0 shadow-none">
          <CardContent className="p-0">
            <div className="relative aspect-square w-full overflow-hidden">
              {/* NFT Image */}
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/vodka-nft-template.png"
                  alt="Vodka NFT"
                  width={500}
                  height={500}
                  className="rounded-lg border-2 border-red-800"
                />

                {/* Overlay for message and address */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-full h-full flex flex-col items-center justify-center px-8">
                    {/* Message area */}
                    <div className="mt-[220px] w-full text-center">
                      <p className="text-white text-sm font-medium px-4 py-2 bg-red-900/70 rounded-md max-w-[250px] mx-auto">
                        {message || "For the glory of our friendship..."}
                      </p>
                    </div>

                    {/* Address area */}
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
