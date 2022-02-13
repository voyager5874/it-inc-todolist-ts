import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useSelector} from "react-redux";
import {RootStateType} from "../state/store";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ErrorSnackbar = () => {
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        // setOpen(false);
    };

    const error = useSelector<RootStateType, string | null>(state => state.app.error)
    const isOpen = error !== null

    return (

        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                {error}
            </Alert>
        </Snackbar>
    )
}

