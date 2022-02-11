import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import DatePicker from '@mui/lab/DatePicker';
import { SetStateAction, Dispatch } from 'react';
import { LocalizationProvider } from "@mui/lab";
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import FrequencyNames from "Enums/FrequencyNames";
import Frequency from "Enums/Frequency";

const Payday = (props: PaydayProps) => {
    return <Box>
        <Typography variant="h2" gutterBottom component="div">Set your pay date</Typography>

        <Box sx={{ mb: 1, display: 'flex', gap: "1rem" }}>
            <LocalizationProvider dateAdapter={AdapterLuxon} sx={{ flex: "1 0 auto"}}>
                <DatePicker
                    label="My next payday is in"
                    value={props.date}
                    onChange={(date: Date|null) => { props.handlePaydaySet(date) }}
                    renderInput={(params: any) => <TextField {...params}/>}
                    inputFormat="d MMM, yyyy"
                />
            </LocalizationProvider>

            <FormControl disabled sx={{ flex: "1 0 auto"}}>
                <InputLabel>I am paid</InputLabel>
                <Select value={props.frequency} label="I am paid" onChange={(event: any) => { props.handleFrequencySet(event.target.value) }} autoWidth>
                    { Object.entries(FrequencyNames).map(frequency => <MenuItem key={frequency[0]} value={frequency[0]}>{frequency[1]}</MenuItem>) }
                </Select>
            </FormControl>
        </Box>
    </Box>
}

export default Payday;

interface PaydayProps {
    date?: Date|null,
    frequency?: Frequency,
    handlePaydaySet: Dispatch<SetStateAction<Date|null>>,
    handleFrequencySet: Dispatch<SetStateAction<Frequency>>,
}