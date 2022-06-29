import Frequency from "Enums/Frequency";

export default class Payday
{
    public readonly frequency: Frequency = Frequency.Monthly;

    public constructor(
        public payDay: number
    )
    {

    }
} 