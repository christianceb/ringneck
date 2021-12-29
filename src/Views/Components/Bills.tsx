import { useState } from 'react';
import { Typography, Grid, Box, Button } from '@mui/material';
import NewBillDialog from './Bills/Modal/NewBillDialog';
import BillsModel from '../../Models/Bills';
import BillEntity from '../../Entity/Bill';
import Bill from "./Bill"

const Bills = (props: BillsComponentProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return <Grid container>
        <Grid item xs={12}>
            <Typography variant="h1" component="div">
                Ringneck
            </Typography>
            <Box sx={{ mb: 1 }}>
                <Button variant="contained" onClick={handleOpen}>New Bill</Button>
                <NewBillDialog handleClose={handleClose} open={open} />
            </Box>
        </Grid>
        <Grid item xs={12}>
            { props.bills.map((bill: BillEntity) => <Bill bill={bill} id={bill.id} />) }
        </Grid>
    </Grid>
}

interface BillsComponentProps {
    model: BillsModel
    bills: BillEntity[]
}

export default Bills;