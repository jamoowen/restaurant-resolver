

export { }

declare global {
 
    type RestaurantArray = string[];

    type RestaurantArrayState1 = {
        restaurantArray: RestaurantArray;
        setRestaurantArray1: (restaurantArray: RestaurantArray) => void;
    };

    type RestaurantArrayState2 = {
        restaurantArray2: RestaurantArray;
        setRestaurantArray2: (restaurantArray2: RestaurantArray) => void;
    };

    type RestaurantArrayState3 = {
        restaurantArray3: RestaurantArray;
        setRestaurantArray3: (restaurantArray3: RestaurantArray) => void;
    };

    type TournamentStageState = {
        stage: number;
        setStage: (stage: number) => void;
    };

    type TournamentRoundState = {
        currentRound: number;
        setCurrentRound: (currentRound: number) => void;
    };

    type TournamentRoundAmountState = {
        rounds: number; 
        setRounds: (rounds: number) => void;
    };
}
