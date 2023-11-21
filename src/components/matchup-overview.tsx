'use client'
import { create, useStore } from 'zustand'
import { useState, useEffect } from 'react';

import {
  
    useTournamentStageStore,
    useTournamentRoundAmountStore,
    useTournamentRoundStore,
    useRestaurantArrayStore1,
    useRestaurantArrayStore2,
    useRestaurantArrayStore3
} from '@/app/page';
import Matchup from './matchup';

import { useRouter } from 'next/navigation';

// given an array, calculates a random winner for each pair
// eg if there is an array of 4 restaurants, it will find a random
// winner between restaurant 0 and restarurant 1 
// and a random winner between restaurant 2 and 3
const calcWinners = (x: RestaurantArray) => {
    let winners = [];
    for (let i = 0; i < x.length; i += 2) {
        if (!x[i + 1]) {
            winners.push(i);
            continue;
        }
        let random = Math.round(Math.random());
        winners.push(i + random)
    }
    return winners
}

/**
 * A component that calculates the winners of a certain round and passes the winners and the array
 * in question to the Matchup component which visually displays the winner
 * @param {RestaurantArray} restaurantArray An array of restaurants 
 * @dev this is a reusable component and will portray the same behaviour given a different array of different length
 */
const MatchupOverview = ({restaurantArray}: {restaurantArray: RestaurantArray}) => {

    const router = useRouter();

    const { setCurrentRound } = useTournamentRoundStore();
    const currentRound = useTournamentRoundStore((state) => state.currentRound)

    const rounds = useTournamentRoundAmountStore((state) => state.rounds)

    // const restaurantArray2 = useRestaurantArrayStore2((state) => state.restaurantArray2)
    const { setRestaurantArray2 } = useRestaurantArrayStore2();

    // const restaurantArray3 = useRestaurantArrayStore3((state) => state.restaurantArray3);
    const { setRestaurantArray3 } = useRestaurantArrayStore3();

    // generates an array to iterate over -> I use this to insert the restaurants into a 1v1 matchup component
    const matchupList = Array.from(Array(4).keys());


    const winners = calcWinners(restaurantArray)

    // changes the round after a time out and immediately 
    useEffect(() => {

    if (rounds > 1 && currentRound ===1){
        let round1Winners: RestaurantArray = [];
        winners.map((winner) => round1Winners.push(restaurantArray[winner]))
        setRestaurantArray2(round1Winners);
        setTimeout(() => {
        
            setCurrentRound(2)
            // router.refresh();
        }, 3000*rounds);
    }
    if (rounds === 3 && currentRound ===2){
        let round2Winners: RestaurantArray = [];
        winners.map((winner) => round2Winners.push(restaurantArray[winner]))
        setRestaurantArray3(round2Winners);
        setTimeout(() => {
            
            setCurrentRound(3)
            // router.refresh();
        }, 6000);
    }

    }, [currentRound])


    return (
        <div className="flex flex-col gap-3 overflow-scroll w-full bg-blue-200  text-black  items-center justify-center">
            <h2 className='animate-flash-temp text-2xl font-semibold'>Round: {currentRound===rounds?'Final Round' : currentRound} </h2>

            {matchupList.map((num) => (
                <div key={num} className='items-center mx-auto flex justify-center w-full'>
                    {restaurantArray[num * 2] ?
                        <div className='bg-white border items-center flex justify-center overflow-scroll border-black rounded-md p-2 w-full'>
                            <Matchup teamA={num * 2} teamB={restaurantArray[num * 2 + 1] ? num * 2 + 1 : null} restaurantArray={restaurantArray} winners={winners}/>
                        </div>
                        : <div key={num}></div>
                    }

                </div>

            ))}

        </div>
    )

}
export default MatchupOverview