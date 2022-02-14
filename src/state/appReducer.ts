export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type IniAppStateType = {
    status: AppStatusType
    error: string | null
}

export enum APP_ACTIONS_TYPE {
    APP_SET_STATUS = 'APP/SET-STATUS',
    APP_SET_ERROR = 'APP/SET-ERROR',
}

const iniAppState: IniAppStateType = {
    status: 'idle',
    error: null,
}

type AppActionsType = SetAppErrorActionType | SetAppStatusActionType

export const appReducer = ( state: IniAppStateType = iniAppState, action: AppActionsType) : IniAppStateType => {
    switch (action.type){
        case APP_ACTIONS_TYPE.APP_SET_STATUS:
            return {...state, status: action.status}
        case APP_ACTIONS_TYPE.APP_SET_ERROR:
            return {...state, error: action.error}
        default:
            return {...state}
    }
}


type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (errorMessage: string | null) => {
    return{
        type: APP_ACTIONS_TYPE.APP_SET_ERROR,
        error: errorMessage,
    } as const
}

type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (newStatus: AppStatusType) => {
    return{
        type: APP_ACTIONS_TYPE.APP_SET_STATUS,
        status: newStatus,
    } as const
}