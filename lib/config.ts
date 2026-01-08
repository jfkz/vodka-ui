import { monad } from '@wagmi/core/chains';
import { http, createConfig, injected } from 'wagmi'
import { metaMask, safe, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [monad],
  connectors: [
    injected(),
  ],
  transports: {
    [monad.id]: http('https://rpc3.monad.xyz'),
  },
})