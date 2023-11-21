// Zustand state init
import { create } from 'zustand'

export const useRestaurantStore = create<RestaurantStoreType>()((set) =>  ({
    restaurantArray: [],
    setRestaurantArray1: (restaurantArray: string[]) => set({ restaurantArray }),

    restaurantArray2: [],
    setRestaurantArray2: (restaurantArray2: string[]) => set({ restaurantArray2 }),
    
    restaurantArray3: [],
    setRestaurantArray3: (restaurantArray3: string[]) => set({ restaurantArray3 }),
    
    stage: 0,
    setStage: (stage: number) => set({ stage }),
    
    rounds: 1,
    setRounds: (rounds: number) => set({ rounds }),
    
    currentRound: 1,
    setCurrentRound: (currentRound: number) => set({ currentRound }),

}))


