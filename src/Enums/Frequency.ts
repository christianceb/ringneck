enum Frequency {
    Weekly = 7,
    Fortnightly = 14,
    Monthly = -10, // Monthly is set to an arbitary negative number (preferably divisible by ten) as these are informal in sizes across years
}

export default Frequency;

type FrequencyInterface = {
    [key in Frequency]: string;
};

const Names: FrequencyInterface = {
    [Frequency.Weekly]: "Weekly",
    [Frequency.Fortnightly]: "Fortnightly",
    [Frequency.Monthly]: "Monthly",
};

export { Names };