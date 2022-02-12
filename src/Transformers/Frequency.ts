/**
 * I have wasted 2 hours figuring our why if I import with Enums/Frequency, jest becomes a frustrating mess.
 * 
 * Unless this (https://github.com/kulshekhar/ts-jest/issues/281) is fully fixed without having to fiddle with
 * your configs, don't fuck with this import.
 */
import FrequencyEnum, { Names } from "../Enums/Frequency"

export default class Frequency
{
    public static getNameOf(frequency: FrequencyEnum) : string
    {
        return Names[frequency];
    }

    public static getKvps() : Array<{ key: string, value: number }>
    {
        return Object.entries(Names).map(frequency => { return { key: frequency[1], value: parseInt(frequency[0]) } } );
    }
}