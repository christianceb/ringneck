import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import currency from 'currency.js';
import Bill from 'Entity/Bill';
import FrequencyNames from 'Enums/FrequencyNames';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DatePicker from "./DatePicker";

const NewBill = (props: NewBillProps) => {
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<currency>(currency("1.00"));
    const [date, setDate] = useState<Date|null>(null); // TODO: Really need a better way to say that `date` is nullable and not be explicit enough to mention all three possible types

    useEffect(() => {
        props.bill.name = name;
        props.bill.amount = amount.intValue;
        props.bill.due = date;

        props.onChangeHandler(props.bill);
    })

    return <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
            <TextField fullWidth variant="standard" required label="Name" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
            <TextField
                variant="standard"
                required
                fullWidth
                label="Amount payable"
                type="number"
                value={amount}
                onChange={(event) => setAmount(currency(event.target.value))} />
        </div>
        <div>
            <FormControl fullWidth variant="standard">
                <InputLabel>Frequency</InputLabel>
                <Select label="Frequency">
                    { Object.entries(FrequencyNames).map(frequency => <MenuItem key={frequency[0]} value={frequency[0]}>{frequency[1]}</MenuItem>) }
                </Select>
            </FormControl>
        </div>

        <DatePicker date={date} handleSet={setDate} />
    </Box>;
}

export default NewBill;

interface NewBillProps {
    bill: Bill;
    onChangeHandler: Dispatch<SetStateAction<Bill>>;
}