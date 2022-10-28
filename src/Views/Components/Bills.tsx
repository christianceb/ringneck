import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { Typography, Grid, Box, Button, Alert, Snackbar, AlertColor } from '@mui/material';
import NewBillDialog from './Bills/Modal/NewBillDialog';
import BillsModel from '../../Models/Bills';
import BillEntity from '../../Entity/Bill';
import BillRev from "./Bill"
import Payday from './Bills/Forms/Payday';
import Frequency from 'Enums/Frequency';

const buildSnackbarProps = (
    severity: AlertColor = "error",
    message: string = "",
    open: boolean = false
) : SnackbarProps => {
    const newSnackbarProps: SnackbarProps = new SnackbarProps;

    newSnackbarProps.open = open;
    newSnackbarProps.message = message;
    newSnackbarProps.severity = severity;

    return newSnackbarProps;
}

const Bills = (props: BillsComponentProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [enableNewBill, setEnableNewBill] = useState<boolean>(false);
    const [payDate, setPayDate] = useState<Date|null>(null);
    const [frequency, setFrequency] = useState<Frequency>(Frequency.Fortnightly);
    const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>(buildSnackbarProps());

    useEffect(() => {
        if (canEnableNewBill()) {
            setEnableNewBill(true);
        }
    }, [payDate, frequency])

    const refreshBills = () => {
        props.setBills(props.model.get())
    }

    const deleteBill = (id: number) => {
        props.model.destroy(id);
        refreshBills();
    }

    const canEnableNewBill = (): boolean => payDate != null && frequency != null;

    return <Grid container>
        <Grid item xs={12}>
            <Typography variant="h1">Ringneck</Typography>

            <Payday date={payDate} frequency={frequency} handlePaydaySet={setPayDate} handleFrequencySet={setFrequency} />

            <Box sx={{ mb: 1 }}>
                <Typography variant="h2" gutterBottom>and then add your bills.</Typography>
                <Button variant="contained" disabled={ !enableNewBill } onClick={handleOpen}>New Bill</Button>
                { open && (payDate != null && frequency != null) ? // why can't I just simply call `canEnableNewBill` >:(
                    <NewBillDialog
                        model={props.model}
                        handleClose={handleClose}
                        open={open}
                        snackbarHandler={setSnackbarProps}
                        billRefresh={refreshBills}
                        payInfo={{payDate: payDate, frequency: frequency}}
                    /> : null
                }
            </Box>
        </Grid>
        <Grid item xs={12}>
            { props.bills.map((bill: BillEntity) => <BillRev bill={bill} key={bill.id} id={bill.id} deleteHandler={deleteBill} />) }
        </Grid>
        <Snackbar open={snackbarProps.open} autoHideDuration={3000} onClose={() => setSnackbarProps({ ...snackbarProps, open: false })}>
            <Alert severity={snackbarProps.severity} sx={{ width: '100%' }}>
                {snackbarProps?.message}
            </Alert>
        </Snackbar>
    </Grid>
}

interface BillsComponentProps
{
    model: BillsModel
    bills: BillEntity[]
    setBills: Dispatch<SetStateAction<BillEntity[]>>
}

interface PaycheckInfo {
    payDate: Date
    frequency: Frequency
}

class SnackbarProps
{
    public open: boolean = false;
    public message?: string;
    public severity?: AlertColor;
}

export default Bills;
export type { PaycheckInfo };
export { buildSnackbarProps, SnackbarProps };