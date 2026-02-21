import { parseAbi } from "viem";

const abi = parseAbi([
  `function mintFee() view returns (uint256)`,
  `function totalMinted() view returns (uint256)`,
  `function mint(address,string) payable`,
]);

export const abiConfig = abi;
