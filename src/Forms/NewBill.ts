import Frequency from "Enums/Frequency";

export default interface NewBill {
    amount?: number,
    due?: Date | null,
    frequency?: Frequency | null,
    name?: string
}