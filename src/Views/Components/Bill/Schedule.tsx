import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BudgetPeriod } from 'Services/RingneckCalculator';

const Schedule = (props: ScheduleProps) => {
    return (
        <TableContainer sx={{ maxHeight: 250 }} component={Paper}>
            <Table stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { props.schedule.map((budgetPeriod: BudgetPeriod) => <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{"TODO MISSING DATE"}</TableCell>
                        <TableCell align="right">Payday</TableCell>
                        <TableCell align="right">{budgetPeriod.amountToSave}</TableCell>
                        <TableCell align="right">$ 540.00</TableCell>
                    </TableRow>) }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Schedule;

interface ScheduleProps{
    schedule: BudgetPeriod[];
}