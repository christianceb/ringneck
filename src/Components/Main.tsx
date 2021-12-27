import Grid from '@mui/material/Grid';
import Bills from './Bills';
import Calendar from './Calendar';

const Main = () => 
    <Grid container spacing={0}>
        <Grid item xs={8} height="100vh">
            <Calendar />
        </Grid>
        <Grid item sx={{ p: 1 }} xs={4} height="100vh">
            <Bills />
        </Grid>
    </Grid>

export default Main;