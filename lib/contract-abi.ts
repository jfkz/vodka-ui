import { parseAbi } from "viem";

const abi = parseAbi([
  `function mintFee() view returns (uint256)`,
  `function mint(address) payable`,
]);

export const wagmiContractConfig = {
  address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}` as `0x${string}`,
  abi,
} as const