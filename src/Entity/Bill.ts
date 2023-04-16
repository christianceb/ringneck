import Frequency from "../Enums/Frequency";
import { CalculationResult } from "./CalculationResult";

export default class Bill
{
    public calculationResult?: CalculationResult;

    constructor(
        public amount?: number,
        public due?: Date|undefined|null,
        public frequency?: Frequency,
        public name?: string,
        public id?: number
    ) { }
}