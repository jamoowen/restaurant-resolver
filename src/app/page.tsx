'use client'

import { useRouter } from 'next/navigation'


import Start from '@/components/start'
import MatchupOverview from '@/components/matchup-overview'
import { IoHomeSharp } from "react-icons/io5";

import {
  useRestaurantArrayStore1,
  useRestaurantArrayStore2,
  useRestaurantArrayStore3,
  useTournamentStageStore,
  useTournamentRoundAmountStore,
  useTournamentRoundStore,
} from '@/state/state-component';
// Note: types are declared in globals.d.ts
// import { useRestaurantArrayStore1 } from '@/state/state-component';







export default function Home() {
  const router = useRouter();

  const currentRound = useTournamentRoundStore((state) => state.currentRound);

  const stage = useTournamentStageStore((state) => state.stage);
  const { setStage } = useTournamentStageStore();

  const { setCurrentRound } = useTournamentRoundStore();

  const { setRounds } = useTournamentRoundAmountStore();

  const restaurantArray1 = useRestaurantArrayStore1((state) => state.restaurantArray);
  const { setRestaurantArray1 } = useRestaurantArrayStore1();

  const restaurantArray2 = useRestaurantArrayStore2((state) => state.restaurantArray2);
  const { setRestaurantArray2 } = useRestaurantArrayStore2();

  const restaurantArray3 = useRestaurantArrayStore3((state) => state.restaurantArray3);
  const { setRestaurantArray3 } = useRestaurantArrayStore3();



  const handleReset = () => {
    setStage(0);
    setRestaurantArray1([]);
    setCurrentRound(1);
    setRounds(1);
    setRestaurantArray2([]);
    setRestaurantArray3([]);
    router.refresh();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <nav onClick={handleReset} className="cursor-pointer fixed bg-black top-0 py-2 left-0 z-50 flex flex-row justify-between w-full px-2 text-2xl text-white shrink-0 bg-background"><IoHomeSharp/></nav>
      <div className="z-10 flex flex-col max-w-5xl w-full items-center gap-10 justify-between font-mono text-sm ">
        <h1 onClick={handleReset} className='cursor-pointer text-5xl mx-auto '>Restaurant Resolver</h1>

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
