import {setAppErrorAC, setAppStatusAC} from "../state/appReducer";
import {BaseResponseType} from "../api/it-inc-api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";

export const handleResolveWithServerErrorMessage = (data: BaseResponseType, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}


export const handleReject = (error: AxiosError, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}