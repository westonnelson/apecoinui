import { useAccount, useBalance, useNetwork } from "wagmi";
import { useEffect } from "react";

interface Map {
  [key: number]: string;
}
const nfteTokenContractAddresses: Map = {
  42161: "0xB261104A83887aE92392Fb5CE5899fCFe5481456",
} as const;

import useStore from "@/stores/store";

const usenfteTokenBalance = () => {
  const NfteTokenBalance = useStore((state) => state.NfteTokenBalance);
  const setNfteTokenBalance = useStore((state) => state.setNfteTokenBalance);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const balance = useBalance({
    enabled: isConnected,
    address: address,
    token: NfteTokenContractAddresses[chain?.id!] as `0x{String}`,
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

  return { NfteTokenBalance, setNfteTokenBalance };
};

export default useNfteTokenBalance;
