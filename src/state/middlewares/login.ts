import { Dispatch } from 'redux';

import { authAPI } from 'api';
import { LoginRequestDataType, ServerResultCodes } from 'api/types';
import { setAppStatusAC } from 'state/actions/app';
import { setAuthStateAC } from 'state/reducers/authReducer';
import { handleReject, handleResolveWithServerErrorMessage } from 'utils';

export const loginTC = (authData: LoginRequestDataType) => (dispatch: Dispatch) => {
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

export const logoutTC = () => (dispatch: Dispatch) => {
  authAPI
    .logout()
    .then(response => {
      if (response.data.resultCode === ServerResultCodes.success) {
        dispatch(setAuthStateAC(false));
      } else {
        handleResolveWithServerErrorMessage(response.data, dispatch);
      }
    })
    .catch(error => {
      handleReject(error, dispatch);
    });
};
