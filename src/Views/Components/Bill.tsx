import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BillEntity from '../../Entity/Bill';
import { Button, Divider } from '@mui/material';
import Schedule from './Bill/Schedule';
import FrequencyNames from 'Enums/FrequencyNames';
import currency from 'currency.js';


const Bill = (props: BillComponentProps) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const destroy = (event: any) => {
        if (props.id)
        {
            props.deleteHandler(props.id)
        }
    }

    return (
        <Card sx={{ mb: 1 }}>
            <CardHeader avatar={<Avatar {...stringAvatar(props.bill.name ?? "")}>{props.bill.name?.substring(0,2).toUpperCase()}</Avatar>} title={ props.bill.name } subheader="14 Sept, 2016" />
            <CardContent>
                <Typography variant="body2">
                    Frequency: { props.bill.frequency ? FrequencyNames[props.bill.frequency] : "" }
                </Typography>
                <Typography variant="body2">
                    Payable: { currency(props.bill.amount ?? 0, { fromCents: true }).format() }
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>
                    On your upcoming paydays, save <strong>$100</strong> until <strong>12 Jan, 2020</strong>. Then follow the rest of the schedule.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="Edit"><EditIcon /></IconButton> */}
                <IconButton aria-label="Delete this Bill" onClick={destroy}><DeleteIcon /></IconButton>
                
                <Button onClick={handleExpandClick} variant="contained" color="success" sx={{ marginLeft: "auto" }}>{ expanded ? "Hide" : "Show" } Schedule</Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto">
                <CardContent>
                    <Schedule />
                </CardContent>
            </Collapse>
        </Card>
    );
}

interface BillComponentProps {
    bill: BillEntity
    id?: number
    deleteHandler: (id: number) => void
}

const stringToColor = (string: string) => {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
  
    return color;
}
  
const stringAvatar = (name: string) => {
    return {
        sx: { bgcolor: stringToColor(name), },
    };
}
  

export default Bill;