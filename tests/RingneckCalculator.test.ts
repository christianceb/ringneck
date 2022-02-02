import { DateTime } from "luxon";
import RingneckCalculator, { BudgetPeriod } from "../src/Services/RingneckCalculator";
import Frequency from "../src/Enums/Frequency"
import Bill from "../src/Entity/Bill";

describe("Ringneck calculator test", () => {
    it("Must find a correct leap year from the specified date", () => {
        const pinDate = DateTime.fromISO("2022-01-17");

        expect(RingneckCalculator.findLastRingneckLeapYear(pinDate)).toEqual(2028);
    });

    it("Correctly determine the number of events from a given date", () => {
        expect(
            RingneckCalculator.countFrequencyEventsInBudgetPeriod(
                DateTime.fromISO("2022-01-23"),
                {
                    start: DateTime.fromISO("2022-01-13"),
                    end: DateTime.fromISO("2022-02-13").minus({ second: 1 }),
                },
                Frequency.Fortnightly
            )
        ).toEqual(2);
        
        expect(
            RingneckCalculator.countFrequencyEventsInBudgetPeriod(
                DateTime.fromISO("2022-01-23"),
                {
                    start: DateTime.fromISO("2022-05-13"),
                    end: DateTime.fromISO("2022-06-13").minus({ second: 1 }),
                },
                Frequency.Fortnightly
            )
        ).toEqual(3);
    });

    it("If setting a day to a month, ensure that it's safe to do so (e.g.: assigning day 31 in a month where month does not have 31", () => {
        // Day must return with 28 as it is the last day of February 2022
        const exampleDate1 = DateTime.fromISO("2022-02-05");
        expect(RingneckCalculator.safelyAssignDayToMonth(exampleDate1, 31).day).toEqual(28);
        
        // Day must return with 29 as it is a valid day on January 2022
        const exampleDate2 = DateTime.fromISO("2022-01-31");
        expect(RingneckCalculator.safelyAssignDayToMonth(exampleDate2, 29).day).toEqual(29);
        
        // Day must return with 30 as it is the last day of April 2022
        const exampleDate3 = DateTime.fromISO("2022-04-20");
        expect(RingneckCalculator.safelyAssignDayToMonth(exampleDate3, 31).day).toEqual(30);
    });

    it("Correctly determine number of budget periods", () => {
        const budgetPeriods = RingneckCalculator.findBpsUntilLeapYearTripleEvent(
            DateTime.fromISO("2022-01-23"),
            Frequency.Fortnightly,
            2028, // Is a ringneck leap year
            13
        )

        expect(budgetPeriods.length).toEqual(73);
    })

    it("Correctly determine number of events in every month if the payday is every 13th of the month", () => {
        const budgetPeriods = RingneckCalculator.findBpsUntilLeapYearTripleEvent(
            DateTime.fromISO("2022-01-23"),
            Frequency.Fortnightly,
            2028, // Is a ringneck leap year
            13
        )

        const tripleEventBudgetPeriods = [
            DateTime.fromISO("2022-05-13"),
            DateTime.fromISO("2022-11-13"),
            DateTime.fromISO("2023-05-13"),
            DateTime.fromISO("2023-10-13"),
            DateTime.fromISO("2024-04-13"),
            DateTime.fromISO("2024-10-13"),
            DateTime.fromISO("2025-04-13"),
            DateTime.fromISO("2025-09-13"),
            DateTime.fromISO("2026-03-13"),
            DateTime.fromISO("2026-09-13"),
            DateTime.fromISO("2027-03-13"),
            DateTime.fromISO("2027-08-13"),
            DateTime.fromISO("2028-02-13"),
        ];

        for (const budgetPeriod of budgetPeriods) {
            if (tripleEventBudgetPeriods.some(budgetPeriodStart => budgetPeriod.period.start.equals(budgetPeriodStart))) {
                expect(budgetPeriod.count).toEqual(3);
            }
            else {
                expect(budgetPeriod.count).toEqual(2);
            }
        }
    })

    it("Correctly determine number of events in every month if the payday is every first of the month", () => {
        const budgetPeriods = RingneckCalculator.findBpsUntilLeapYearTripleEvent(
            DateTime.fromISO("2022-01-23"),
            Frequency.Fortnightly,
            2028, // Is a ringneck leap year
            1
        )

        const tripleEventBudgetPeriods = [
            DateTime.fromISO("2022-05-01"),
            DateTime.fromISO("2022-10-01"),
            DateTime.fromISO("2023-04-01"),
            DateTime.fromISO("2023-10-01"),
            DateTime.fromISO("2024-03-01"),
            DateTime.fromISO("2024-09-01"),
            DateTime.fromISO("2025-03-01"),
            DateTime.fromISO("2025-08-01"),
            DateTime.fromISO("2026-03-01"),
            DateTime.fromISO("2026-08-01"),
            DateTime.fromISO("2027-01-01"),
            DateTime.fromISO("2027-08-01"),
            DateTime.fromISO("2028-01-01"),
        ]

        for (const budgetPeriod of budgetPeriods) {
            if (tripleEventBudgetPeriods.some(budgetPeriodStart => budgetPeriod.period.start.equals(budgetPeriodStart))) {
                expect(budgetPeriod.count).toEqual(3);
            }
            else {
                expect(budgetPeriod.count).toEqual(2);
            }
        }
    })

    it("Return the correct indices from an array of events where budget period is a triple event", () => {
        const mockBP = { start: DateTime.now(), end: DateTime.now() };

        const budgetPeriods: BudgetPeriod[] = [
            { period: mockBP, isTripleEvent: true, count: 3 },
            { period: mockBP, isTripleEvent: false, count: 2 },
            { period: mockBP, isTripleEvent: false, count: 2 },
            { period: mockBP, isTripleEvent: true, count: 3 },
            { period: mockBP, isTripleEvent: true, count: 3 },
            { period: mockBP, isTripleEvent: false, count: 2 },
            { period: mockBP, isTripleEvent: false, count: 2 },
        ]

        const identifiedTriplesIndices = RingneckCalculator.findTripleEventIndices(budgetPeriods);

        expect(identifiedTriplesIndices).toEqual([0, 3, 4]);
    })

    it("From an index implied to be from the budget period array, find the next triple event index", () => {
        const budgetPeriodIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const tripleEventIndices = [4, 7, 10];

        expect(RingneckCalculator.findNextTriple(0, tripleEventIndices, budgetPeriodIndices.length)).toBe(4);
        expect(RingneckCalculator.findNextTriple(5, tripleEventIndices, budgetPeriodIndices.length)).toBe(7);
        expect(RingneckCalculator.findNextTriple(8, tripleEventIndices, budgetPeriodIndices.length)).toBe(10);
        expect(RingneckCalculator.findNextTriple(10, tripleEventIndices, budgetPeriodIndices.length)).toBe(10);
        expect(RingneckCalculator.findNextTriple(11, tripleEventIndices, budgetPeriodIndices.length)).toBe(-1);
    });

    it("Ensure that the amount to save in certain bucket groups are correct (with payday being day one of the month)", () => {
        const bill: Bill = new Bill(24000, new Date("2022-01-23"), Frequency.Fortnightly)

        const budgetPeriods: BudgetPeriod[] = RingneckCalculator.calculate(bill, 1);

        expect(budgetPeriods[0].count).toEqual(2)
        expect(budgetPeriods[0].amountToSave).toEqual(54000)

        expect(budgetPeriods[1].count).toEqual(2)
        expect(budgetPeriods[1].amountToSave).toEqual(54000)

        expect(budgetPeriods[2].count).toEqual(2)
        expect(budgetPeriods[2].amountToSave).toEqual(54000)

        expect(budgetPeriods[3].count).toEqual(3)
        expect(budgetPeriods[3].amountToSave).toEqual(54000)

        expect(budgetPeriods[4].count).toEqual(2)
        expect(budgetPeriods[4].amountToSave).toEqual(52800)

        expect(budgetPeriods[5].count).toEqual(2)
        expect(budgetPeriods[5].amountToSave).toEqual(52800)

        expect(budgetPeriods[6].count).toEqual(2)
        expect(budgetPeriods[6].amountToSave).toEqual(52800)

        expect(budgetPeriods[7].count).toEqual(2)
        expect(budgetPeriods[7].amountToSave).toEqual(52800)

        expect(budgetPeriods[8].count).toEqual(3)
        expect(budgetPeriods[8].amountToSave).toEqual(52800)

        expect(budgetPeriods[9].count).toEqual(2)
        expect(budgetPeriods[9].amountToSave).toEqual(52000)

        expect(budgetPeriods[10].count).toEqual(2)
        expect(budgetPeriods[10].amountToSave).toEqual(52000)

        expect(budgetPeriods[11].count).toEqual(2)
        expect(budgetPeriods[11].amountToSave).toEqual(52000)

        expect(budgetPeriods[12].count).toEqual(2)
        expect(budgetPeriods[12].amountToSave).toEqual(52000)

        expect(budgetPeriods[13].count).toEqual(2)
        expect(budgetPeriods[13].amountToSave).toEqual(52000)

        expect(budgetPeriods[14].count).toEqual(3)
        expect(budgetPeriods[14].amountToSave).toEqual(52000)

        expect(budgetPeriods[15].count).toEqual(2)
        expect(budgetPeriods[15].amountToSave).toEqual(52000)

        expect(budgetPeriods[16].count).toEqual(2)
        expect(budgetPeriods[16].amountToSave).toEqual(52000)

        expect(budgetPeriods[17].count).toEqual(2)
        expect(budgetPeriods[17].amountToSave).toEqual(52000)

        expect(budgetPeriods[18].count).toEqual(2)
        expect(budgetPeriods[18].amountToSave).toEqual(52000)

        expect(budgetPeriods[19].count).toEqual(2)
        expect(budgetPeriods[19].amountToSave).toEqual(52000)

        expect(budgetPeriods[20].count).toEqual(3)
        expect(budgetPeriods[20].amountToSave).toEqual(52000)

        expect(budgetPeriods[21].count).toEqual(2)
        expect(budgetPeriods[21].amountToSave).toEqual(52800)

        expect(budgetPeriods[22].count).toEqual(2)
        expect(budgetPeriods[22].amountToSave).toEqual(52800)

        expect(budgetPeriods[23].count).toEqual(2)
        expect(budgetPeriods[23].amountToSave).toEqual(52800)

        expect(budgetPeriods[24].count).toEqual(2)
        expect(budgetPeriods[24].amountToSave).toEqual(52800)

        expect(budgetPeriods[25].count).toEqual(3)
        expect(budgetPeriods[25].amountToSave).toEqual(52800)

        expect(budgetPeriods[26].count).toEqual(2)
        expect(budgetPeriods[26].amountToSave).toEqual(52000)

        expect(budgetPeriods[27].count).toEqual(2)
        expect(budgetPeriods[27].amountToSave).toEqual(52000)

        expect(budgetPeriods[28].count).toEqual(2)
        expect(budgetPeriods[28].amountToSave).toEqual(52000)

        expect(budgetPeriods[29].count).toEqual(2)
        expect(budgetPeriods[29].amountToSave).toEqual(52000)

        expect(budgetPeriods[30].count).toEqual(2)
        expect(budgetPeriods[30].amountToSave).toEqual(52000)

        expect(budgetPeriods[31].count).toEqual(3)
        expect(budgetPeriods[31].amountToSave).toEqual(52000)

        expect(budgetPeriods[32].count).toEqual(2)
        expect(budgetPeriods[32].amountToSave).toEqual(52000)

        expect(budgetPeriods[33].count).toEqual(2)
        expect(budgetPeriods[33].amountToSave).toEqual(52000)

        expect(budgetPeriods[34].count).toEqual(2)
        expect(budgetPeriods[34].amountToSave).toEqual(52000)

        expect(budgetPeriods[35].count).toEqual(2)
        expect(budgetPeriods[35].amountToSave).toEqual(52000)

        expect(budgetPeriods[36].count).toEqual(2)
        expect(budgetPeriods[36].amountToSave).toEqual(52000)

        expect(budgetPeriods[37].count).toEqual(3)
        expect(budgetPeriods[37].amountToSave).toEqual(52000)

        expect(budgetPeriods[38].count).toEqual(2)
        expect(budgetPeriods[38].amountToSave).toEqual(52800)

        expect(budgetPeriods[39].count).toEqual(2)
        expect(budgetPeriods[39].amountToSave).toEqual(52800)

        expect(budgetPeriods[40].count).toEqual(2)
        expect(budgetPeriods[40].amountToSave).toEqual(52800)

        expect(budgetPeriods[41].count).toEqual(2)
        expect(budgetPeriods[41].amountToSave).toEqual(52800)

        expect(budgetPeriods[42].count).toEqual(3)
        expect(budgetPeriods[42].amountToSave).toEqual(52800)

        expect(budgetPeriods[43].count).toEqual(2)
        expect(budgetPeriods[43].amountToSave).toEqual(51429)

        expect(budgetPeriods[44].count).toEqual(2)
        expect(budgetPeriods[44].amountToSave).toEqual(51429)

        expect(budgetPeriods[45].count).toEqual(2)
        expect(budgetPeriods[45].amountToSave).toEqual(51429)

        expect(budgetPeriods[46].count).toEqual(2)
        expect(budgetPeriods[46].amountToSave).toEqual(51429)

        expect(budgetPeriods[47].count).toEqual(2)
        expect(budgetPeriods[47].amountToSave).toEqual(51429)

        expect(budgetPeriods[48].count).toEqual(2)
        expect(budgetPeriods[48].amountToSave).toEqual(51429)

        expect(budgetPeriods[49].count).toEqual(3)
        expect(budgetPeriods[49].amountToSave).toEqual(51429)

        expect(budgetPeriods[50].count).toEqual(2)
        expect(budgetPeriods[50].amountToSave).toEqual(52800)

        expect(budgetPeriods[51].count).toEqual(2)
        expect(budgetPeriods[51].amountToSave).toEqual(52800)

        expect(budgetPeriods[52].count).toEqual(2)
        expect(budgetPeriods[52].amountToSave).toEqual(52800)

        expect(budgetPeriods[53].count).toEqual(2)
        expect(budgetPeriods[53].amountToSave).toEqual(52800)

        expect(budgetPeriods[54].count).toEqual(3)
        expect(budgetPeriods[54].amountToSave).toEqual(52800)

        expect(budgetPeriods[55].count).toEqual(2)
        expect(budgetPeriods[55].amountToSave).toEqual(52800)

        expect(budgetPeriods[56].count).toEqual(2)
        expect(budgetPeriods[56].amountToSave).toEqual(52800)

        expect(budgetPeriods[57].count).toEqual(2)
        expect(budgetPeriods[57].amountToSave).toEqual(52800)

        expect(budgetPeriods[58].count).toEqual(2)
        expect(budgetPeriods[58].amountToSave).toEqual(52800)

        expect(budgetPeriods[59].count).toEqual(3)
        expect(budgetPeriods[59].amountToSave).toEqual(52800)

        expect(budgetPeriods[60].count).toEqual(2)
        expect(budgetPeriods[60].amountToSave).toEqual(51429)

        expect(budgetPeriods[61].count).toEqual(2)
        expect(budgetPeriods[61].amountToSave).toEqual(51429)

        expect(budgetPeriods[62].count).toEqual(2)
        expect(budgetPeriods[62].amountToSave).toEqual(51429)

        expect(budgetPeriods[63].count).toEqual(2)
        expect(budgetPeriods[63].amountToSave).toEqual(51429)

        expect(budgetPeriods[64].count).toEqual(2)
        expect(budgetPeriods[64].amountToSave).toEqual(51429)

        expect(budgetPeriods[65].count).toEqual(2)
        expect(budgetPeriods[65].amountToSave).toEqual(51429)

        expect(budgetPeriods[66].count).toEqual(3)
        expect(budgetPeriods[66].amountToSave).toEqual(51429)

        expect(budgetPeriods[67].count).toEqual(2)
        expect(budgetPeriods[67].amountToSave).toEqual(52800)

        expect(budgetPeriods[68].count).toEqual(2)
        expect(budgetPeriods[68].amountToSave).toEqual(52800)

        expect(budgetPeriods[69].count).toEqual(2)
        expect(budgetPeriods[69].amountToSave).toEqual(52800)

        expect(budgetPeriods[70].count).toEqual(2)
        expect(budgetPeriods[70].amountToSave).toEqual(52800)

        expect(budgetPeriods[71].count).toEqual(3)
        expect(budgetPeriods[71].amountToSave).toEqual(52800)
    });

    it("Ensure that the amount to save in certain bucket groups are correct (with payday being day 13 of the month)", () => {
        const bill: Bill = new Bill(24000, new Date("2022-01-23"), Frequency.Fortnightly)

        const budgetPeriods: BudgetPeriod[] = RingneckCalculator.calculate(bill, 13);

        expect(budgetPeriods[0].count).toEqual(2)
        expect(budgetPeriods[0].amountToSave).toEqual(54000)

        expect(budgetPeriods[1].count).toEqual(2)
        expect(budgetPeriods[1].amountToSave).toEqual(54000)

        expect(budgetPeriods[2].count).toEqual(2)
        expect(budgetPeriods[2].amountToSave).toEqual(54000)

        expect(budgetPeriods[3].count).toEqual(3)
        expect(budgetPeriods[3].amountToSave).toEqual(54000)

        expect(budgetPeriods[4].count).toEqual(2)
        expect(budgetPeriods[4].amountToSave).toEqual(52000)

        expect(budgetPeriods[5].count).toEqual(2)
        expect(budgetPeriods[5].amountToSave).toEqual(52000)

        expect(budgetPeriods[6].count).toEqual(2)
        expect(budgetPeriods[6].amountToSave).toEqual(52000)

        expect(budgetPeriods[7].count).toEqual(2)
        expect(budgetPeriods[7].amountToSave).toEqual(52000)

        expect(budgetPeriods[8].count).toEqual(2)
        expect(budgetPeriods[8].amountToSave).toEqual(52000)

        expect(budgetPeriods[9].count).toEqual(3)
        expect(budgetPeriods[9].amountToSave).toEqual(52000)

        // Due to the breadth of this test case as evidently seen on the test where the payday is the first day, the test will end here. However, feel free to continue the test to the end of it.
    });
});