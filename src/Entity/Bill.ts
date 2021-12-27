import Frequency from "../Enums/Frequency";
import CalculationResult from "./CalculationResult";

export default class Bill
{
    static lastId: number = 0;

    public id: number;
    public amount: number;
    due: Date;
    frequency: Frequency;

    public calculationResult?: CalculationResult;
    
    constructor(
        amount: number,
        due: Date,
        frequency: Frequency,
        id?: number
    )
    {
        this.amount = amount
        this.due = due;
        this.frequency = frequency;

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