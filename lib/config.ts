import { http, createConfig, injected } from 'wagmi'
import { monadTestnet } from 'wagmi/chains'
import { metaMask, safe, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [monadTestnet],
  connectors: [
    injected(),
  ],
  transports: {
    [monadTestnet.id]: http('https://testnet-rpc.monad.xyz'),
  },
})