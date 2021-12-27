import { useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/lab';

const DatePickerTextField = (params: TextFieldProps) => {
  params.variant = "standard";
  
  return <TextField {...params} />
};

export default function DatePicker() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MuiDatePicker
        label="Due date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={DatePickerTextField}
      />
    </LocalizationProvider>
  );
}