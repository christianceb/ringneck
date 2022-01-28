import { DateTime } from "luxon";
import RingneckCalculator from "../src/Services/RingneckCalculator";
import Frequency from "../src/Enums/Frequency"

describe("Ringneck calculator test", () => {
    it("Must find a correct leap year from the specified date", () => {
        const pinDate = DateTime.fromISO("2022-01-17");

        expect(RingneckCalculator.findNextRingneckLeapYear(pinDate)).toEqual(2028);
    });

    it("Correctly determine the number of events from a given date", () => {
        expect(RingneckCalculator.countFrequencyEventsInMonth(DateTime.fromISO("2022-01-23"), Frequency.Fortnightly)).toEqual(1);
        
        expect(RingneckCalculator.countFrequencyEventsInMonth(DateTime.fromISO("2022-02-06"), Frequency.Fortnightly)).toEqual(2);
        
        expect(RingneckCalculator.countFrequencyEventsInMonth(DateTime.fromISO("2022-05-01"), Frequency.Fortnightly)).toEqual(3);
    });

    it("Correctly determine number of months", () => {
        const eventsByMonths = RingneckCalculator.findEventsUntilLeapYearTripleEvent(
            DateTime.fromISO("2022-01-23"),
            Frequency.Fortnightly,
            2028 // Is a ringneck leap year
        )

        expect(eventsByMonths.length).toEqual(73);
    })

    it("Find the events in a month but it counts forwards and back in time", () => {
        const eventsinMonthSpread = RingneckCalculator.findEventsInMonthSpread(DateTime.fromISO("2022-01-23"), Frequency.Fortnightly);

        expect(eventsinMonthSpread).toEqual(2);
    })

    it("Correctly determine number of events in every month", () => {
        const monthsWithEvents = RingneckCalculator.findEventsUntilLeapYearTripleEvent(
            DateTime.fromISO("2022-01-23"),
            Frequency.Fortnightly,
            2028 // Is a ringneck leap year
        )

        const guaranteedTripleEventMonths = [
            { month: 5, year: 2022 },
            { month: 10, year: 2022 },
            { month: 4, year: 2023 },
            { month: 10, year: 2023 },
            { month: 3, year: 2024 },
            { month: 9, year: 2024 },
            { month: 3, year: 2025 },
            { month: 8, year: 2025 },
            { month: 3, year: 2026 },
            { month: 8, year: 2026 },
            { month: 1, year: 2027 },
            { month: 8, year: 2027 },
            { month: 1, year: 2028 }
        ];

        for (const monthwithEvents of monthsWithEvents) {
            if (monthwithEvents.month == 1 && monthwithEvents.year == 2022) {
                expect(monthwithEvents.count).toEqual(1);
            }
            else if (guaranteedTripleEventMonths.some((tripleEventMonth) => tripleEventMonth.month == monthwithEvents.month && tripleEventMonth.year == monthwithEvents.year)) {
                expect(monthwithEvents.count).toEqual(3);
            }
            else {
                expect(monthwithEvents.count).toEqual(2);
            }
        }
    })
});