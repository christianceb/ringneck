import { Card, CardActions, CardContent} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import currency from 'currency.js';
import BillEntity from '../../Entity/Bill';
import FrequencyNames from 'Enums/FrequencyNames';

const Bill = (props: BillComponentProps) =>
    <Card sx={{ mb: 1 }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Bill #{props.id}
            </Typography>
            <Typography variant="h3" component="div">
                { props.bill.name }
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Frequency: { props.bill.frequency ? FrequencyNames[props.bill.frequency] : "" }
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Payable: { currency(props.bill.amount ?? 0, { fromCents: true }).format() }
            </Typography>
            <Typography variant="h4" component="div" gutterBottom>
                You must save { currency(props.bill.amount ?? 0, { fromCents: true }).format() } every month to prepare for a triple event on {"31 December 2021"}
            </Typography>
            <Typography variant="h4" component="div">
                Afterwards, you only need to save {"$320"} every month for the next triple event
            </Typography>
        </CardContent>
        <CardActions>
            <Button color="error" variant="contained" size="small">Delete this bill</Button>
        </CardActions>
    </Card>;

interface BillComponentProps {
    bill: BillEntity
    id?: number
}

export default Bill;