'use client'

import { useRouter } from 'next/navigation'


import Start from '@/components/start'
import MatchupOverview from '@/components/matchup-overview'
import { IoHomeSharp } from "react-icons/io5";

import {
  useRestaurantStore
} from '@/state/state-component';
// Note: types are declared in globals.d.ts
// import { useRestaurantArrayStore1 } from '@/state/state-component';







export default function Home() {
  const router = useRouter();

  const currentRound = useRestaurantStore((state) => state.currentRound);

  const stage = useRestaurantStore((state) => state.stage);
  const { setStage } = useRestaurantStore();

  const { setCurrentRound } = useRestaurantStore();

  const { setRounds } = useRestaurantStore();

  const { setEmailList } = useRestaurantStore();

  const restaurantArray1 = useRestaurantStore((state) => state.restaurantArray);
  const { setRestaurantArray1 } = useRestaurantStore();

  const restaurantArray2 = useRestaurantStore((state) => state.restaurantArray2);
  const { setRestaurantArray2 } = useRestaurantStore();

  const restaurantArray3 = useRestaurantStore((state) => state.restaurantArray3);
  const { setRestaurantArray3 } = useRestaurantStore();



  const handleReset = () => {
    setStage(0);
    setRestaurantArray1([]);
    setCurrentRound(1);
    setRounds(1);
    setRestaurantArray2([]);
    setRestaurantArray3([]);
    setEmailList([]);
    router.refresh();
  }

  return (
    <main className="flex flex-col items-center justify-between w-screen min-h-screen pt-10">
      <nav onClick={handleReset} className="fixed top-0 left-0 z-50 flex flex-row justify-between w-full px-2 py-2 text-2xl text-white bg-black cursor-pointer shrink-0 bg-background"><IoHomeSharp/></nav>
      <div className="z-10 flex flex-col items-center justify-between w-full max-w-5xl gap-10 overflow-scroll font-mono text-sm ">
        <h1 onClick={handleReset} className='mx-auto text-3xl cursor-pointer sm:text-5xl '>Restaurant Resolver</h1>

        {stage === 0 && <Start />}




        {stage === 1 && restaurantArray1[1] && currentRound === 1 ?
          <MatchupOverview restaurantArray={restaurantArray1} />

          : null}

        {stage === 1 && restaurantArray2[0] && currentRound === 2 ?
          <MatchupOverview restaurantArray={restaurantArray2} />

          : null }

        {stage === 1 && restaurantArray3[0] && currentRound === 3 ?
          <MatchupOverview restaurantArray={restaurantArray3} />

          : null }
        {stage===1 && currentRound>0 && !restaurantArray1[1] &&
        <div>You must at least enter two names...</div>
        }

      </div>


    </main>
  )
}
