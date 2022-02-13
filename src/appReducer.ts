type IniAppStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

export enum APP_ACTIONS_TYPE {
    APP_SET_STATUS = 'APP/SET-STATUS',
    APP_SET_ERROR = 'APP/SET-ERROR',
}

const iniAppState: IniAppStateType = {
    status: 'idle',
    error: 'some error'
}

type AppActionsType = any

export const appReducer = ( state: IniAppStateType = iniAppState, action: AppActionsType) => {
    switch (action.type){
        case APP_ACTIONS_TYPE.APP_SET_STATUS:
            return {...state, status: action.status}
        case APP_ACTIONS_TYPE.APP_SET_ERROR:
            return {...state, error: action.error}
        default:
            return {...state}
    }
}