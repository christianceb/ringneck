import Frequency from "./Frequency";

export type FrequencyInterface = {
    [key in Frequency]: string;
};

const FrequencyNames: FrequencyInterface = {
    [Frequency.Weekly]: "Weekly",
    [Frequency.Fortnightly]: "Fortnightly",
    [Frequency.Monthly]: "Monthly",
};

export default FrequencyNames;