# BuyMeAVodka UI

Next.js frontend for minting BuyMeAVodka NFTs.

## Features

- Wallet connect/disconnect.
- Network switcher in top-right header (`Mainnet` / `Testnet`).
- Gift-only mint flow (`mint(address to, string text)`).
- Dynamic mint fee display using on-chain reads:
  - `mintFee()`
  - `totalMinted()`
  - required value: `mintFee * totalMinted`
- Message input limited to 20 characters.
- No backend text sanitization call; raw text is sent to contract and sanitized on-chain.

## Environment Variables

In `.env`:
- `NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET`
- `NEXT_PUBLIC_CONTRACT_ADDRESS_TESTNET`

Fallback supported:
- `NEXT_PUBLIC_CONTRACT_ADDRESS` (used if per-chain values are missing)

## Run

From `vodka-ui`:

Install deps:
```bash
npm install
```

Dev server:
```bash
npm run dev
```

Build:
```bash
npm run build
```

Start:
```bash
npm run start
```

## Key Files

- `components/mint.tsx` - mint form and transaction flow
- `components/network-switcher.tsx` - chain switch buttons (header)
- `components/header.tsx` - top bar with switcher/connect/contract
- `lib/contract-abi.ts` - frontend ABI slice
- `lib/config.ts` - wagmi config and per-chain contract addresses
