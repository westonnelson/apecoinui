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
  1: "0x3f770ac673856f105b586bb393d122721265ad46",
  5: "0x328507DC29C95c170B56a1b3A758eB7a9E73455c",
};

const stakingContractAddresses: Map = {
  1: "0xe3d143d7b864f2d0f76f9080d758ded8ca262b26",
  5: "0xeF37717B1807a253c6D140Aca0141404D23c26D4",
};

export default function Allowance() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const allowanceContractRead = useContractRead({
    enabled: address !== undefined,
    address: apecoinContractAddresses[chain?.id || 1],
    abi: ABI,
    functionName: "allowance",
    args: [address as `0x${string}`, stakingContractAddresses[chain?.id || 1]],
  });

  const { config } = usePrepareContractWrite({
    enabled: isConnected && allowanceContractRead.isSuccess,
    address: apecoinContractAddresses[chain?.id || 1],
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
        Approve ApeCoin Staking Unlimited Allowance
      </button>
    </>
  );
}
