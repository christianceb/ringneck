import Bill from "Entity/Bill";
import Frequency from "Enums/Frequency";
import { DateTime, Duration } from "luxon";

class RingneckCalculator {
    public static readonly minimumGapYears: number = 4;

    public static calculate(bill: Bill, payDay: number): Bill
    {
        const dueDateInDateTime = bill.due ? DateTime.fromJSDate(bill.due) : null;
        let budgetPeriods: Event[] = [];
        
        if (dueDateInDateTime && bill.frequency) {
            budgetPeriods = this.findEventsUntilLeapYearTripleEvent(
                dueDateInDateTime,
                bill.frequency,
                this.findLastRingneckLeapYear(dueDateInDateTime),
                payDay
            );
        }

        if (budgetPeriods.length) {
            // We really need a better way for allowing nullable values wihthout the compiler being too overzealous, requiring us to coalesce (??) variable references sometimes.
            let saveAmount: number | null = null,
                nextTriple: number | null = null,
                buckets: number | null = null,
                payDays: number | null = null;
            
            const idedTripIndices = this.findTripleEventIndices(budgetPeriods); // Identified Trip Indices

            for (let index = 0; index < budgetPeriods.length; index++) {
                // const element = array[index];
                
                if (saveAmount === null && nextTriple === null) {
                    /**
                     * On the buckets calculation, "nextTriple - index" results in the number of budget periods where
                     * there are only two occurences (( nextTriple - index ) * 2) of the quarterly payments. However,
                     * it is guaranteed that there is another budget period missing which is the last budget period
                     * where there are three occurrences of the quarterly payments (+3)
                     */

                    nextTriple = this.findNextTriple(index, idedTripIndices, budgetPeriods.length);
                    buckets = Math.abs((( nextTriple - index ) * 2) + 3);
                    saveAmount = buckets * (bill.amount ?? 0);
                    payDays = Math.abs((nextTriple - index) + 1)
                }

                if (saveAmount && nextTriple && payDays) {
                    budgetPeriods[index].amountToSave = saveAmount / payDays;
                }

                if (index == nextTriple) {
                    saveAmount = null;
                    nextTriple = null;
                    buckets = null;
                    payDays = null;
                }
            }
        }

        return bill;
    }

    public static findNextTriple(index: number, triEventIndices: number[], budgetPeriodLength: number) : number
    {
        let nextTriEventIndex: number = -1;

        for (let triEventIndex = index; triEventIndex < budgetPeriodLength; triEventIndex++) {
            if (triEventIndex <= (triEventIndices.find(element => element == triEventIndex) ?? -1)) {
                nextTriEventIndex = triEventIndex;
                break;
            }
        }

        return nextTriEventIndex;
    }

    public static findTripleEventIndices(events: Event[]) : number[]
    {
        const indices: number[] = [];
        let index: number = 0;

        for (const event of events) {
            if (event.isTripleEvent) {
                indices.push(index);
            }

            index++;
        }

        return indices;
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
    ): Event[]
    {
        const events: Event[] = [];

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

    public static findLastRingneckLeapYear(startDate?: DateTime) : number
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

export interface Event {
    budgetPeriod: BudgetPeriod
    count: number
    isTripleEvent: boolean
    amountToSave?: number
}

interface BudgetPeriod {
    start: DateTime
    end: DateTime
}

interface BudgetBucket {
    start: number
    end: number
}