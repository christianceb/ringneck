import { Card, CardActions, CardContent} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Bill = () =>
    <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Bill #1
            </Typography>
            <Typography variant="h3" component="div">
                Optus
            </Typography>
            <Typography variant="h4" component="div" gutterBottom>
                You must save {"$400"} every month to prepare for a triple event on {"31 December 2021"}
            </Typography>
            <Typography variant="h4" component="div">
                Afterwards, you only need to save {"$320"} every month for the next triple event
            </Typography>
        </CardContent>
        <CardActions>
            <Button color="error" variant="contained" size="small">Delete this bill</Button>
        </CardActions>
    </Card>;

export default Bill;