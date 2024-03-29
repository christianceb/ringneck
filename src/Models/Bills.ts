import Bill from "../Entity/Bill";
import Frequency from "../Enums/Frequency";

export default class Bills {
    public items: Bill[] = [];

    static lastId: number = 0;

    constructor()
    {
        this.clear();

        // this.store(new Bill(1113, new Date("2021-12-31"), Frequency.Fortnightly, "Toyota Corella"));
    }

    store(bill: Bill) : void {
        // Find us an Id if not set. Otherwise, do nothing and implicitly use defined Id
        if (bill.id == null) {
            // Use last Id
            bill.id = Bills.lastId + 1;
        }

        // Increment last Id
        // TODO: what if the provisioned Id is less than Bills.lastId? 🤔
        Bills.lastId = bill.id;

        this.items.push(bill);
    }

    destroy(billOrId: Bill|number) : boolean {
        let success = false;
        let index: number;

        if (billOrId instanceof Bill) {
            index = this.items.findIndex((element: Bill) => element.id === billOrId.id);
        }
        else {
            index = this.items.findIndex((element: Bill) => element.id === billOrId);
        }

        if (index >= 0) {
            this.items.splice(index, 1);

            success = true;
        }

        return success;
    }

    find(ids: number|number[]) : Bill|Bill[]|null
    {
        let result : Bill[]|Bill|null = []
        let idsToFind : number[] = []

        if (typeof ids === "number") {
            idsToFind.push(ids)
        }
        else {
            idsToFind = [...ids];
        }

        for (const id of idsToFind) {
            const found : Bill|undefined|null = this.items.find((element) => element.id === id);

            if (found != null) {
                result.push(found);
            }
        }

        if (result.length > 0) {
            if (typeof ids === "number") {
                result = result[0];
            }
        }
        else {
            result = null;
        }

        return result;
    }

    clear() : void {
        Bills.lastId = 0;
        this.items = [];
    }

    get() : Bill[] {
        return this.items;
    }
}