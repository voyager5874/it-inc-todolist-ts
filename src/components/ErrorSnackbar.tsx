import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../state/store";
import {setAppErrorAC} from "../state/appReducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export const ErrorSnackbar = () => {

    const error = useAppSelector<string | null>(state => state.app.error)
    const isOpen = (error !== null)

    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };


    return (

        <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error && error}
            </Alert>
        </Snackbar>
    )
}

