import { BigNumber, constants } from "ethers";
import produce from "immer";
import create from "zustand";
import { devtools } from "zustand/middleware";

import { EventData } from "@/types/event";
import { TimeFrame } from "@/types/timeframe";
import { Amount } from "@/types/data";

interface AppState {
  nfteTokenBalance: any;
  setNfteTokenBalance: any;
  autoConnecting: boolean;
  setAutoConnecting: (autoConnecting: boolean) => void;

  events: EventData[];
  addEvent: (event: EventData) => void;
  setEvents: (events: EventData[]) => void;

  timeframe: TimeFrame;
  setTimeframe: (timeframe: TimeFrame) => void;

  amount: Amount;
  setAmount: (amount: Amount) => void;

  nfteTokenBalance: BigNumber | undefined;
  setNfteTokenBalance: (balance: BigNumber | undefined) => void;
}

const useStore = create<AppState>()(
  devtools((set) => ({
    autoConnecting: false,
    setAutoConnecting: (autoConnecting) => {
      set(() => ({ autoConnecting: autoConnecting }));
    },
    timeframe: TimeFrame.Daily,
    setTimeframe: (newTimeframe) => {
      set(() => ({ timeframe: newTimeframe }));
    },
    amount: Amount.PerApe,
    setAmount: (newAmount) => {
      set(() => ({ amount: newAmount }));
    },
    nfteTokenBalance: undefined,
    setNfteTokenBalance: (balance) => {
      set(() => ({ nfteTokenBalance: balance }));
    },
    events: [],
    addEvent: (newEvent) => {
      set(
        produce((state) => {
          if (newEvent.amount.gt(constants.Zero)) {
            if (state.events.length >= 10) {
              state.events.pop();
            }
            state.events.unshift(newEvent);
          }
        })
      );
    },
    setEvents: (newEvents) => {
      set(
        produce((state) => {
          for (let i = 0; i < newEvents.length; i++) {
            const newEvent = newEvents[i];
            if (newEvent.amount.gt(constants.Zero)) {
              if (state.events.length >= 10) {
                state.events.pop();
              }
              state.events.unshift(newEvent);
            }
          }
        })
      );
    },
  }))
);

export default useStore;
