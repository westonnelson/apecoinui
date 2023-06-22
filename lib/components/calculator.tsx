"use client";

import { formatUnits, parseUnits } from "ethers/lib/utils";

import usePoolData from "@/hooks/usePoolData";
import usePrice from "@/hooks/usePrice";
import useTimeframe from "@/hooks/useTimeframe";

import { TimeFrame } from "@/types/timeframe";
import { PoolType } from "@/types/data";

import TimeframeSelector from "@/components/timeframeSelector";
import { Dispatch, useEffect, useState } from "react";
import useBalances from "@/hooks/useBalances";
import useNfteTokenBalance from "@/hooks/useNfteTokenBalance";
import { useAccount } from "wagmi";
import useAllStakes from "@/hooks/useAllStakes";
import { BigNumber } from "ethers";

export default function Calculator() {
  const poolData = usePoolData();
  const { nfteTokenPrice } = usePrice();
  const { timeframe } = useTimeframe();
  const { earthlingsPoolStakable, roboroversPoolStakable, nfw3cPoolStakable } =
    useBalances();
  const { nfteTokenBalance } = useNfteTokenBalance();

  const { address } = useAccount();

  const { poolsContractRead: allStakes } = useAllStakes(address!);

  // nfteTokenPrice comes back as a big number and nfteToken token has 8 decimal
  // places, so we need to turn it into a formatted string via ethers then
  // turn that into a number
  const nfteTokenPriceNumber = nfteTokenPrice && +formatUnits(nfteTokenPrice, 8);

  const [nfteTokenOwnedCount, setnfteTokenOwnedCount] = useState<number>(0);
  const [earthlingsTokenOwnedCount, setearthlingsTokenOwnedCount] = useState<number>(0);
  const [roboroversTokenOwnedCount, setroboroversTokenOwnedCount] = useState<number>(0);
  const [nfw3cTokenOwnedCount, setnfw3cTokenOwnedCount] = useState<number>(0);

  const [nfteTokenToStakeCount, setnfteTokenToStakeCount] = useState<number>(0);
  const [earthlingsTokenToStakeCount, setearthlingsTokenToStakeCount] = useState<number>(0);
  const [roboroversTokenToStakeCount, setroboroversTokenToStakeCount] = useState<number>(0);
  const [nfw3cTokenToStakeCount, setnfw3cTokenToStakeCount] = useState<number>(0);

  interface PoolDataInterface {
    type: PoolType;
    maxStakeAmount?: number;
    ownedCount: number;
    setOwnedCount: Dispatch<number>;
    toStake: number;
    setToStakeCount: Dispatch<number>;
  }

  const PoolDataArray: PoolDataInterface[] = [
    {
      type: PoolType.NFTE,
      ownedCount: nfteTokenOwnedCount,
      setOwnedCount: setnfteTokenOwnedCount,
      toStake: nfteTokenToStakeCount,
      setToStakeCount: setnfteTokenToStakeCount,
    },
    {
      type: PoolType.EARTHLINGS,
      maxStakeAmount: 5000,
      ownedCount: earthlingsTokenOwnedCount,
      setOwnedCount: setearthlingsTokenOwnedCount,
      toStake: earthlingsTokenToStakeCount,
      setToStakeCount: setearthlingsTokenToStakeCount,
    },
    {
      type: PoolType.ROBOROVERS,
      maxStakeAmount: 250,
      ownedCount: roboroversTokenOwnedCount,
      setOwnedCount: setroboroversTokenOwnedCount,
      toStake: roboroversTokenToStakeCount,
      setToStakeCount: setroboroversTokenToStakeCount,
    },
    {
      type: PoolType.NFW3C,
      maxStakeAmount: 100,
      ownedCount: nfw3cTokenOwnedCount,
      setOwnedCount: setnfw3cTokenOwnedCount,
      toStake: nfw3cTokenToStakeCount,
      setToStakeCount: setnfw3cTokenToStakeCount,
    },
  ];

  let PoolDataObject: { [key in PoolType]: PoolDataInterface };
  PoolDataObject = PoolDataArray.reduce((map, obj) => {
    map[obj.type] = obj;
    return map;
  }, {} as { [key in PoolType]: PoolDataInterface });

  const totalUnclaimed =
    allStakes.data?.reduce((sum, stake) => {
      return sum.add(stake.unclaimed);
    }, BigNumber.from(0)) || BigNumber.from(0);

  let unstakednfteToken = nfteTokenBalance || BigNumber.from(0);
  if (allStakes.data && allStakes.data[0].deposited) {
    unstakednfteToken = unstakednfteToken.add(allStakes.data[0].deposited);
  }

  if (allStakes.data) {
    unstakednfteToken = unstakednfteToken.add(totalUnclaimed);
  }

  useEffect(() => {
    setnfteTokenToStakeCount(nfteTokenOwnedCount);
  }, [nfteTokenOwnedCount]);

  useEffect(() => {
    setearthlingsTokenToStakeCount(
      earthlingsTokenOwnedCount * PoolDataObject[PoolType.earthlings].maxStakeAmount!
    );
  }, [earthlingsTokenOwnedCount]);

  useEffect(() => {
    setroboroversTokenToStakeCount(
      roboroversTokenOwnedCount * PoolDataObject[PoolType.roborovers].maxStakeAmount!
    );
  }, [roboroversTokenOwnedCount]);

  useEffect(() => {
    setnfw3cTokenToStakeCount(
      nfw3cTokenOwnedCount * PoolDataObject[PoolType.nfw3c].maxStakeAmount!
    );
  }, [nfw3cTokenOwnedCount]);

  useEffect(() => {
    if (unstakednfteToken.isZero()) return;
    setnfteTokenOwnedCount(Math.round(+formatUnits(unstakednfteToken)));
  }, [nfteTokenBalance]);

  useEffect(() => {
    setearthlingsTokenOwnedCount(earthlingsPoolStakable);
  }, [earthlingsPoolStakable]);

  useEffect(() => {
    setroboroversTokenOwnedCount(roboroversPoolStakable);
  }, [roboroversPoolStakable]);

  useEffect(() => {
    setnfw3cTokenOwnedCount(nfw3cPoolStakable);
  }, [nfw3cPoolStakable]);

  const totalStakable =
    nfteTokenToStakeCount +
    earthlingsTokenToStakeCount +
    roboroversTokenToStakeCount +
    nfw3cTokenToStakeCount;

  const hourlyRewardsTotal =
    nfteTokenToStakeCount * poolData.poolData[PoolType.APE].rewardPerHour! +
    earthlingsTokenToStakeCount * poolData.poolData[PoolType.earthlings].rewardPerHour! +
    roboroversTokenToStakeCount * poolData.poolData[PoolType.roborovers].rewardPerHour! +
    nfw3cTokenToStakeCount * poolData.poolData[PoolType.nfw3c].rewardPerHour!;

  const dailyRewardsTotal = hourlyRewardsTotal * 24;
  const weeklyRewardsTotal = dailyRewardsTotal * 7;
  const monthlyRewardsTotal = dailyRewardsTotal * 30;

  let rewardsTotal;
  let timeFrameHourMultiplier: number;
  switch (timeframe) {
    case TimeFrame.Hourly:
      rewardsTotal = hourlyRewardsTotal;
      timeFrameHourMultiplier = 1;
      break;
    case TimeFrame.Daily:
      rewardsTotal = dailyRewardsTotal;
      timeFrameHourMultiplier = 24;
      break;
    case TimeFrame.Weekly:
      rewardsTotal = weeklyRewardsTotal;
      timeFrameHourMultiplier = 24 * 7;
      break;
    case TimeFrame.Monthly:
      rewardsTotal = monthlyRewardsTotal;
      timeFrameHourMultiplier = 24 * 30;
      break;
  }

  return (
    <div className="mt-4">
      <TimeframeSelector />
      <div className="overflow-auto border dark:border-zinc-700">
        <table className="w-full">
          <thead className="border-b border-zinc-200 dark:border-zinc-700">
            <tr className="flex">
              <th className="flex w-1/3 items-center p-4 text-left font-semibold tracking-wide">
                Owned Token Count
              </th>
              <th className="flex w-1/3 items-center p-4 text-left font-semibold tracking-wide">
                NFTE To Stake
              </th>
              <th className="flex w-1/3 items-center p-4 text-left font-semibold tracking-wide">
                {timeframe} NFTE Reward
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {(Object.keys(poolData.poolData) as unknown as PoolType[]).map(
              (pool) => (
                <tr key={pool} className="flex">
                  <td className="flex w-1/3 flex-wrap items-center gap-2 p-4">
                    <input
                      className={`${
                        pool != PoolType.NFTE ? "w-16" : "w-28"
                      } border px-2 dark:border-zinc-500 dark:bg-zinc-800`}
                      value={PoolDataObject[pool].ownedCount}
                      onChange={(e) => {
                        const newValue = +e.target.value;
                        if (!isNaN(newValue)) {
                          PoolDataObject[pool].setOwnedCount(+e.target.value);
                        }
                      }}
                    />
                    <span>
                      {poolData.poolData[pool].name}
                      {pool != PoolType.NFTE && <>&nbsp;NFTs</>}
                    </span>{" "}
                  </td>
                  <td className="flex w-1/3 flex-wrap items-center gap-2 p-4">
                    <input
                      className="w-28 border px-2 dark:border-zinc-500 dark:bg-zinc-800"
                      value={PoolDataObject[pool].toStake}
                      onChange={(e) => {
                        const newValue = +e.target.value;
                        if (!isNaN(newValue)) {
                          PoolDataObject[pool].setToStakeCount(+e.target.value);
                        }
                      }}
                    />
                    {PoolDataObject[pool].ownedCount != 0 &&
                      PoolDataObject[pool].maxStakeAmount &&
                      PoolDataObject[pool].toStake !=
                        PoolDataObject[pool].ownedCount *
                          PoolDataObject[pool].maxStakeAmount! && (
                        <button
                          onClick={() => {
                            PoolDataObject[pool].setToStakeCount(
                              PoolDataObject[pool].ownedCount *
                                PoolDataObject[pool].maxStakeAmount!
                            );
                          }}
                        >
                          MAX
                        </button>
                      )}
                    {PoolDataObject[pool].maxStakeAmount &&
                    PoolDataObject[pool].toStake != 0 &&
                    PoolDataObject[pool].toStake ==
                      PoolDataObject[pool].ownedCount *
                        PoolDataObject[pool].maxStakeAmount! ? (
                      <button
                        onClick={() => {
                          PoolDataObject[pool].setToStakeCount(0);
                        }}
                      >
                        CLEAR
                      </button>
                    ) : (
                      <button className="invisible">HIDDEN</button>
                    )}
                  </td>
                  <td className="flex w-1/3 flex-wrap items-center gap-2 p-4">
                    {poolData.poolData[pool].rewardPerHour &&
                    poolData.poolData[pool].rewardPerDay &&
                    nfteTokenPriceNumber ? (
                      <>
                        {Intl.NumberFormat("en-US", {
                          maximumFractionDigits: 4,
                        }).format(
                          poolData.poolData[pool].rewardPerHour! *
                            timeFrameHourMultiplier *
                            PoolDataObject[pool].toStake
                        )}{" "}
                        (
                        {Intl.NumberFormat("en-US", {
                          maximumFractionDigits: 4,
                          style: "currency",
                          currency: "USD",
                        }).format(
                          poolData.poolData[pool].rewardPerHour! *
                            timeFrameHourMultiplier *
                            PoolDataObject[pool].toStake *
                            nfteTokenPriceNumber!
                        )}
                        )
                      </>
                    ) : (
                      <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-4 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700 md:w-36"></div>
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                  </td>
                </tr>
              )
            )}
            <tr className="flex">
              <td className="flex w-1/3 flex-wrap items-center gap-2 p-4">
                Totals{" "}
                {totalStakable !== 0 && (
                  <span className="rounded bg-green-100 px-2.5 py-0.5 text-sm font-semibold text-green-800 dark:bg-green-200 dark:text-green-900">
                    {(
                      (dailyRewardsTotal / totalStakable) *
                      365 *
                      100
                    ).toFixed()}
                    %&nbsp;APR
                  </span>
                )}
              </td>
              <td className="flex w-1/3 flex-wrap items-center gap-2 p-4">
                {Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 4,
                }).format(totalStakable) || 0}
              </td>
              <td className="flex w-1/3 flex-wrap items-center gap-2 p-4">
                {nfteTokenPriceNumber ? (
                  <>
                    {Intl.NumberFormat("en-US", {
                      maximumFractionDigits: 4,
                    }).format(rewardsTotal)}{" "}
                    (
                    {Intl.NumberFormat("en-US", {
                      maximumFractionDigits: 4,
                      style: "currency",
                      currency: "USD",
                    }).format(
                      hourlyRewardsTotal *
                        nfteTokenPriceNumber! *
                        timeFrameHourMultiplier
                    )}
                    )
                  </>
                ) : (
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-4 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700 md:w-36"></div>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
