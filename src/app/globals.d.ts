

export { }

declare global {
 
    type RestaurantArray = string[];
    type EmailArray = string[];

    type RestaurantStoreType = {
        restaurantArray: RestaurantArray;
        setRestaurantArray1: (restaurantArray: RestaurantArray) => void;
        
        restaurantArray2: RestaurantArray;
        setRestaurantArray2: (restaurantArray2: RestaurantArray) => void;
        
        restaurantArray3: RestaurantArray;
        setRestaurantArray3: (restaurantArray3: RestaurantArray) => void;
        
        stage: number;
        setStage: (stage: number) => void;
        
        currentRound: number;
        setCurrentRound: (currentRound: number) => void;
        
        rounds: number; 
        setRounds: (rounds: number) => void;

        emailList: EmailArray;
        setEmailList: (emailList: EmailArray) => void;


    }

    
}
