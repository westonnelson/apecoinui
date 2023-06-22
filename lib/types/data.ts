export enum PoolType {
  NFTE = 0,
  EARTHLINGS = 1,
  ROBOROVERS = 2,
  NFW3C = 3,
}

export type PoolData = {
  [key in PoolType]: {
    name: string;
    stakedAmount?: number;
    rewardPoolPerHour?: number;
    rewardPoolPerDay?: number;
    rewardPerHour?: number;
    rewardPerDay?: number;
    apr?: number;
  };
};

export enum Amount {
  PerNFTE = "PerNFTE",
  Max = "Max",
}
