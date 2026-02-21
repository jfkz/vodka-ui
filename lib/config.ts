import { monad, monadTestnet } from '@wagmi/core/chains';
import { http, createConfig, injected } from 'wagmi'

export const config = createConfig({
  chains: [monad, monadTestnet],
  connectors: [
    injected(),
  ],
  transports: {
    [monad.id]: http('https://rpc3.monad.xyz'),
    [monadTestnet.id]: http('https://testnet-rpc.monad.xyz'),
  },
})

const fallbackAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}` | undefined;
export const contractAddressesByChain: Record<number, `0x${string}`> = {
  [monad.id]: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET as `0x${string}` | undefined) || fallbackAddress || "0x0000000000000000000000000000000000000000",
  [monadTestnet.id]: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET as `0x${string}` | undefined) || fallbackAddress || "0x0000000000000000000000000000000000000000",
};
