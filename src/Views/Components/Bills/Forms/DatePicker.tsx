import { SetStateAction, Dispatch } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/lab';
import { DateTime } from 'luxon';

const DatePickerTextField = (params: TextFieldProps) => {
  params.variant = "standard";
  
  return <TextField {...params} />
};

const DatePicker = (props: DatePickerParams) => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <MuiDatePicker
        label="Due date"
        value={props.date}
        onChange={(date: DateTime|null) => date != null ? props.handleSet(date.toJSDate()) : null }
        renderInput={DatePickerTextField}
        inputFormat="d MMM, yyyy"
        disableMaskedInput={true}
      />
    </LocalizationProvider>
  );
}

export default DatePicker;

interface DatePickerParams {
  date?: Date|null,
  handleSet: Dispatch<SetStateAction<Date|null>>  // TODO: Really need a better way to say that `date` is nullable and not be explicit enough to mention all three possible types
}