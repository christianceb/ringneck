import { DateTime } from "luxon";

export interface BudgetPeriod {
    period: Period
    count: number
    isTripleEvent: boolean
    amountToSave?: number
}

interface Period {
    start: DateTime
    end: DateTime
}