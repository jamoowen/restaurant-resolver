'use client'

import { useState, ChangeEvent, useRef } from 'react';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useRestaurantStore, } from '@/state/state-component';
import { Checkbox } from "@/components/ui/checkbox"


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





const Start = () => {

    // stage state -> Entering inputs = 0; knockouts= 1;
    const stage = useRestaurantStore((state) => state.stage);
    const { setStage } = useRestaurantStore();

    const rounds = useRestaurantStore((state) => state.rounds);
    const { setRounds } = useRestaurantStore()

    const { setRestaurantArray1 } = useRestaurantStore();

    const { setEmailList } = useRestaurantStore();

    // This is the amount of input fields (the amount of restaurants to enter the tournament)
    const [numberMatchups, setNumberMatchups] = useState<number>(4);
    const [numberEmails, setNumberEmails] = useState<number>(2);

    const [enableEmails, setEnableEmails] = useState(false)


    const emailFormRef = useRef<HTMLFormElement | null>(null);



    // this is just initialized to get a list which i can map over
    let matchupList = Array.from(Array(numberMatchups).keys());
    let emailList = Array.from(Array(numberEmails).keys());



    const MatchupItem = ({ index }: { index: string }) => {
        return (
            <>
                <label htmlFor={index}>Restaurant {Number(index) + 1}</label>
                <input type='text' name={`restaurant${index}`} id={`restaurant${index}`} className='p-2 m-2 text-black bg-white outline outline-black ' />
            </>
        )
    }
    const EmailItem = ({ index }: { index: string }) => {
        return (
            <>
                <label htmlFor={index}>Email Address {Number(index) + 1}</label>
                <input type='email' name={`email${index}`} id={`email${index}`} className='p-2 m-2 text-black bg-white outline outline-black ' />
            </>
        )
    }



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

        if (enableEmails && emailFormRef.current) {
            emailFormRef.current?.requestSubmit();


        }
        
    }

    const submitEmails = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let emails: EmailArray = [];

        formData.forEach((value) => {
            if (value.toString().length > 0) {
                emails.push(
                    value.toString(),
                );
            }

        });

        setEmailList(emails)
    }


    return (
        <div className='flex flex-col w-full p-2 overflow-scroll text-xs text-black bg-white sm:p-5'>
            <p className='mb-5'>Can&apos;t decide on a restaurant?</p>
            <p className='mb-5'>All of your friends want to go somewhere different?</p>
            <p>Enter the names of the restaurants you are considering below, and let fate decide where you will go.  </p>
            <span className='text-4xl'>🧙‍♂️</span>
            <div className="items-center justify-center w-full mt-5 overflow-scroll text-black bg-white ">

                <form onSubmit={handleSubmit} className=''>
                    <div className="grid-cols-1 gap-5 text-black sm:flex ">
                        <div className='col-span-1 '>
                            {matchupList.map((num) => (
                                <div className='gap-2 p-2 ' key={num}>
                                    <MatchupItem index={num.toString()} />
                                </div>
                            ))}


                        </div>

                        <div className='col-span-1 mx-auto my-auto text-white justify-self-start'>
                            <div className='flex flex-col gap-5 px-4 text-black sm:px-0'>
                                <button type='submit' className='w-24 p-2 bg-blue-500'>
                                    Calculate Winner
                                </button>

                            </div>
                        </div>
                    </div>
                </form>

                <button className='p-2 text-2xl ' disabled={numberMatchups > 7} onClick={() => setNumberMatchups(numberMatchups + 1)}>
                    <CiCirclePlus />
                </button>
                <button className='p-2 text-2xl ' disabled={numberMatchups < 3} onClick={() => setNumberMatchups(numberMatchups - 1)}>
                    <CiCircleMinus />
                </button>
                <p className='text-xs'>You can add up to 8 restaurants</p>
                <div className='flex flex-row gap-2 mt-5 '>
                    Send Email Results
                    <Checkbox
                        onCheckedChange={(checked: boolean) => setEnableEmails(checked)}

                    />



                </div>

                <div className='col-span-1 '>

                    {enableEmails ?
                        <div>
                            <form onSubmit={submitEmails} ref={emailFormRef}>

                                {emailList.map((num) => (
                                    <div className='gap-2 p-2' key={num}>
                                        <EmailItem index={num.toString()} />
                                    </div>
                                ))}
                            </form>
                            <button className='p-2 text-2xl ' disabled={numberEmails > 7} onClick={() => setNumberEmails(numberEmails + 1)}>
                                <CiCirclePlus />
                            </button>
                            <button className='p-2 text-2xl ' disabled={numberEmails === 1} onClick={() => setNumberEmails(numberEmails - 1)}>
                                <CiCircleMinus />
                            </button>
                        </div>
                        : ''}

                </div>



            </div>
        </div>
    )

}
export default Start