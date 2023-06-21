import { useAccount, useBalance, useNetwork } from "wagmi";
import { useEffect } from "react";

interface Map {
  [key: number]: string;
}
const nfteTokenContractAddresses: Map = {
  1: "0xB261104A83887aE92392Fb5CE5899fCFe5481456",
  5: "0x328507DC29C95c170B56a1b3A758eB7a9E73455c",
} as const;

import useStore from "@/stores/store";

const useNfteTokenBalance = () => {
  const nfteTokenBalance = useStore((state) => state.nfteTokenBalance);
  const setNfteTokenBalance = useStore((state) => state.setNfteTokenBalance);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const balance = useBalance({
    enabled: isConnected,
    address: address,
    token: nfteTokenContractAddresses[chain?.id!] as `0x{String}`,
    watch: true,
  });

  useEffect(() => {
    if (balance.data) {
      setNfteTokenBalance(balance.data.value);
    }
  }, [balance.isSuccess, balance.isRefetching, balance.data]);

  useEffect(() => {
    if (!isConnected) {
      setNfteTokenBalance(undefined);
    }
  }, [isConnected]);

  return { nfteTokenBalance, setNfteTokenBalance };
};

export default useNfteTokenBalance;
