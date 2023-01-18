export interface CalculationResult {
    save: SaveValues
}

interface SaveValues {
    /**
     * This is the amount to save up until a certain point in time.
     * The next amount to save after that is in this.after
     */
    amount: number;
    
    /**
     * See: this.amount
     */
    after: number;
    
    /**
     * This amount if saved will give you enough money to go around should
     * a triple happen. You will be short, but the excess will not hurt.
     */
    average: number;
    
    /**
     * This amount if saved will give you more than enough money to go around.
     * You will have an excess, but you will never have to worry again about a triple.
     */
    max: number;
}
