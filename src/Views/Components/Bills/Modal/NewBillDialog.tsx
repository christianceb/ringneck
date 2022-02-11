import { Dialog, DialogTitle, DialogContent, DialogActions, Button, ButtonGroup } from "@mui/material";
import NewBillForm from "Views/Components/Bills/Forms/NewBill";
import BillsModel from 'Models/Bills';
import BillsEntity from "Entity/Bill"
import { useState } from "react";
import CalculateCommand from 'Commands/CalculateCommand';
import Command from "Commands/Command";

const NewBillDialog = (props: NewBillDialogProps) => {
    const [bill, setBill] = useState(new BillsEntity());
    const calculateCommand = new CalculateCommand(bill);

    const invoker = (command: Command) => {
        command.execute();
    }

    const saveBill = () => {
        invoker(calculateCommand);

        props.model.store(calculateCommand.result());
        props.handleClose();
    }

    return <>
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>New Bill</DialogTitle>
            <DialogContent>
                <NewBillForm bill={bill} onChangeHandler={setBill} />
            </DialogContent>
            <DialogActions>
                <ButtonGroup variant="contained">
                    <Button color="error" onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={saveBill}>Save</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    </>;
}

export default NewBillDialog;

interface NewBillDialogProps {
    model: BillsModel;
    open: boolean;
    handleClose: () => void;
}