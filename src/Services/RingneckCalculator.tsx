import Bill from "Entity/Bill";
import Frequency from "Enums/Frequency";
import { DateTime, Duration } from "luxon";
import { duration } from "moment";
import { start } from "repl";

class RingneckCalculator {
    public static readonly minimumGapYears: number = 4;

    public static calculate(bill: Bill, payDay: number): Bill
    {
        const originalDate = DateTime.fromISO("2022-01-17");
        const pinDate = DateTime.fromISO("2022-01-17");
        const tripleEventMonths = [];
        
        payDay = 1; // Every YYYY-MM-{1} of the month

        return bill;
    }

    public static safelyAssignDayToMonth(date: DateTime, day: number): DateTime
    {
        return date.set({
            day: day > date.daysInMonth ? date.daysInMonth : day
        });
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

        // If the due date is before the pay day, then find a due date that is later than the pay date
        if (date.day < payDay) {
            while (date.day < payDay) {
                date = date.plus(this.convertFrequencyToLuxonDuration(frequency));
            }
        }

        // bp - b[udget] p[eriod]
        let bpStart: DateTime, bpEnd: DateTime;

        bpStart = this.cloneDateTime(date);

        // Push to next month
        // And set the bpStart to the payday
        bpStart = bpStart.plus({month: 1})
                                .set({
                                    day: this.safelyAssignDayToMonth(bpStart, payDay).day
                                });

        // Lastly, set the bpEnd to the next month prior to the new budget period start
        bpEnd = this.cloneDateTime(bpStart)
                            .plus({month: 1})
                            .minus({second: 1});

        while (!(date >= bpStart && date <= bpEnd))
        {
            date = date.plus(this.convertFrequencyToLuxonDuration(frequency));
        }
        
        // ^ We want the end of the pay period to be not exactly the start of the next pay period. We just want it to be a second before it does

        while (true)
        {
            eventsCount = this.countFrequencyEventsInBudgetPeriod(date, {start: bpStart, end: bpEnd}, frequency)
 
            events.push({
                budgetPeriod: {
                    start: bpStart,
                    end: bpEnd
                },
                count: eventsCount,
                isTripleEvent: eventsCount > 2,
            })

            // Check if we can end here
            if (endOnFirstTripleEventOfYear == bpEnd.year && eventsCount > 2) {
                break;
            }

            // Otherwise, prep for next iteration
            bpStart = bpStart.plus({month: 1})
                .set({
                    day: this.safelyAssignDayToMonth(bpStart, payDay).day
                });

            // Lastly, set the bpEnd to the next month prior to the new budget period start
            bpEnd = this.cloneDateTime(bpStart)
                .plus({month: 1})
                .minus({second: 1});
        }

        return events;
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

    public static countFrequencyEventsInBudgetPeriod(
        dueDate: DateTime,
        bp: BudgetPeriod,
        frequency: Frequency
    ) : number
    {
        let events: number = 0;

        while (dueDate <= bp.end) {
            if (dueDate >= bp.start && dueDate <= bp.end) {
                events++;                
            }

            dueDate = dueDate.plus(this.convertFrequencyToLuxonDuration(frequency));
        }

        return events;
    }

    private static convertFrequencyToLuxonDuration(frequency: Frequency) : Duration
    {
        return Duration.fromObject({ days: frequency });
    }
}

export default RingneckCalculator;

interface Events {
    budgetPeriod: BudgetPeriod
    count: number
    isTripleEvent: boolean
}

interface BudgetPeriod {
    start: DateTime
    end: DateTime
}