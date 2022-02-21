import {authAPI, LoginDataType, ServerResultCodes} from "../../api/it-inc-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../appReducer";
import {
    handleReject,
    handleResolveWithServerErrorMessage
} from "../../utils/backendErrorHandler";

type iniLoginStateType = {
    isLoggedIn: boolean
}

const iniState: iniLoginStateType = {
    isLoggedIn: false,
}
export const loginReducer = (state = iniState, action: ActionType) => {
    switch (action.type){
        case "loginReducer/SET-AUTH-STATE":
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

export const authTC = (authData: LoginDataType) => {
    return (dispatch: Dispatch)=>{
        dispatch(setAppStatusAC("loading"))
        authAPI.login(authData)
            .then(response => {
                if(response.data.resultCode===ServerResultCodes.success){
                    dispatch(setAuthStateAC(true))
                    dispatch(setAppStatusAC("succeeded"))
                } else{
                    handleResolveWithServerErrorMessage(response.data, dispatch)
                }
            }).catch(error => {
                handleReject(error, dispatch)
        })
    }
}

type ActionType = ReturnType<typeof setAuthStateAC>


export const setAuthStateAC = (newAuthState: boolean) => {
    return {
        type: 'loginReducer/SET-AUTH-STATE',
        isLoggedIn: newAuthState,
    } as const
}