import Bill from "Entity/Bill";
import Frequency from "Enums/Frequency";
import { DateTime, Duration } from "luxon";
import { duration } from "moment";
import { start } from "repl";

class RingneckCalculator {
    public static readonly minimumGapYears: number = 4;

    public static calculate(bill: Bill): Bill
    {
        const originalDate = DateTime.fromISO("2022-01-17");
        const pinDate = DateTime.fromISO("2022-01-17");
        const tripleEventMonths = [];
        const payDay = 1; // Every YYYY-MM-{1} of the month

        return bill;
    }

    public static findEventsUntilLeapYearTripleEvent(
        date: DateTime,
        frequency: Frequency,
        endOnFirstTripleEventOfYear: number,
        payDay: number
    ): Events[]
    {
        const events: Events[] = [];

        let eventsCount = 0;

        while (true)
        {
            eventsCount = this.countFrequencyEventsInMonth(date, frequency)
 
            if (beforePayday) {

            }

            // if (eventsCount <) {

            // }

            events.push({
                year: date.year,
                month: date.month,
                count: eventsCount,
                isTripleEvent: eventsCount > 2
            })

            // Check if we can end here
            if (endOnFirstTripleEventOfYear == date.year) {
                break;
            }

            // Otherwise, prep for next iteration
            date = date.plus({ month: 1 });
        }

        return events;
    }

    public static findEventsInMonthSpread(date: DateTime, frequency: Frequency) : number
    {
        let eventsCount: number = 1,
            spreadOutsideMonth: boolean = false,
            dateBackwards: DateTime = this.cloneDateTime(date),
            dateForwards:DateTime = this.cloneDateTime(date);

        const duration: Duration = this.convertFrequencyToLuxonDuration(frequency);

        while (!spreadOutsideMonth) {
            dateBackwards = dateBackwards.minus(duration);
            dateForwards = dateForwards.plus(duration);

            if (dateBackwards.hasSame(date, "month")) {
                eventsCount++;
            }

            if (dateForwards.hasSame(date, "month")) {
                eventsCount++;
            }

            if (!dateBackwards.hasSame(date, "month") && !dateForwards.hasSame(date, "month")) {
                spreadOutsideMonth = true;
            }
        }

        return eventsCount;
    }

    private static cloneDateTime(date: DateTime) : DateTime
    {
        return DateTime.fromISO(date.toISO());
    }

    public static findNextRingneckLeapYear(startDate?: DateTime) : number
    {
        let totalYears: number = 0;

        if (!startDate) {
            startDate = DateTime.now();
        }

        while (true) {
            startDate = startDate.plus({ years: 1 });
            totalYears++;

            if (startDate.isInLeapYear && totalYears >= this.minimumGapYears) {
                break;
            }
        }
        
        return startDate.year;
    }

    public static countFrequencyEventsInMonth(date: DateTime, frequency: Frequency) : number
    {
        const originalMonth = date.month;
        let events: number = 0;

        while (originalMonth == date.month) {
            date = date.plus(this.convertFrequencyToLuxonDuration(frequency));

            events++;
        }

        return events;
    }

    private static convertFrequencyToLuxonDuration(frequency: Frequency) : Duration
    {
        let duration: Duration = Duration.fromObject({ days: frequency });

        return duration;
    }
}

export default RingneckCalculator;

interface Events {
    year: number
    month: number
    count: number
    isTripleEvent: boolean
}