import * as React from 'react';
import { Typography, Grid, Button } from '@mui/material';
// import NewBill from './Bills/Modal/NewBill'
import { NewBillDialog } from './Bills/Modal/NewBillDialog';
import Bill from "./Bill"

const Bills = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return <Grid container>
        <Grid item xs={12}>
            <Typography variant="h1" component="div">
                Ringneck
            </Typography>
            <>
                <Button variant="contained" onClick={handleOpen}>New Bill</Button>
                <NewBillDialog handleClose={handleClose} open={open} />
            </>
        </Grid>
        <Grid item xs={12}>
            <Bill />
        </Grid>
    </Grid>
}

export default Bills;