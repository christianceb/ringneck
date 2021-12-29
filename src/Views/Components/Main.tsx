import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Bills from './Bills';
import BillsModel from '../../Models/Bills';
import Calendar from './Calendar';

const Main = () => {
    const billsModel = new BillsModel();

    const [bills] = useState(billsModel.get());

    return <Grid container spacing={0}>
        <Grid item xs={8} height="100vh">
            <Calendar />
        </Grid>
        <Grid item sx={{ p: 1 }} xs={4} height="100vh">
            <Bills model={billsModel} bills={bills}/>
        </Grid>
    </Grid>
}

export default Main;