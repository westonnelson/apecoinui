import { useAccount, useContractRead, useNetwork } from "wagmi";
import nfteTokenABI from "@/abis/nfte";
import { Map } from "@/types/map";

const stakingContractAddresses: Map = {
  42161: "0xe3d143d7b864f2d0f76f9080d758ded8ca262b26",

} as const;

const nfteTokenContractAddresses: Map = {
  42161: "0xb261104a83887ae92392fb5ce5899fcfe5481456",
} as const;

function useAllowance() {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const allowanceContractRead = useContractRead({
    enabled: address !== undefined,
    address: nfteTokenContractAddresses[chain?.id || 42161],
    abi: nfteTokenABI,
    functionName: "allowance",
    args: [
      address as `0x${string}`,
      stakingContractAddresses[chain?.id || 1] as `0x${string}`,
    ],
  });

  return allowanceContractRead;
}

export default useAllowance;
