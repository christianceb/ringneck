import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import currency from 'currency.js';
import Frequency from 'Enums/Frequency';
import FrequencyTransformer from 'Transformers/Frequency';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DatePicker from "./DatePicker";
import NewBillForm from 'Forms/NewBill';

const NewBill = (props: NewBillProps) => {
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<currency>(currency("1.00"));
    const [date, setDate] = useState<Date|null>(null);
    const [frequency, setFrequency] = useState<string|unknown>("");

    useEffect(() => {
        props.inputChangeHandler({
            name: name,
            amount: amount.intValue,
            due: date,
            frequency: (frequency as Frequency),
        });
    }, [name, amount, date, frequency])

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
                onChange={(event) => setAmount((currency(event.target.value)))} />
        </div>
        <div>
            <FormControl fullWidth variant="standard">
                <InputLabel>Frequency</InputLabel>

                <Select value={frequency} onChange={(event) => setFrequency(event.target.value)} label="Frequency">
                    { FrequencyTransformer.getKvps().map(frequencyKvp => <MenuItem key={frequencyKvp.key} value={(frequencyKvp.value)}>{frequencyKvp.key}</MenuItem>) }
                </Select>
            </FormControl>
        </div>

        <DatePicker date={date} handleSet={setDate} />
    </Box>;
}

export default NewBill;

interface NewBillProps {
    input?: NewBillForm,
    inputChangeHandler: Dispatch<SetStateAction<NewBillForm|undefined>>
}