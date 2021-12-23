import { Typography, Grid } from '@mui/material';
import NewBill from './Modal/NewBill'

const Header = () => 
    <Grid container>
        <Grid item xs={12}>
            <Typography variant="h1" component="div">
                Optus
            </Typography>
            <NewBill />
        </Grid>
    </Grid>

export default Header;