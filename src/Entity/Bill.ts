import Frequency from "../Enums/Frequency";
import CalculationResult from "./CalculationResult";

export default class Bill
{
    static lastId: number = 0;

    public id: number;
    public calculationResult?: CalculationResult;

    constructor(
        public amount: number,
        public due: Date,
        public frequency: Frequency,
        public name?: string,
        id?: number
    )
    {
        // Find us an Id
        if (id == null) {
            // Use last Id
            this.id = Bill.lastId + 1;
        }
        else {
            // Use provisioned Id
            this.id = id;
        }

        // Increment last Id
        Bill.lastId = this.id;
    }
}