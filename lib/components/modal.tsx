"use client";

import ABI from "@/abis/staking";
import useAllStakes, { poolStakesData } from "@/hooks/useAllStakes";
import { Map } from "@/types/map";
import {
  CheckCircleIcon,
  ClockIcon,
  WalletIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { BigNumber, ethers } from "ethers";
import { Modal } from "flowbite-react";
import { Dispatch, useEffect, useState } from "react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";

const stakingContractAddresses: Map = {
  1: "0xe3d143d7b864f2d0f76f9080d758ded8ca262b26",
} as const;

function displaynfteToken(nfte: BigNumber | number): string {
  return Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  }).format(+ethers.utils.formatUnits(nfteToken));
}

const ClaimnfteToken = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { nfteTokenStakes } = useAllStakes(address as string);

  const nfteTokenPrepareContractWrite = usePrepareContractWrite({
    address: stakingContractAddresses[chain?.id || 1],
    abi: ABI,
    functionName: "claimSelfnfteToken",
  });

  const nfteTokenContractWrite = useContractWrite(
    nfteTokenPrepareContractWrite.config
  );

  useEffect(() => {
    nfteTokenContractWrite.write?.();
  }, []);

  if (!nfteTokenStakes) return <>No nfteToken</>;
  return (
    <>
      Claim {displaynfteToken(nfteTokenStakes[0].unclaimed)} from nfteToken Pool{" "}
      <CheckCircleIcon className="h-5 w-5 text-green-500" />
      <a
        href=""
        className="text-sm text-green-800 hover:underline dark:text-green-400"
      >
        View Tx
      </a>
    </>
  );
};

const ClaimEARTHLINGS = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const { EARTHLINGSStakes } = useAllStakes(address as string);

  const [state, setState] = useState<string>();

  const args = EARTHLINGSStakes
    ?.map((token) => {
      if (token.unclaimed?.gt(0)) {
        return token.tokenId.toNumber();
      }
    })
    .filter((token) => {
      return token !== undefined;
    });

  const EARTHLINGSPrepareContractWrite = usePrepareContractWrite({
    address: stakingContractAddresses[chain?.id || 1],
    abi: ABI,
    functionName: "claimSelfEARTHLINGS",
    args: [args as any],
  });

  const EARTHLINGSContractWrite = useContractWrite(EARTHLINGSPrepareContractWrite.config);

  const EARTHLINGSPoolUnclaimed =
    EARTHLINGSStakes?.reduce((total, token) => {
      return total.add(token.unclaimed);
    }, ethers.constants.Zero) || 0;

//   useEffect(() => {
//     if (state !== "started") {
//       if (EARTHLINGSContractWrite.write) {
//         setState("started");
//         EARTHLINGSContractWrite.write();
//       }
//     }
//   }, [EARTHLINGSContractWrite.write]);

  if (!EARTHLINGSStakes) return <>No EARTHLINGS rewards</>;
  return (
    <>
      Claim {displaynfteToken(EARTHLINGSPoolUnclaimed)} from EARTHLINGS Pool{" "}
      <CheckCircleIcon className="h-5 w-5 text-green-500" />
      <a
        href=""
        className="text-sm text-green-800 hover:underline dark:text-green-400"
      >
        View Tx
      </a>
    </>
  );
};

const ClaimAllModal: React.FC<{
  show: boolean;
  setShow: Dispatch<boolean>;
  address: string;
}> = ({ show, setShow }) => {
  const onClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onClose={onClose}>
        <Modal.Header>Claim All Rewards</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <p className="text-sm">
              To claim all your nfteToken staking rewards you will need to create
              3 separate transactions from your wallet which should have opened
              automatically. If it did not open please check it manually.
            </p>

            <ol className="gap-y-4">
              <li className="flex items-center gap-2 py-1 text-sm text-gray-500 dark:text-gray-400">
                <ClaimnfteToken />
              </li>

              <li className="flex items-center gap-2 py-1 text-sm text-gray-500 dark:text-gray-400">
                <ClaimEARTHLINGS />
              </li>
              {/* 1) Claim {displaynfteToken(nfteTokenPoolUnclaimed)} from nfteToken
                Pool <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <a
                  href=""
                  className="text-sm text-green-800 hover:underline dark:text-green-400"
                >
                  View Tx
                </a>
              </li>

              <li className="flex items-center gap-2 py-1 text-sm text-gray-500 dark:text-gray-400">
                1) Claim {displaynfteToken(EARTHLINGSPoolUnclaimed)} from nfteToken Pool{" "}
                <XCircleIcon className="h-5 w-5 text-red-800 dark:text-red-500" />{" "}
                <span className="text-sm text-red-900 dark:text-red-400">
                  Rejected
                </span>
              </li>
              <li className="flex items-center gap-2 py-1 text-sm">
                2) Claim {displaynfteToken(EARTHLINGSPoolUnclaimed)} from EARTHLINGS Pool{" "}
                <WalletIcon className="h-5 w-5" />{" "}
                <span className="text-sms">Confirm</span>
              </li>
              <li className="flex items-center gap-2 py-1 text-sm">
                2) Claim {displaynfteToken(ROBOROVERSPoolUnclaimed)} from ROBOROVERS Pool{" "}
                <WalletIcon className="h-5 w-5" />{" "}
                <span className="text-sms">Confirm</span>
              </li>
              <li className="flex items-center gap-2 py-1 text-sm">
                2) Claim {displaynfteToken(EARTHLINGSPoolUnclaimed)} from EARTHLINGS Pool{" "}
                <ClockIcon className="h-5 w-5  text-blue-800 hover:underline dark:text-blue-500" />
                <a
                  href=""
                  className="text-sm text-blue-800 hover:underline dark:text-blue-400"
                >
                  View Tx
                </a>
              </li>
              <li className="flex items-center py-1 text-sm text-gray-500 dark:text-gray-400">
                3) Claim {displaynfteToken(NFW3CPoolUnclaimed)} from NFW3C Pool{" "}
              </li> */}
            </ol>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClaimAllModal;
