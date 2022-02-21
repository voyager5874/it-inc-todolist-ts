import {Dispatch} from "redux";
import {authAPI, ServerResultCodes} from "../api/it-inc-api";
import {
    handleReject,
    handleResolveWithServerErrorMessage
} from "../utils/backendErrorHandler";

export type EntityStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type IniAppStateType = {
    appStatus: EntityStatusType
    error: string | null
    isInitialized: boolean
}

export enum APP_ACTIONS_TYPE {
    APP_SET_STATUS = 'APP/SET-STATUS',
    APP_SET_ERROR = 'APP/SET-ERROR',
    APP_SET_INIT = 'APP/SET-INIT',
}

const iniAppState: IniAppStateType = {
    appStatus: 'idle',
    error: null,
    isInitialized: false
}



export const appReducer = ( state: IniAppStateType = iniAppState, action: AppReducerActionsType) : IniAppStateType => {
    switch (action.type){
        case APP_ACTIONS_TYPE.APP_SET_STATUS:
            return {...state, appStatus: action.status}
        case APP_ACTIONS_TYPE.APP_SET_ERROR:
            return {...state, error: action.error}
        case APP_ACTIONS_TYPE.APP_SET_INIT:
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}


export const setAppErrorAC = (errorMessage: string | null) => {
    return{
        type: APP_ACTIONS_TYPE.APP_SET_ERROR,
        error: errorMessage,
    } as const
}

export const setAppStatusAC = (newStatus: EntityStatusType) => {
    return{
        type: APP_ACTIONS_TYPE.APP_SET_STATUS,
        status: newStatus,
    } as const
}

export const initializeAppAC = (newInitState: boolean) => {
    return {
        type: APP_ACTIONS_TYPE.APP_SET_INIT,
        isInitialized: newInitState,
    } as const
}


export const initializeAppTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.authMe().then(response => {
            if(response.data.resultCode === ServerResultCodes.success){
                dispatch(initializeAppAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else{
                handleResolveWithServerErrorMessage(response.data, dispatch)
            }
        }).catch(error => {
            handleReject(error, dispatch)
        })
    }
}

export type AppReducerActionsType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC> | ReturnType<typeof initializeAppAC>