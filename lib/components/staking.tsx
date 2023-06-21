"use client";

import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import useAllStakes from "@/hooks/useAllStakes";
import { ethers, BigNumber } from "ethers";
import usePrice from "@/hooks/usePrice";
import useAutoConnecting from "@/hooks/useAutoConnecting";
import { nfteTokenTable, NftTable, Nfw3cTable } from "@/components/tables";
import useAllowance from "@/hooks/useAllowance";
import Allowance from "./allowance";
import { formatUnits } from "ethers/lib/utils.js";
import UserStaking from "./userStaking";

interface poolStakesData {
  poolId: BigNumber;
  tokenId: BigNumber;
  deposited: BigNumber;
  unclaimed: BigNumber;
  rewards24hr: BigNumber;
  pair: { mainTokenId: BigNumber; mainTypePoolId: BigNumber };
}

export default function Staking() {
  const { address, isConnected } = useAccount();
  const { nftePrice } = usePrice();
  const autoConnecitng = useAutoConnecting();
  const allowance = useAllowance();
  const [statsAddress, setStatsAddress] = useState<string>("");
  useEffect(() => {
    if (address) {
      setStatsAddress(address);
    }
  }, [address]);

  const { poolsContractRead: allStakes } = useAllStakes(statsAddress);

  if (!isConnected) {
    return <h1>You must be connected to stake.</h1>;
  }

  if (!allStakes || !allStakes.data) {
    return <h1>Loading staking contract data...</h1>;
  }

  const nfteTokenStakes: poolStakesData[] | undefined = allStakes.data?.filter(
    (stake) => {
      if (stake.poolId.toNumber() === 0) {
        return true;
      }
    }
  );

  const earthlingsStakes: poolStakesData[] | undefined = allStakes.data.filter(
    (stake) => {
      if (stake.poolId.toNumber() === 1) {
        return true;
      }
    }
  );

  const roboroversStakes: poolStakesData[] | undefined = allStakes.data.filter(
    (stake) => {
      if (stake.poolId.toNumber() === 2) {
        return true;
      }
    }
  );

  const Nfw3cStakes: poolStakesData[] | undefined = allStakes.data.filter(
    (stake) => {
      if (stake.poolId.toNumber() === 3) {
        return true;
      }
    }
  );

  const withdrawArgs = (poolID: number, asString: boolean) => {
    if (poolID === 0) {
      const token = allStakes.data?.[0];
      if (token?.deposited.gt(0)) {
        return asString ? token.deposited.toString() : token.deposited;
      } else {
        return "";
      }
    }
    return allStakes.data
      ?.filter((stake) => {
        if (stake.poolId.toNumber() === poolID) {
          return true;
        }
      })
      .map((token) => {
        if (token.deposited?.gt(0)) {
          if (asString) {
            return [token.tokenId.toNumber(), token.deposited.toString()];
          } else {
            return [
              {
                tokenId: token.tokenId,
                amount: token.deposited,
              },
            ];
          }
        }
      })
      .filter((token) => {
        return token !== undefined;
      });
  };

  const withdrawNfw3cArgs = (mainTypePoolId: number, asString: boolean) => {
    return allStakes.data
      ?.filter((stake) => {
        if (
          stake.poolId.toNumber() === 3 &&
          stake.pair.mainTypePoolId.toNumber() === mainTypePoolId
        ) {
          return true;
        }
      })
      .map((token) => {
        if (token.deposited?.gt(0)) {
          if (asString) {
            return [
              token.pair.mainTokenId.toNumber(),
              token.tokenId.toNumber(),
              token.deposited.toString(),
              "true",
            ];
          } else {
            return [
              {
                mainTokenId: token.pair.mainTokenId,
                Nfw3cTokenId: token.tokenId,
                amount: token.deposited,
                isUncommit: true,
              },
            ];
          }
        }
      })
      .filter((token) => {
        return token !== undefined;
      });
  };

  const claimArgs = (poolID: number, asString: boolean) => {
    if (poolID === 0) {
      const token = allStakes.data?.[0];
      if (token?.unclaimed.gt(0)) {
        return asString ? token.unclaimed.toString() : token.unclaimed;
      } else {
        return "";
      }
    }
    return allStakes.data
      ?.filter((stake) => {
        if (stake.poolId.toNumber() === poolID) {
          return true;
        }
      })
      .map((token) => {
        if (token.unclaimed?.gt(0)) {
          if (asString) {
            return token.tokenId.toNumber();
          } else {
            return;
            {
              tokenId: token.tokenId;
            }
          }
        }
      })
      .filter((token) => {
        return token !== undefined;
      });
  };

  const claimNfw3cArgs = (mainTypePoolId: number, asString: boolean) => {
    return allStakes.data
      ?.filter((stake) => {
        if (
          stake.poolId.toNumber() === 3 &&
          stake.pair.mainTypePoolId.toNumber() === mainTypePoolId
        ) {
          return true;
        }
      })
      .map((token) => {
        if (token.unclaimed?.gt(0)) {
          if (asString) {
            return [
              token.pair.mainTokenId.toNumber(),
              token.tokenId.toNumber(),
              token.unclaimed.toString(),
            ];
          } else {
            return [
              {
                mainTokenId: token.pair.mainTokenId,
                tokenId: token.tokenId,
                amount: token.unclaimed,
              },
            ];
          }
        }
      })
      .filter((token) => {
        return token !== undefined;
      });
  };

  const earthlingsOptions = earthlingsStakes.map((data) => {
    return { label: `earthlings ${data.tokenId}` };
  });

  const roboroversOptions = roboroversStakes.map((data) => {
    return { label: `roborovers ${data.tokenId}` };
  });

  const options = earthlingsOptions.concat(roboroversOptions);

  return (
    <div>
      <div>
        <UserStaking />
      </div>

      <div className="mt-10 overflow-scroll">
        {/* {allowance?.data?.eq(0) ? (
          <>
            <div>nfteToken Staking Contract Allowance Approval not set:</div>
            <Allowance />
          </>
        ) : (
          <div>
            nfteToken Staking Contract Allowance set to{" "}
            {+formatUnits(allowance.data?.toString()!) >= 1e9
              ? "Unlimited"
              : formatUnits(allowance.data?.toString()!)}
            <Allowance />
          </div>
        )} */}

        <h2 className="text-4xl font-extrabold">nfteToken Staking Pool</h2>
        <nfteTokenTable
          nfteTokenStakes={nfteTokenStakes}
          withdrawArgs={withdrawArgs}
          claimArgs={claimArgs}
          nfteTokenPrice={nfteTokenPrice}
        />

        <h2 className="mt-10 text-4xl font-extrabold">
          Bored Ape Yacht Club Pool
        </h2>

        <NftTable
          poolId={1}
          tokenSymbol="earthlings"
          poolStakes={earthlingsStakes}
          withdrawArgs={withdrawArgs}
          claimArgs={claimArgs}
          nfteTokenPrice={nfteTokenPrice}
          withdrawFunctionID="24"
          claimFunctionID="8"
          depositFunctionID="12"
        />

        <h2 className="mt-10 text-4xl font-extrabold">
          Mutant Ape Yacht Club Pool
        </h2>

        <NftTable
          poolId={2}
          tokenSymbol={"roborovers"}
          poolStakes={roboroversStakes}
          withdrawArgs={withdrawArgs}
          claimArgs={claimArgs}
          nfteTokenPrice={nfteTokenPrice}
          withdrawFunctionID="25"
          claimFunctionID="9"
          depositFunctionID="13"
        />

        <h2 className="mt-10 text-4xl font-extrabold">
          Bored Ape Kennel Club Pool
        </h2>

        <Nfw3cTable
          poolStakes={Nfw3cStakes}
          withdrawArgs={withdrawNfw3cArgs}
          claimArgs={claimNfw3cArgs}
          nfteTokenPrice={nfteTokenPrice}
          pairOptions={options}
        />
      </div>
    </div>
  );
}
