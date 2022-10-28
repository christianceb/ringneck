import { Dialog, DialogTitle, DialogContent, DialogActions, Button, ButtonGroup } from "@mui/material";
import NewBillForm from "Views/Components/Bills/Forms/NewBill";
import BillsModel from 'Models/Bills';
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { buildSnackbarProps, PaycheckInfo, SnackbarProps } from "Views/Components/Bills";
import NewBill from "Forms/NewBill";
import NewBillCommand from "Commands/NewBillCommand";
import Command from "Commands/Command";

const NewBillDialog = (props: NewBillDialogProps) => {
    const [newBillInput, setBillInput] = useState<NewBill|undefined>();
    
    let newBillCommand: NewBillCommand;

    const saveBill = (command: Command): void => {
        command.execute();
    }

    const saveOnClickHandler = () => {
        let newSnackbarProps: SnackbarProps = buildSnackbarProps("error", "Something is missing on the form. Give it another look?", true);
        let success = false;

        if (newBillInput) {
            newBillCommand = new NewBillCommand(props.model, newBillInput, props.payInfo);

            saveBill(newBillCommand);

            if (newBillCommand.result()) {
                newSnackbarProps = buildSnackbarProps("success", "Bill has been added", true)
                success = true;
            }
        }

        props.snackbarHandler(newSnackbarProps);

        if (success) {
            props.billRefresh();
            props.handleClose();
        }
    }

    return <>
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>New Bill</DialogTitle>
            <DialogContent>
                <NewBillForm input={newBillInput} inputChangeHandler={setBillInput} />
            </DialogContent>
            <DialogActions>
                <ButtonGroup variant="contained">
                    <Button color="error" onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={saveOnClickHandler}>Save</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    </>;
}

export default NewBillDialog;

interface NewBillDialogProps {
    model: BillsModel,
    open: boolean,
    handleClose: () => void,
    snackbarHandler: Dispatch<SetStateAction<SnackbarProps>>,
    billRefresh: () => void,
    payInfo: PaycheckInfo
}