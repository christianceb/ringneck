import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { Typography, Grid, Box, Button } from '@mui/material';
import NewBillDialog from './Bills/Modal/NewBillDialog';
import BillsModel from '../../Models/Bills';
import BillEntity from '../../Entity/Bill';
import Bill from "./Bill"
import BillRev from "./BillRev"
import Payday from './Bills/Forms/Payday';
import Frequency from 'Enums/Frequency';

const Bills = (props: BillsComponentProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [enableNewBill, setEnableNewBill] = useState<boolean>(false);
    
    const [payDate, setPayDate] = useState<Date|null>(null);
    const [frequency, setFrequency] = useState<Frequency>(Frequency.Fortnightly);

    useEffect(() => {
        if (payDate && frequency) {
            setEnableNewBill(true);
        }
    }, [payDate, frequency])

    const deleteBill = (id: number) => {
        props.model.destroy(id);
        props.setBills(props.model.get());
    }

    return <Grid container>
        <Grid item xs={12}>
            <Typography variant="h1">
                Ringneck
            </Typography>

            <Payday date={payDate} frequency={frequency} handlePaydaySet={setPayDate} handleFrequencySet={setFrequency} />

            <Box sx={{ mb: 1 }}>
                <Typography variant="h2" gutterBottom>And then add your bills</Typography>
                <Button variant="contained" disabled={ !enableNewBill } onClick={handleOpen}>New Bill</Button>
                { open ? <NewBillDialog model={props.model} handleClose={handleClose} open={open} /> : null }
            </Box>
        </Grid>
        <Grid item xs={12}>
            { props.bills.map((bill: BillEntity) => <BillRev bill={bill} id={bill.id} deleteHandler={deleteBill} />) }
        </Grid>
    </Grid>
}

interface BillsComponentProps {
    model: BillsModel
    bills: BillEntity[]
    setBills: Dispatch<SetStateAction<BillEntity[]>>
}

export default Bills;