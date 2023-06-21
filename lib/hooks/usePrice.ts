import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";

import PriceABI from "@/abis/price";
import { BigNumber } from "ethers";

export default function usePrice() {
  const [nfteTokenPrice, setNfteTokenPrice] = useState<BigNumber>();

  const nfteTokenPricePriceContractRead = useContractRead({
    address: "0xB261104A83887aE92392Fb5CE5899fCFe5481456",
    abi: PriceABI,
    functionName: "latestRoundData",
    watch: true,
    chainId: 42161,
  });

  useEffect(() => {
    if (
      nfteTokenPricePriceContractRead &&
      nfteTokenPricePriceContractRead.data &&
      nfteTokenPricePriceContractRead.isSuccess
    ) {
      setnfteTokenPrice(nfteTokenPricePriceContractRead.data.answer);
    }
  }, [
    nfteTokenPricePriceContractRead.isSuccess,
    nfteTokenPricePriceContractRead.isRefetching,
    nfteTokenPricePriceContractRead.data,
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

  return { nfteTokenPrice, ethereumPrice };
}
