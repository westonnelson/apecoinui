"use client";

import { ethers } from "ethers";
import {
  useAccount,
  useNetwork,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import ABI from "@/abis/nfte";
import { Map } from "@/types/map";

const nfteTokenContractAddresses: Map = {
  1: "0xb261104a83887ae92392fb5ce5899fcfe5481456",
};

const stakingContractAddresses: Map = {
  1: "0xe3d143d7b864f2d0f76f9080d758ded8ca262b26",
};

export default function Allowance() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const allowanceContractRead = useContractRead({
    enabled: address !== undefined,
    address: nfteTokenContractAddresses[chain?.id || 42161],
    abi: ABI,
    functionName: "allowance",
    args: [address as `0x${string}`, stakingContractAddresses[chain?.id || 42161]],
  });

  const { config } = usePrepareContractWrite({
    enabled: isConnected && allowanceContractRead.isSuccess,
    address: nfteTokenContractAddresses[chain?.id || 42161],
    abi: ABI,
    functionName: "approve",
    args: [
      stakingContractAddresses[chain?.id || 1],
      ethers.constants.MaxUint256,
    ],
  });

  const contractWrite = useContractWrite(config);

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    confirmations: 2,
    onSuccess() {
      allowanceContractRead.refetch();
      contractWrite.reset();
    },
  });

  return (
    <>
      <button
        className="ml-2 border px-2 hover:border-gray-500 disabled:text-gray-400 disabled:hover:cursor-not-allowed dark:border-slate-500 dark:bg-slate-800  dark:hover:border-slate-300"
        disabled={
          contractWrite.isLoading ||
          waitForTransaction.isFetching ||
          waitForTransaction.isLoading
        }
        onClick={() => {
          contractWrite.write?.();
        }}
      >
        Approve NFTE Staking Unlimited Allowance
      </button>
    </>
  );
}
