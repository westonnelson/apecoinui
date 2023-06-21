import { useContractReads, useAccount, useNetwork } from "wagmi";
import { useEffect, useState } from "react";

import { Map } from "@/types/map";
import BalanceABI from "@/abis/balance";

const earthlingsContractAddresses: Map = {
  1: "0x8778B7FD7e2480C6F9Ad1075Bd848B7Ce1b9d90C",
} as const;

const roboroversContractAddresses: Map = {
  1: "0xe148cb1b6b2B040FEA525856A9E2F6E25115189A",
} as const;

const nfw3cContractAddresses: Map = {
  1: "0xB0CbF85907896918aaf9Aa27773637c9F8b5b0cc",
} as const;

function useBalances(): {
  earthlingsPoolStakable: number;
  roboroversPoolStakable: number;
  nfw3cPoolStakable: number;
} {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();

  const earthlingsContract = {
    address: earthlingsContractAddresses[chain?.id || 1],
    abi: BalanceABI,
  };

  const roboroversContract = {
    address: roboroversContractAddresses[chain?.id || 1],
    abi: BalanceABI,
  };

  const nfw3cContract = {
    address: nfw3cContractAddresses[chain?.id || 1],
    abi: BalanceABI,
  };

  const { data, isSuccess, isRefetching } = useContractReads({
    enabled: isConnected,
    watch: true,
    contracts: [
      {
        ...earthlingsContract,
        functionName: "balanceOf",
        args: [address!],
      },
      {
        ...roboroversContract,
        functionName: "balanceOf",
        args: [address!],
      },
      {
        ...nfw3cContract,
        functionName: "balanceOf",
        args: [address!],
      },
    ],
  });

  const [earthlingsPoolStakable, setEarthlingsPoolStakable] = useState(0);
  const [roboroversPoolStakable, setRoboroversPoolStakable] = useState(0);
  const [nfw3cPoolStakable, setNfw3cPoolStakable] = useState(0);

  useEffect(() => {
    if (isSuccess && data) {
      setEarthlingsPoolStakable(data?.[0]?.toNumber() || 0);
      setRoboroversPoolStakable(data?.[1]?.toNumber() || 0);
      setNfw3cPoolStakable(data?.[2]?.toNumber() || 0);
    }
  }, [address, isSuccess, data, isRefetching]);

  return { earthlingsPoolStakable, roboroversPoolStakable, nfw3cPoolStakable };
}

export default useBalances;
