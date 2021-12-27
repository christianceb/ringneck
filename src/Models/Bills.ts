import Bill from "../Entity/Bill";

export default class Bills {
    public items: Bill[] = [];

    store(bill: Bill) : void {
        this.items.push(bill);
    }

    destroy(bill: Bill|number) : boolean {
        let success = false;
        let index: number;

        if (bill instanceof Bill) {
            index = this.items.findIndex((element) => element.id === bill.id);
        }
        else {
            index = bill;
        }

        if (index >= 0) {
            this.items.splice(index, 1);
        }

        return success;
    }

    find(ids: number|number[]) : Bill|Bill[]
    {
        let result : Bill[]|Bill = []
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

        return result;
    }

    clear() : void {
        Bill.lastId = 0;
        this.items = [];
    }
}