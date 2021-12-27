export default class CalculationResult {
    saveAmount: number;
    saveAmountAfter: number|null;

    constructor(
        saveAmount: number,
        saveAmountAfter: number|null
    ) {
        this.saveAmount = saveAmount;
        this.saveAmountAfter = saveAmountAfter;
    }
}