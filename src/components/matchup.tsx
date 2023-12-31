'use client'
import { useState, useEffect } from 'react';
import {
    useRestaurantStore,
} from '@/state/state-component';

const axios = require('axios').default;
import { AxiosError } from 'axios';
import { toast } from "@/components/ui/use-toast"

import { LuCrown } from "react-icons/lu";


type MatchupProps = {
    teamA: number;
    teamB: number | null;
    restaurantArray: RestaurantArray;
    winners: number[];
}


/**
 * 
 * @param {number} teamA the fisrt of the pair
 * @param {number} teamB  the second of the pair of restaurnats in this component
 * @param {RestaurantArray} restaurantArray the array of restaurants team a and b belong to
 * @param {[]} winners the winning restaurants of the restaurant array -> either team a or team b is included, not both
 */
const Matchup = ({ teamA, teamB, restaurantArray, winners }: MatchupProps) => {

    const currentRound = useRestaurantStore((state) => state.currentRound)

    const rounds = useRestaurantStore((state) => state.rounds)

    const emailList = useRestaurantStore((state)=> state.emailList);


    // I want the winner to only go green and show who won, after a timeout
    const [declareWinner, setDeclareWinner] = useState(false)

    const [finalWinner, setFinalWinner] = useState(false);

    


    const [winner, setWinner] = useState(0);

    const sendEmails = async () => {
        

        try {
            const { data } = await axios.post('/api/contact', {
                
                email: emailList,
                message: restaurantArray[winner]
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            toast({
                title: "Email sent!",
                description: "The results have been sent to all recipients",
            })
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error(axiosError.response?.data);
            toast({
                title: "ERROR!!",
                description: "Unable to send email; please try again later",

            })
        } finally {
          
        }


    }


    // after timeout, the winner is declared and shown on page
    let time = 2000;
    if (teamA === 2) { time = 3000 }
    if (teamA === 4) { time = 4000 }
    if (teamA === 6) { time = 5000 }

    useEffect(() => {
        setTimeout(() => {
            setDeclareWinner(true)            

            if (rounds == currentRound) {
                setFinalWinner(true)
                if (emailList[0]) {
                    sendEmails();
                }

            }

            if (winners.includes(teamA)) {
                setWinner(teamA);                
            }
            if (teamB && winners.includes(teamB)) {                
                setWinner(teamB);
            }

        }, time);


    }, [])





    return (
        <div className="flex grid-cols-3 gap-2 p-2 overflow-scroll bg-outline-white rounded-xl">
            <div className="flex flex-col col-span-1" >
                <div className={`w-32 overflow-scroll h-8 sm:w-48 sm:h-12 sm:text-md text-xs items-center mx-auto flex justify-center text-black ${declareWinner && winner === teamA ? 'bg-green-300' : 'bg-white'} rounded-md border border-black items-center p-1 flex`} >
                    {restaurantArray[teamA]}
                </div>
                <div className='flex mx-auto text-black'>
                    vs
                </div>

                <div className={`w-32 overflow-scroll h-8 sm:w-48 sm:h-12 sm:text-md text-xs items-center mx-auto flex justify-center text-black ${declareWinner && winner === teamB ? 'bg-green-300' : 'bg-white'} rounded-md border border-black items-center p-1 flex`} >
                    {teamB ? restaurantArray[teamB] : null}
                </div>
            </div>
            <div className="col-span-1">

            </div>

            <div className="flex items-center justify-center col-span-1">
                <div>
                    <div className='flex items-center justify-center mx-auto text-xl text-yellow-500'>{declareWinner && finalWinner ? <LuCrown /> : null}</div>
                    <div className={`w-32 overflow-scroll h-8 sm:w-48 sm:h-12 sm:text-md text-xs items-center mx-auto flex justify-center my-auto font-bold text-black bg-white rounded-md border-2 ${declareWinner && finalWinner ? 'border-yellow-400 mb-4' : 'border-green-500'} items-center p-1 flex`} >

                        {declareWinner && winner != null ? restaurantArray[winner] : ''}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Matchup