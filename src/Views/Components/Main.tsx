import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Bills from './Bills';
import BillsModel from '../../Models/Bills';
import Calendar from './Calendar';
import Carendar from './Carendar';

const Main = () => {
    const billsModel = new BillsModel();

    const [bills, setBills] = useState(billsModel.get());

    return <Grid container spacing={0}>
        <Grid item xs={8} height="100vh">
            <Carendar />
        </Grid>
        <Grid item sx={{ p: 1 }} xs={4} height="100vh">
            <Bills model={billsModel} setBills={setBills} bills={bills}/>
        </Grid>
    </Grid>
}

export default Main;