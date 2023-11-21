// Zustand state init
import { create } from 'zustand'


export const useRestaurantArrayStore1 = create<RestaurantArrayState1>()((set) => ({
    restaurantArray: [],
    setRestaurantArray1: (restaurantArray: string[]) => set({ restaurantArray }),
  }));
  
  export const useRestaurantArrayStore2 = create<RestaurantArrayState2>()((set) => ({
    restaurantArray2: [],
    setRestaurantArray2: (restaurantArray2: string[]) => set({ restaurantArray2 }),
  }));
  
  export const useRestaurantArrayStore3 = create<RestaurantArrayState3>()((set) => ({
    restaurantArray3: [],
    setRestaurantArray3: (restaurantArray3: string[]) => set({ restaurantArray3 }),
  }));
  
  
  export const useTournamentStageStore = create<TournamentStageState>()((set) => ({
    stage: 0,
    setStage: (stage: number) => set({ stage }),
  }));
  
  export const useTournamentRoundAmountStore = create<TournamentRoundAmountState>()((set) => ({
    rounds: 1,
    setRounds: (rounds: number) => set({ rounds }),
  }));
  
  export const useTournamentRoundStore = create<TournamentRoundState>()((set) => ({
    currentRound: 1,
    setCurrentRound: (currentRound: number) => set({ currentRound }),
  }));