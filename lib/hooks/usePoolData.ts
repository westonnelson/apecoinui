import { useContractRead, useNetwork } from "wagmi";
import StakingABI from "@/abis/staking";
import { useEffect, useState } from "react";
import { formatUnits } from "ethers/lib/utils.js";
import { Map } from "@/types/map";
import { PoolData } from "@/types/data";

const stakingContractAddresses: Map = {
  42161: "0xe3d143d7b864f2d0f76f9080d758ded8ca262b26",

} as const;

function calculateAPR(perDayPool: number, stakedAmount: number): number {
  return (perDayPool / stakedAmount) * 365 * 100;
}

function usePoolData(): {
  initialLoad: boolean;
  poolData: PoolData;
} {
  const { chain } = useNetwork();

  const poolsContractRead = useContractRead({
    address: stakingContractAddresses[chain?.id || 42161],
    abi: StakingABI,
    functionName: "getPoolsUI",
    watch: true,
    chainId: chain?.id || 4,
  });

  const [initialLoad, setInitialLoad] = useState(false);
  const [poolData, setPoolData] = useState<PoolData>({
    0: {
      name: "NFTE",
    },
    1: {
      name: "EARTHLING",
    },
    2: {
      name: "ROBOROVER",
    },
    3: {
      name: "NFW3C",
    },
  });

  useEffect(() => {
    if (
      !poolsContractRead ||
      !poolsContractRead.data ||
      poolsContractRead.data.length !== 4
    ) {
      return;
    }
    if (poolsContractRead.isSuccess) {
      setInitialLoad(true);

      const nfteTokenRewardPoolPerHour = +formatUnits(
        poolsContractRead.data[0].currentTimeRange.rewardsPerHour
      );

      const nfteTokenTokenRewardPoolPerDay = nfteTokenRewardPoolPerHour * 24;

      const nfteTokenRewardPerHour =
        +formatUnits(
          poolsContractRead.data[0].currentTimeRange.rewardsPerHour
        ) / +formatUnits(poolsContractRead.data[0].stakedAmount);

      const nfteTokenRewardPerDay = nfteTokenRewardPerHour * 24;

      const nfteTokenStakedAmount = +formatUnits(
        poolsContractRead.data[0].stakedAmount
      );
      const nfteTokenPoolAPR = calculateAPR(nfteTokenRewardPoolPerDay, nfteTokenStakedAmount);

      const earthlingRewardPoolPerHour = +formatUnits(
        poolsContractRead.data[1].currentTimeRange.rewardsPerHour
      );

      const earthlingRewardPoolPerDay = earthlingRewardPoolPerHour * 24;

      const earthlingRewardPerHour =
        +formatUnits(
          poolsContractRead.data[1].currentTimeRange.rewardsPerHour
        ) / +formatUnits(poolsContractRead.data[1].stakedAmount);

      const earthlingRewardPerDay = earthlingRewardPerHour * 24;

      const earthlingStakedAmount = +formatUnits(
        poolsContractRead.data[1].stakedAmount
      );
      const earthlingPoolAPR = calculateAPR(earthlingRewardPoolPerDay, earthlingStakedAmount);

      const roboroverRewardPoolPerHour = +formatUnits(
        poolsContractRead.data[2].currentTimeRange.rewardsPerHour
      );

      const roboroverRewardPoolPerDay = roboroverRewardPoolPerHour * 24;

      const roboroverRewardPerHour =
        +formatUnits(
          poolsContractRead.data[2].currentTimeRange.rewardsPerHour
        ) / +formatUnits(poolsContractRead.data[2].stakedAmount);

      const roboroverRewardPerDay = roboroverRewardPerHour * 24;

      const roboroverStakedAmount = +formatUnits(
        poolsContractRead.data[2].stakedAmount
      );
      const roboroverPoolAPR = calculateAPR(roboroverRewardPoolPerDay, roboroverStakedAmount);

      setPoolData({
        0: {
          name: "NFTE",
          apr: nfteTokenPoolAPR,
          stakedAmount: nfteTokenStakedAmount,
          rewardPoolPerHour: nfteTokenRewardPoolPerHour,
          rewardPoolPerDay: nfteTokenRewardPoolPerDay,
          rewardPerHour: nfteTokenRewardPerHour,
          rewardPerDay: nfteTokenRewardPerDay,
        },
        1: {
          name: "EARTHLING",
          apr: earthlingPoolAPR,
          stakedAmount: earthlingStakedAmount,
          rewardPoolPerHour: earthlingRewardPoolPerHour,
          rewardPoolPerDay: bearthlingRewardPoolPerDay,
          rewardPerHour: earthlingRewardPerHour,
          rewardPerDay: earthlingRewardPerDay,
        },
        2: {
          name: "ROBOROVER",
          apr: roboroverPoolAPR,
          stakedAmount: roboroverStakedAmount,
          rewardPoolPerHour: roboroverRewardPoolPerHour,
          rewardPoolPerDay: roboroverRewardPoolPerDay,
          rewardPerHour: roboroverRewardPerHour,
          rewardPerDay: roboroverRewardPerDay,
        },
        3: {
          name: "NFW3C",
          apr: nfw3cPoolAPR,
          stakedAmount: nfw3cStakedAmount,
          rewardPoolPerHour: nfw3cRewardPoolPerHour,
          rewardPoolPerDay: nfw3cRewardPoolPerDay,
          rewardPerHour: nfw3cRewardPerHour,
          rewardPerDay: nfw3cRewardPerDay,
        },
      });
    }
  }, [
    poolsContractRead.isSuccess,
    poolsContractRead.isRefetching,
    poolsContractRead.data,
  ]);

  return { initialLoad, poolData };
}

export default usePoolData;
