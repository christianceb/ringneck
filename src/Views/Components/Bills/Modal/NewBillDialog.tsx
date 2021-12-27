import { Dialog, DialogTitle, DialogContent, DialogActions, Button, ButtonGroup } from "@mui/material";
import NewBillForm from "../Forms/NewBill";

const NewBillDialog = (props: any) => {
    return <>
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>New Bill</DialogTitle>
            <DialogContent>
                <NewBillForm />
            </DialogContent>
            <DialogActions>
                <ButtonGroup variant="contained">
                    <Button color="error" onClick={props.handleClose}>Cancel</Button>
                    <Button>Submit</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    </>;
}

export default NewBillDialog;