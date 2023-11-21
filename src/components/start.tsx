'use client'

import { useState } from 'react';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useTournamentStageStore, useTournamentRoundAmountStore, useRestaurantArrayStore1,} from '@/app/page';

// shuffles array 
function shuffleArray(array: RestaurantArray) {
    // Copy the original array to avoid modifying the original
    const shuffledArray = array.slice();

    // Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at i and j
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

// form input
const MatchupItem = ({ index }: { index: string }) => {
    return (
        <>
            <label htmlFor={index}>Restaurant {Number(index) + 1}</label>
            <input type='text' name={`restaurant${index}`} id={`restaurant${index}`} className='bg-white outline outline-black p-2 m-2 text-black ' />
        </>
    )
}



const Start = () => {

    // stage state -> Entering inputs = 0; knockouts= 1;
    const stage = useTournamentStageStore((state) => state.stage);
    const { setStage } = useTournamentStageStore();

    const rounds = useTournamentRoundAmountStore((state) => state.rounds);
    const { setRounds } = useTournamentRoundAmountStore()

    const { setRestaurantArray1 } = useRestaurantArrayStore1();

    // This is the amount of input fields (the amount of restaurants to enter the tournament)
    const [numberMatchups, setNumberMatchups] = useState<number>(4);

    // this is just initialized to get a list which i can map over
    let matchupList = Array.from(Array(numberMatchups).keys());

    // submits the restaurants in the form -> sets the restaurants and stage 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
     
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let restaurantList: RestaurantArray = [];

        formData.forEach((value, key, formData) => {
            if (value.toString().length > 0) {
            
                restaurantList.push(
                    value.toString(),
                );
            }

        });
        
        setRestaurantArray1(shuffleArray(restaurantList))
        setStage(1);
        if (restaurantList.length > 2 && restaurantList.length < 5) {            
            setRounds(2)
        }
        if (restaurantList.length > 4) {            
            setRounds(3);
        }        
        

    }


    return (
        <div className='text-black bg-white flex flex-col p-5'>
        <p className='mb-5'>Can&apos;t decide on a restaurant?</p>
        <p className='mb-5'>All of your friends want to go somewhere different?</p>
        <p>Enter the names of the restaurants you are considering below, and let fate decide where you will go.  </p>
        <span className='text-4xl'>🧙‍♂️</span>
        <div className=" bg-white mt-5 text-black  items-center justify-center">
            
            <form onSubmit={handleSubmit}>
                <div className="flex grid-cols-2 text-black ">
                    <div className='col-span-1'>
                        {matchupList.map((num) => (
                            <div className='p-2 gap-2' key={num}>
                                <MatchupItem index={num.toString()} />
                            </div>
                        ))}


                    </div>
                    <div className='col-span-1 flex my-auto mx-auto text-white justify-self-start'>
                        <button type='submit' className='w-24 bg-blue-500 p-2'>
                            Calculate Winner
                        </button>
                    </div>

                </div>
            </form>
            <p className='text-xs'>You can add up to 8 restaurants</p>
            <button className='p-2 text-2xl ' disabled={numberMatchups > 7} onClick={() => setNumberMatchups(numberMatchups + 1)}>
                <CiCirclePlus />
            </button>
            <button className='p-2 text-2xl ' disabled={numberMatchups < 3} onClick={() => setNumberMatchups(numberMatchups - 1)}>
                <CiCircleMinus />
            </button>

        </div>
        </div>
    )

}
export default Start