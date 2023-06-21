import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";

import PriceABI from "@/abis/price";
import { BigNumber } from "ethers";

export default function usePrice() {
  const [nftearthPrice, setNftearthPrice] = useState<BigNumber>();

  const nftearthPricePriceContractRead = useContractRead({
    address: "0xB261104A83887aE92392Fb5CE5899fCFe5481456",
    abi: PriceABI,
    functionName: "latestRoundData",
    watch: true,
    chainId: 42161,
  });

  useEffect(() => {
    if (
      nftearthPricePriceContractRead &&
      nftearthPricePriceContractRead.data &&
      nftearthPricePriceContractRead.isSuccess
    ) {
      setNftearthPrice(nftearthPricePriceContractRead.data.answer);
    }
  }, [
    nftearthPricePriceContractRead.isSuccess,
    nftearthPricePriceContractRead.isRefetching,
    nftearthPricePriceContractRead.data,
  ]);

  const [ethereumPrice, setEthereumPrice] = useState<BigNumber>();

  const ethereumPriceContractRead = useContractRead({
    address: "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419",
    abi: PriceABI,
    functionName: "latestRoundData",
    watch: true,
    chainId: 1,
  });

  useEffect(() => {
    if (
      ethereumPriceContractRead &&
      ethereumPriceContractRead.data &&
      ethereumPriceContractRead.isSuccess
    ) {
      setEthereumPrice(ethereumPriceContractRead.data.answer);
    }
  }, [
    ethereumPriceContractRead.isSuccess,
    ethereumPriceContractRead.isRefetching,
    ethereumPriceContractRead.data,
  ]);

  return { nftearthPrice, ethereumPrice };
}
