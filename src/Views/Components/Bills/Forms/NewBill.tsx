import TextField from '@mui/material/TextField';
import currency from 'currency.js';
import Bill from 'Entity/Bill';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import BasicDatePicker from "./DatePicker";

const NewBill = (props: NewBillProps) => {
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<currency>(currency("1.00"));
    const [date, setDate] = useState<Date|null|undefined>(new Date()); // TODO: Really need a better way to say that `date` is nullable and not be explicit enough to mention all three possible types

    useEffect(() => {
        props.bill.name = name;
        props.bill.amount = amount.intValue;
        props.bill.due = date;

        props.onChangeHandler(props.bill);
    })

    return <>
        <div><TextField variant="standard" required label="Name" value={name} onChange={(event) => setName(event.target.value)} /></div>
        <div>
            <TextField
                variant="standard"
                required
                label="Amount payable"
                type="number"
                value={amount}
                onChange={(event) => setAmount(currency(event.target.value))} />
        </div>
        <BasicDatePicker date={date} handleSet={setDate} />
    </>;
}

export default NewBill;

interface NewBillProps {
    bill: Bill;
    onChangeHandler: Dispatch<SetStateAction<Bill>>;
}