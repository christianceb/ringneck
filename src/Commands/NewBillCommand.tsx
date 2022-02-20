import Bill from "Entity/Bill";
import Bills from "Models/Bills";
import NewBill from "Forms/NewBill";
import Command from "./Command";

export default class NewBillCommand implements Command
{
    private bill?: Bill;

    public constructor(
        private billsModel: Bills,
        private input: NewBill,
    ) { }

    public execute(): boolean
    {
        this.bill = this.NewBill();

        if (this.bill)
        {
            this.billsModel.store(this.bill);
        }

        return this.bill != null;
    }

    private NewBill(): Bill | undefined
    {
        let bill: Bill | undefined;

        if (
            this.input.amount
            && this.input.due
            && this.input.frequency
            && this.input.name
        ) {
            bill = new Bill(
                this.input.amount,
                this.input.due,
                this.input.frequency,
                this.input.name
            );
        }

        return bill;
    }

    public result(): Bill | undefined
    {
        return this.bill;
    }
}