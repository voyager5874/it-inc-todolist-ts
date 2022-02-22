import { Dispatch } from 'redux';

import { authAPI } from '../../api';
import { LoginDataType, ServerResultCodes } from '../../api/types';
import {
  handleReject,
  handleResolveWithServerErrorMessage,
} from '../../utils/backendErrorHandler';
import { setAppStatusAC } from './appReducer';

type iniLoginStateType = {
  isLoggedIn: boolean;
};

const iniState: iniLoginStateType = {
  isLoggedIn: false,
};
export const loginReducer = (state = iniState, action: ActionType) => {
  switch (action.type) {
    case 'loginReducer/SET-AUTH-STATE':
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};

type ActionType = ReturnType<typeof setAuthStateAC>;

export const setAuthStateAC = (newAuthState: boolean) =>
  ({
    type: 'loginReducer/SET-AUTH-STATE',
    isLoggedIn: newAuthState,
  } as const);

export const authTC = (authData: LoginDataType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  authAPI
    .login(authData)
    .then(response => {
      if (response.data.resultCode === ServerResultCodes.success) {
        dispatch(setAuthStateAC(true));
        dispatch(setAppStatusAC('succeeded'));
      } else {
        handleResolveWithServerErrorMessage(response.data, dispatch);
      }
    })
    .catch(error => {
      handleReject(error, dispatch);
    });
};
