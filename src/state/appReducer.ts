export type EntityStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type IniAppStateType = {
    appStatus: EntityStatusType
    error: string | null
}

export enum APP_ACTIONS_TYPE {
    APP_SET_STATUS = 'APP/SET-STATUS',
    APP_SET_ERROR = 'APP/SET-ERROR',
}

const iniAppState: IniAppStateType = {
    appStatus: 'idle',
    error: null,
}

type AppActionsType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>

export const appReducer = ( state: IniAppStateType = iniAppState, action: AppActionsType) : IniAppStateType => {
    switch (action.type){
        case APP_ACTIONS_TYPE.APP_SET_STATUS:
            return {...state, appStatus: action.status}
        case APP_ACTIONS_TYPE.APP_SET_ERROR:
            return {...state, error: action.error}
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