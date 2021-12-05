import Grid from '@mui/material/Grid';
import Calendar from './Calendar';

const Main = () => 
    <Grid container spacing={0}>
        <Grid item xs={8} height="100vh">
            <Calendar />
        </Grid>
        <Grid item xs={4} bgcolor="blue" height="100vh">
            Sidebar
        </Grid>
    </Grid>

export default Main;