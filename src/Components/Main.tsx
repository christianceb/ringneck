import Grid from '@mui/material/Grid';

const Main = () => 
    <Grid container spacing={0}>
        <Grid item xs={8} bgcolor="red" height="100vh">
            Calendar
        </Grid>
        <Grid item xs={4} bgcolor="blue" height="100vh">
            Sidebar
        </Grid>
    </Grid>

export default Main;