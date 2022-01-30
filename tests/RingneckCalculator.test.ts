import { DateTime } from "luxon";
import RingneckCalculator from "../src/Services/RingneckCalculator";
import Frequency from "../src/Enums/Frequency"

describe("Ringneck calculator test", () => {
    it("Must find a correct leap year from the specified date", () => {
        const pinDate = DateTime.fromISO("2022-01-17");

        expect(RingneckCalculator.findNextRingneckLeapYear(pinDate)).toEqual(2028);
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
        const budgetPeriods = RingneckCalculator.findEventsUntilLeapYearTripleEvent(
            DateTime.fromISO("2022-01-23"),
            Frequency.Fortnightly,
            2028, // Is a ringneck leap year
            13
        )

        expect(budgetPeriods.length).toEqual(73);
    })

    it("Correctly determine number of events in every month if the payday is every 13th of the month", () => {
        const budgetPeriods = RingneckCalculator.findEventsUntilLeapYearTripleEvent(
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
            if (tripleEventBudgetPeriods.some(budgetPeriodStart => budgetPeriod.budgetPeriod.start.equals(budgetPeriodStart))) {
                expect(budgetPeriod.count).toEqual(3);
            }
            else {
                expect(budgetPeriod.count).toEqual(2);
            }
        }
    })

    it("Correctly determine number of events in every month if the payday is every first of the month", () => {
        const budgetPeriods = RingneckCalculator.findEventsUntilLeapYearTripleEvent(
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
            if (tripleEventBudgetPeriods.some(budgetPeriodStart => budgetPeriod.budgetPeriod.start.equals(budgetPeriodStart))) {
                expect(budgetPeriod.count).toEqual(3);
            }
            else {
                expect(budgetPeriod.count).toEqual(2);
            }
        }
    })
});