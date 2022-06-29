import Bill from "Entity/Bill";
import RingneckCalculator from "Services/RingneckCalculator";
import Command from "./Command";

class CalculateCommand implements Command
{
    public constructor(
        private bill: Bill
    )
    {

    }

    public execute(): void
    {
        // RingneckCalculator.calculate(this.bill);
    }

    public result(): Bill
    {
        return this.bill;
    }
}

export default CalculateCommand;