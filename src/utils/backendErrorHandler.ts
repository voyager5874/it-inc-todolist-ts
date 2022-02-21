import {AppReducerActionsType, setAppErrorAC, setAppStatusAC} from "../state/appReducer";
import {BaseResponseType} from "../api/it-inc-api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";

export const handleResolveWithServerErrorMessage = <T>(data: BaseResponseType<T>, dispatch: Dispatch<AppReducerActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}


export const handleReject = (error: AxiosError, dispatch: Dispatch<AppReducerActionsType>) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}