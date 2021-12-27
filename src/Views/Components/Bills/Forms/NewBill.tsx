import TextField from '@mui/material/TextField';
import BasicDatePicker from "./DatePicker";

const NewBill = () =>
    <>
        <div><TextField variant="standard" required label="Name" /></div>
        <div><TextField variant="standard" required label="Amount payable" type="number" /></div>
        <BasicDatePicker />
    </>

export default NewBill;