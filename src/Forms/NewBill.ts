import Frequency from "Enums/Frequency";

export default interface NewBill {
    amount: number,
    due: Date,
    frequency: Frequency,
    name: string
}