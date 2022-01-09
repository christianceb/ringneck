import { SetStateAction, Dispatch } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/lab';

const DatePickerTextField = (params: TextFieldProps) => {
  params.variant = "standard";
  
  return <TextField {...params} />
};

const DatePicker = (props: DatePickerParams) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MuiDatePicker
        label="Due date"
        value={props.date}
        onChange={(date: Date|null) => props.handleSet(date)}
        renderInput={DatePickerTextField}
        inputFormat="D MMMM yyyy"
      />
    </LocalizationProvider>
  );
}

export default DatePicker;

interface DatePickerParams {
  date?: Date|null|undefined,
  handleSet: Dispatch<SetStateAction<Date|null|undefined>>  // TODO: Really need a better way to say that `date` is nullable and not be explicit enough to mention all three possible types
}