"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  Chain,
} from "wagmi";

import useAllStakes, { poolStakesData } from "@/hooks/useAllStakes";
import { formatUnits } from "ethers/lib/utils.js";
import usePrice from "@/hooks/usePrice";
import ABI from "@/abis/staking";
import { Map } from "@/types/map";
import { BigNumber } from "ethers";

const stakingContractAddresses: Map = {
  1: "0xe3d143d7b864f2d0f76f9080d758ded8ca262b26",
} as const;

function ClaimAll({
  chain,
  nfteTokenStakes,
  earthlingsStakes,
  roboroversStakes,
  nfw3cStakes,
}: {
  chain: (Chain & { unsupported?: boolean | undefined }) | undefined;
  nfteTokenStakes: poolStakesData[] | undefined;
  earthlingsStakes: poolStakesData[] | undefined;
  roboroversStakes: poolStakesData[] | undefined;
  nfw3cStakes: poolStakesData[] | undefined;
}) {
  const nfteTokenClaimPrepareContractWrite = usePrepareContractWrite({
    enabled:
      nfteTokenStakes &&
      nfteTokenStakes.length !== 0 &&
      !nfteTokenStakes[0].unclaimed.isZero(),
    address: stakingContractAddresses[chain?.id || 42161],
    abi: ABI,
    functionName: "claimSelfnfteToken",
  });

  const nfteTokenClaimContractWrite = useContractWrite(
    nftenTokenClaimPrepareContractWrite.config
  );

  const args = earthlingsStakes
    ?.map((token) => {
      if (token.unclaimed?.gt(0)) {
        return token.tokenId.toNumber();
      }
    })
    .filter((token) => {
      return token !== undefined;
    });

  const earthlingsUnclaimed =
    earthlingsStakes?.reduce((sum, stake) => {
      return sum + +formatUnits(stake.unclaimed);
    }, 0) || 0;

  const earthlingsPrepareContractWrite = usePrepareContractWrite({
    enabled: earthlingsStakes && earthlingsStakes.length > 0 && earthlingsUnclaimed > 0,
    address: stakingContractAddresses[chain?.id || 42161],
    abi: ABI,
    functionName: "claimSelfearthlings",
    args: args && ([args] as any),
  });

  const earthlingsContractWrite = useContractWrite(earthlingsPrepareContractWrite.config);

  const roboroversArgs = roboroversStakes
    ?.map((token) => {
      if (token.unclaimed?.gt(0)) {
        return token.tokenId.toNumber();
      }
    })
    .filter((token) => {
      return token !== undefined;
    });

  const roboroversPrepareContractWrite = usePrepareContractWrite({
    enabled: roboroversStakes && roboroversStakes.length > 0,
    address: stakingContractAddresses[chain?.id || 42161],
    abi: ABI,
    functionName: "claimSelfroborovers",
    args: [roboroversArgs as any],
  });

  const roboroversContractWrite = useContractWrite(roboroversPrepareContractWrite.config);

  interface nfw3cData {
    mainTokenId: BigNumber;
    nfw3cTokenId: BigNumber;
  }

  let nfw3cearthlingsArgs: nfw3cData[] = [];
  let nfw3croboroversArgs: nfw3cData[] = [];

  if (nfw3cStakes) {
    for (let i = 0; i < nfw3cStakes.length; i++) {
      const stake = nfw3cStakes[i];
      if (stake.unclaimed.gt(0) && stake.pair.mainTypePoolId.toNumber() === 1) {
        nfw3cearthlingsArgs.push({
          mainTokenId: stake.pair.mainTokenId,
          nfw3cTokenId: stake.tokenId,
        });
      }
    }
  }

  if (nfw3cStakes) {
    for (let i = 0; i < nfw3cStakes.length; i++) {
      const stake = nfw3cStakes[i];
      if (stake.unclaimed.gt(0) && stake.pair.mainTypePoolId.toNumber() === 2) {
        nfw3croboroversArgs.push({
          mainTokenId: stake.pair.mainTokenId,
          nfw3cTokenId: stake.tokenId,
        });
      }
    }
  }

  const nfw3cPrepareContractWrite = usePrepareContractWrite({
    enabled: nfw3cearthlingsArgs.length > 0 || nfw3croboroversArgs.length > 0,
    address: stakingContractAddresses[chain?.id || 42161],
    abi: ABI,
    functionName: "claimSelfnfw3c",
    args: [nfw3cearthlingsArgs, nfw3croboroversArgs],
  });

  const nfw3cContractWrite = useContractWrite(nfw3cPrepareContractWrite.config);
  return (
    <div>
      <button
        onClick={() => {
          if (nfteTokenStakes?.[0]?.unclaimed.gt(0)) {
            nfteTokenClaimContractWrite.write?.();
          }
          earthlingsContractWrite.write?.();
          roboroversContractWrite.write?.();
          nfw3cContractWrite.write?.();
        }}
        className="border px-2 hover:border-zinc-500 dark:border-zinc-500 dark:bg-zinc-800 dark:hover:border-zinc-300"
      >
        Claim All
      </button>
    </div>
  );
}

function WithdrawAll({
  chain,
  nfteTokenStakes,
  earthlingsStakes,
  roboroversStakes,
  nfw3cStakes,
}: {
  chain: (Chain & { unsupported?: boolean | undefined }) | undefined;
  nfteTokenStakes: poolStakesData[] | undefined;
  earthlingsStakes: poolStakesData[] | undefined;
  roboroversStakes: poolStakesData[] | undefined;
  nfw3cStakes: poolStakesData[] | undefined;
}) {
  const nfteTokenWithdrawPrepareContractWrite = usePrepareContractWrite({
    enabled: !nfteTokenStakes?.[0]?.deposited.isZero(),
    address: stakingContractAddresses[chain?.id || 42161],
    abi: ABI,
    functionName: "withdrawSelfnfteToken",
    args: nfteTokenStakes?.[0]?.deposited && [nfteTokenStakes[0].deposited],
  });

  const nfteTokenWithdrawContractWrite = useContractWrite(
    nfteTokenWithdrawPrepareContractWrite.config
  );

  interface withdrawData {
    tokenId: BigNumber;
    amount: BigNumber;
  }

  let earthlingsWithdrawArgs: withdrawData[] = [];

  if (earthlingsStakes) {
    for (let i = 0; i < earthlingsStakes.length; i++) {
      const stake = earthlingsStakes[i];
      if (stake.deposited.gt(0)) {
        earthlingsWithdrawArgs.push({
          tokenId: stake.tokenId,
          amount: stake.deposited,
        });
      }
    }
  }

  const earthlingsWithdrawPrepareContractWrite = usePrepareContractWrite({
    enabled: earthlingsStakes && earthlingsStakes.length > 0,
    address: stakingContractAddresses[chain?.id || 42161],
    abi: ABI,
    functionName: "withdrawSelfearthlings",
    args: earthlingsWithdrawArgs && ([earthlingsWithdrawArgs] as any),
  });

  const earthlingsWithdrawContractWrite = useContractWrite(
    earthlingsWithdrawPrepareContractWrite.config
  );

  let roboroversWithdrawArgs: withdrawData[] = [];

  if (roboroversStakes) {
    for (let i = 0; i < roboroversStakes.length; i++) {
      const stake = roboroversStakes[i];
      if (stake.deposited.gt(0)) {
        roboroversWithdrawArgs.push({
          tokenId: stake.tokenId,
          amount: stake.deposited,
        });
      }
    }
  }

  const roboroversWithdrawPrepareContractWrite = usePrepareContractWrite({
    enabled: roboroversStakes && roboroversStakes.length > 0,
    address: stakingContractAddresses[chain?.id || 42161],
    abi: ABI,
    functionName: "withdrawSelfroborovers",
    args: roboroversWithdrawArgs && ([roboroversWithdrawArgs] as any),
  });

  const roboroversWithdrawContractWrite = useContractWrite(
    roboroversWithdrawPrepareContractWrite.config
  );

  interface nfw3cData {
    mainTokenId: number;
    nfw3cTokenId: number;
    amount: BigNumber;
    isUncommit: boolean;
  }

  let nfw3cearthlingsArgs: nfw3cData[] = [];
  let nfw3croboroversArgs: nfw3cData[] = [];

  if (nfw3cStakes) {
    for (let i = 0; i < nfw3cStakes.length; i++) {
      const stake = nfw3cStakes[i];
      if (stake.unclaimed.gt(0) && stake.pair.mainTypePoolId.toNumber() === 1) {
        nfw3cearthlingsArgs.push({
          mainTokenId: stake.pair.mainTokenId.toNumber(),
          nfw3cTokenId: stake.tokenId.toNumber(),
          amount: stake.deposited,
          isUncommit: true,
        });
      }
    }
  }

  if (nfw3cStakes) {
    for (let i = 0; i < nfw3cStakes.length; i++) {
      const stake = nfw3cStakes[i];
      if (stake.unclaimed.gt(0) && stake.pair.mainTypePoolId.toNumber() === 2) {
        nfw3croboroversArgs.push({
          mainTokenId: stake.pair.mainTokenId.toNumber(),
          nfw3cTokenId: stake.tokenId.toNumber(),
          amount: stake.deposited,
          isUncommit: true,
        });
      }
    }
  }

  const nfw3cPrepareContractWrite = usePrepareContractWrite({
    enabled: nfw3cearthlingsArgs.length > 0 || nfw3croboroversArgs.length > 0,
    address: stakingContractAddresses[chain?.id || 42161],
    abi: ABI,
    functionName: "withdrawnfw3c",
    args: [nfw3cearthlingsArgs, nfw3croboroversArgs],
  });

  const nfw3cContractWrite = useContractWrite(nfw3cPrepareContractWrite.config);
  return (
    <div>
      <button
        onClick={() => {
          if (nfteTokenStakes?.[0]?.unclaimed.gt(0)) {
            nfteTokenWithdrawContractWrite.write?.();
          }
          earthlingsWithdrawContractWrite.write?.();
          roboroversWithdrawContractWrite.write?.();
          nfw3cContractWrite.write?.();
        }}
        className="border px-2 hover:border-zinc-500 dark:border-zinc-500 dark:bg-zinc-800 dark:hover:border-zinc-300"
      >
        Withdraw All
      </button>
    </div>
  );
}

export default function UserStaking() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { nftearthPrice } = usePrice();
  const [statsAddress, setStatsAddress] = useState<string>("");
  useEffect(() => {
    if (address) {
      setStatsAddress(address);
    }
  }, [address]);

  const {
    poolsContractRead: allStakes,
    nfteTokenStakes,
    earthlingsStakes,
    roboroversStakes,
    nfw3cStakes,
  } = useAllStakes(statsAddress!);

  const totalStaked = allStakes.data?.reduce((sum, stake) => {
    return sum + +formatUnits(stake.deposited);
  }, 0);

  const totalUnclaimed = allStakes.data?.reduce((sum, stake) => {
    return sum + +formatUnits(stake.unclaimed);
  }, 0);

  const nfteTokenPriceNumber = nfteTokenPrice && +formatUnits(nfteTokenPrice, 8);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <div
          className={`block border border-zinc-200 bg-white p-4
          dark:border-zinc-700 dark:bg-zinc-900 sm:max-w-sm`}
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight">
            Address or ENS:
          </h5>
          <input
            spellCheck="false"
            className="w-full border px-1 text-xs dark:border-zinc-500 dark:bg-zinc-800"
            value={statsAddress}
            placeholder={"enter address or ens name"}
            onChange={(e) => {
              setStatsAddress(e.target.value);
            }}
          />
          {statsAddress &&
            allStakes.isError &&
            allStakes.error &&
            "Invalid address or ENS name"}
        </div>
        <div
          className={`block border border-zinc-200 bg-white p-4
          dark:border-zinc-700 dark:bg-zinc-900 sm:max-w-sm`}
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight">
            Total Staked
          </h5>
          <div className="flex flex-col flex-wrap gap-2 text-zinc-700 dark:text-zinc-400">
            {totalStaked ? (
              <>
                <div>
                  {Intl.NumberFormat("en-US", {
                    maximumFractionDigits: 4,
                  }).format(totalStaked)}
                  {totalStaked && nfteTokenPriceNumber && (
                    <>
                      {" "}
                      (
                      {Intl.NumberFormat("en-US", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                        compactDisplay: "short",
                      }).format(totalStaked * nfteTokenPriceNumber)}
                      )
                    </>
                  )}
                </div>
                {address === statsAddress &&
                  process.env.NEXT_PUBLIC_ENABLE_STAKE === "TRUE" && (
                    <WithdrawAll
                      chain={chain}
                      nfteTokenStakes={nfteTokenStakes}
                      earthlingsStakes={earthlingsStakes}
                      roboroversStakes={roboroversStakes}
                      nfw3cStakes={nfw3cStakes}
                    />
                  )}
              </>
            ) : (
              <>{earthlingsStakes && <>0</>}</>
            )}
          </div>
        </div>
        <div
          className={`block border border-zinc-200 bg-white p-4
          dark:border-zinc-700 dark:bg-zinc-900 sm:max-w-sm`}
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight">
            Unclaimed Rewards
          </h5>
          <div className="flex flex-col flex-wrap gap-2 text-zinc-700 dark:text-zinc-400">
            {totalUnclaimed ? (
              <>
                {Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 4,
                }).format(totalUnclaimed)}
                {totalUnclaimed && nfteTokenPriceNumber && (
                  <>
                    {" "}
                    (
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      notation: "compact",
                      compactDisplay: "short",
                    }).format(totalUnclaimed * nfteTokenPriceNumber)}
                    )
                  </>
                )}
                {address === statsAddress &&
                  process.env.NEXT_PUBLIC_ENABLE_STAKE === "TRUE" && (
                    <ClaimAll
                      chain={chain}
                      nfteTokenStakes={nfteTokenStakes}
                      earthlingsStakes={earthlingsStakes}
                      roboroversStakes={roboroversStakes}
                      nfw3cStakes={nfw3cStakes}
                    />
                  )}
              </>
            ) : (
              <>{earthlingsStakes && <>0</>}</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
