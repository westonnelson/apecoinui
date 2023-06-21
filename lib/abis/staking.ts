const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_startTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endTimeStamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_capPerPosition",
				"type": "uint256"
			}
		],
		"name": "addTimeRange",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_nfts",
				"type": "uint256[]"
			},
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"name": "claimROBOROVERS",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_NfteTokenContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_EARTHLINGSContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_ROBOROVERSContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_NFW3CContractAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "CallerNotOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_nfts",
				"type": "uint256[]"
			},
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"name": "claimEARTHLINGS",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"name": "claimNfteToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint128",
						"name": "mainTokenId",
						"type": "uint128"
					},
					{
						"internalType": "uint128",
						"name": "NFW3CTokenId",
						"type": "uint128"
					}
				],
				"internalType": "struct NfteTokenStaking.PairNft[]",
				"name": "_EARTHLINGSPairs",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "uint128",
						"name": "mainTokenId",
						"type": "uint128"
					},
					{
						"internalType": "uint128",
						"name": "NFW3CTokenId",
						"type": "uint128"
					}
				],
				"internalType": "struct NfteTokenStaking.PairNft[]",
				"name": "_ROBOROVERSPairs",
				"type": "tuple[]"
			},
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"name": "claimNFW3C",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DepositMoreThanOneAPE",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "EndNotWholeHour",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ExceededCapAmount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ExceededStakedAmount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidPoolId",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MainTokenNotOwnedOrPaired",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NFW3CAlreadyPaired",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NFW3CNotOwnedOrPaired",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NeitherTokenInPairOwnedByCaller",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotOwnerOfMain",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotOwnerOfNFW3C",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ProvidedTokensNotPaired",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "SplitPairCantPartiallyWithdraw",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "StartMustBeGreaterThanEnd",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "StartMustEqualLastEnd",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "StartNotWholeHour",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "UncommitWrongParameters",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "ClaimRewards",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ClaimRewardsNft",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "mainTypePoolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "mainTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "NFW3CTokenId",
				"type": "uint256"
			}
		],
		"name": "ClaimRewardsPairNft",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_nfts",
				"type": "uint256[]"
			}
		],
		"name": "claimSelfEARTHLINGS",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimSelfNfteToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint128",
						"name": "mainTokenId",
						"type": "uint128"
					},
					{
						"internalType": "uint128",
						"name": "NFW3CTokenId",
						"type": "uint128"
					}
				],
				"internalType": "struct NfteTokenStaking.PairNft[]",
				"name": "_EARTHLINGSPairs",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "uint128",
						"name": "mainTokenId",
						"type": "uint128"
					},
					{
						"internalType": "uint128",
						"name": "NFW3CTokenId",
						"type": "uint128"
					}
				],
				"internalType": "struct NfteTokenStaking.PairNft[]",
				"name": "_ROBOROVERSPairs",
				"type": "tuple[]"
			}
		],
		"name": "claimSelfNFW3C",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_nfts",
				"type": "uint256[]"
			}
		],
		"name": "claimSelfROBOROVERS",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "tokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint224",
						"name": "amount",
						"type": "uint224"
					}
				],
				"internalType": "struct NfteTokenStaking.SingleNft[]",
				"name": "_nfts",
				"type": "tuple[]"
			}
		],
		"name": "depositEARTHLINGS",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "DepositNft",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"name": "depositNfteToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "mainTokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "NFW3CTokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint184",
						"name": "amount",
						"type": "uint184"
					}
				],
				"internalType": "struct NfteTokenStaking.PairNftDepositWithAmount[]",
				"name": "_EARTHLINGSPairs",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "mainTokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "NFW3CTokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint184",
						"name": "amount",
						"type": "uint184"
					}
				],
				"internalType": "struct NfteTokenStaking.PairNftDepositWithAmount[]",
				"name": "_ROBOROVERSPairs",
				"type": "tuple[]"
			}
		],
		"name": "depositNFW3C",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "mainTypePoolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "mainTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "NFW3CTokenId",
				"type": "uint256"
			}
		],
		"name": "DepositPairNft",
		"type": "event"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "tokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint224",
						"name": "amount",
						"type": "uint224"
					}
				],
				"internalType": "struct NfteTokenStaking.SingleNft[]",
				"name": "_nfts",
				"type": "tuple[]"
			}
		],
		"name": "depositROBOROVERS",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "depositSelfNfteToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			}
		],
		"name": "removeLastTimeRange",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			}
		],
		"name": "updatePool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lastRewardedBlock",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "stakedAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "accumulatedRewardsPerShare",
				"type": "uint256"
			}
		],
		"name": "UpdatePool",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "tokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint224",
						"name": "amount",
						"type": "uint224"
					}
				],
				"internalType": "struct NfteTokenStaking.SingleNft[]",
				"name": "_nfts",
				"type": "tuple[]"
			},
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"name": "withdrawEARTHLINGS",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "poolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "WithdrawNft",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"name": "withdrawNfteToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "mainTokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "NFW3CTokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint184",
						"name": "amount",
						"type": "uint184"
					},
					{
						"internalType": "bool",
						"name": "isUncommit",
						"type": "bool"
					}
				],
				"internalType": "struct NfteTokenStaking.PairNftWithdrawWithAmount[]",
				"name": "_EARTHLINGSPairs",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "mainTokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "NFW3CTokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint184",
						"name": "amount",
						"type": "uint184"
					},
					{
						"internalType": "bool",
						"name": "isUncommit",
						"type": "bool"
					}
				],
				"internalType": "struct NfteTokenStaking.PairNftWithdrawWithAmount[]",
				"name": "_ROBOROVERSPairs",
				"type": "tuple[]"
			}
		],
		"name": "withdrawNFW3C",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "mainTypePoolId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "mainTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "NFW3CTokenId",
				"type": "uint256"
			}
		],
		"name": "WithdrawPairNft",
		"type": "event"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "tokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint224",
						"name": "amount",
						"type": "uint224"
					}
				],
				"internalType": "struct NfteTokenStaking.SingleNft[]",
				"name": "_nfts",
				"type": "tuple[]"
			},
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"name": "withdrawROBOROVERS",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "tokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint224",
						"name": "amount",
						"type": "uint224"
					}
				],
				"internalType": "struct NfteTokenStaking.SingleNft[]",
				"name": "_nfts",
				"type": "tuple[]"
			}
		],
		"name": "withdrawSelfEARTHLINGS",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawSelfNfteToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "tokenId",
						"type": "uint32"
					},
					{
						"internalType": "uint224",
						"name": "amount",
						"type": "uint224"
					}
				],
				"internalType": "struct NfteTokenStaking.SingleNft[]",
				"name": "_nfts",
				"type": "tuple[]"
			}
		],
		"name": "withdrawSelfROBOROVERS",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addressPosition",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "stakedAmount",
				"type": "uint256"
			},
			{
				"internalType": "int256",
				"name": "rewardsDebt",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getAllStakes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "poolId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deposited",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "unclaimed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewards24hr",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "mainTokenId",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "mainTypePoolId",
								"type": "uint256"
							}
						],
						"internalType": "struct NfteTokenStaking.DashboardPair",
						"name": "pair",
						"type": "tuple"
					}
				],
				"internalType": "struct NfteTokenStaking.DashboardStake[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getEARTHLINGSStakes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "poolId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deposited",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "unclaimed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewards24hr",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "mainTokenId",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "mainTypePoolId",
								"type": "uint256"
							}
						],
						"internalType": "struct NfteTokenStaking.DashboardPair",
						"name": "pair",
						"type": "tuple"
					}
				],
				"internalType": "struct NfteTokenStaking.DashboardStake[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getNfteTokenStake",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "poolId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deposited",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "unclaimed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewards24hr",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "mainTokenId",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "mainTypePoolId",
								"type": "uint256"
							}
						],
						"internalType": "struct NfteTokenStaking.DashboardPair",
						"name": "pair",
						"type": "tuple"
					}
				],
				"internalType": "struct NfteTokenStaking.DashboardStake",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getNFW3CStakes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "poolId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deposited",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "unclaimed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewards24hr",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "mainTokenId",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "mainTypePoolId",
								"type": "uint256"
							}
						],
						"internalType": "struct NfteTokenStaking.DashboardPair",
						"name": "pair",
						"type": "tuple"
					}
				],
				"internalType": "struct NfteTokenStaking.DashboardStake[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPoolsUI",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "poolId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stakedAmount",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint48",
								"name": "startTimestampHour",
								"type": "uint48"
							},
							{
								"internalType": "uint48",
								"name": "endTimestampHour",
								"type": "uint48"
							},
							{
								"internalType": "uint96",
								"name": "rewardsPerHour",
								"type": "uint96"
							},
							{
								"internalType": "uint96",
								"name": "capPerPosition",
								"type": "uint96"
							}
						],
						"internalType": "struct NfteTokenStaking.TimeRange",
						"name": "currentTimeRange",
						"type": "tuple"
					}
				],
				"internalType": "struct NfteTokenStaking.PoolUI",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "poolId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stakedAmount",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint48",
								"name": "startTimestampHour",
								"type": "uint48"
							},
							{
								"internalType": "uint48",
								"name": "endTimestampHour",
								"type": "uint48"
							},
							{
								"internalType": "uint96",
								"name": "rewardsPerHour",
								"type": "uint96"
							},
							{
								"internalType": "uint96",
								"name": "capPerPosition",
								"type": "uint96"
							}
						],
						"internalType": "struct NfteTokenStaking.TimeRange",
						"name": "currentTimeRange",
						"type": "tuple"
					}
				],
				"internalType": "struct NfteTokenStaking.PoolUI",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "poolId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stakedAmount",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint48",
								"name": "startTimestampHour",
								"type": "uint48"
							},
							{
								"internalType": "uint48",
								"name": "endTimestampHour",
								"type": "uint48"
							},
							{
								"internalType": "uint96",
								"name": "rewardsPerHour",
								"type": "uint96"
							},
							{
								"internalType": "uint96",
								"name": "capPerPosition",
								"type": "uint96"
							}
						],
						"internalType": "struct NfteTokenStaking.TimeRange",
						"name": "currentTimeRange",
						"type": "tuple"
					}
				],
				"internalType": "struct NfteTokenStaking.PoolUI",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "poolId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stakedAmount",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint48",
								"name": "startTimestampHour",
								"type": "uint48"
							},
							{
								"internalType": "uint48",
								"name": "endTimestampHour",
								"type": "uint48"
							},
							{
								"internalType": "uint96",
								"name": "rewardsPerHour",
								"type": "uint96"
							},
							{
								"internalType": "uint96",
								"name": "capPerPosition",
								"type": "uint96"
							}
						],
						"internalType": "struct NfteTokenStaking.TimeRange",
						"name": "currentTimeRange",
						"type": "tuple"
					}
				],
				"internalType": "struct NfteTokenStaking.PoolUI",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getROBOROVERSStakes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "poolId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deposited",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "unclaimed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewards24hr",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "mainTokenId",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "mainTypePoolId",
								"type": "uint256"
							}
						],
						"internalType": "struct NfteTokenStaking.DashboardPair",
						"name": "pair",
						"type": "tuple"
					}
				],
				"internalType": "struct NfteTokenStaking.DashboardStake[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getSplitStakes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "poolId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "deposited",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "unclaimed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewards24hr",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "mainTokenId",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "mainTypePoolId",
								"type": "uint256"
							}
						],
						"internalType": "struct NfteTokenStaking.DashboardPair",
						"name": "pair",
						"type": "tuple"
					}
				],
				"internalType": "struct NfteTokenStaking.DashboardStake[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getTimeRangeBy",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint48",
						"name": "startTimestampHour",
						"type": "uint48"
					},
					{
						"internalType": "uint48",
						"name": "endTimestampHour",
						"type": "uint48"
					},
					{
						"internalType": "uint96",
						"name": "rewardsPerHour",
						"type": "uint96"
					},
					{
						"internalType": "uint96",
						"name": "capPerPosition",
						"type": "uint96"
					}
				],
				"internalType": "struct NfteTokenStaking.TimeRange",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "mainToNFW3C",
		"outputs": [
			{
				"internalType": "uint248",
				"name": "tokenId",
				"type": "uint248"
			},
			{
				"internalType": "bool",
				"name": "isPaired",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nftContracts",
		"outputs": [
			{
				"internalType": "contract ERC721Enumerable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "NfteToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nftPosition",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "stakedAmount",
				"type": "uint256"
			},
			{
				"internalType": "int256",
				"name": "rewardsDebt",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "NFW3CToMain",
		"outputs": [
			{
				"internalType": "uint248",
				"name": "tokenId",
				"type": "uint248"
			},
			{
				"internalType": "bool",
				"name": "isPaired",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "pendingRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pools",
		"outputs": [
			{
				"internalType": "uint48",
				"name": "lastRewardedTimestampHour",
				"type": "uint48"
			},
			{
				"internalType": "uint16",
				"name": "lastRewardsRangeIndex",
				"type": "uint16"
			},
			{
				"internalType": "uint96",
				"name": "stakedAmount",
				"type": "uint96"
			},
			{
				"internalType": "uint96",
				"name": "accumulatedRewardsPerShare",
				"type": "uint96"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_poolId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_from",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_to",
				"type": "uint256"
			}
		],
		"name": "rewardsBy",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "stakedTotal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default ABI