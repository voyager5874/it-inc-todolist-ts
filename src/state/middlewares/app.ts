import { Dispatch } from 'redux';

import { authAPI } from 'api';
import { ServerResultCodes } from 'api/types';
import { initializeAppAC, setAppStatusAC } from 'state/actions/app';
import { setAuthStateAC } from 'state/reducers/authReducer';
import { handleReject, handleResolveWithServerErrorMessage } from 'utils';

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .authMe()
    .then(response => {
      if (response.data.resultCode === ServerResultCodes.success) {
        // dispatch(initializeAppAC(true));
        dispatch(setAuthStateAC(true));
        dispatch(setAppStatusAC('succeeded'));
      } else {
        handleResolveWithServerErrorMessage(response.data, dispatch);
      }
      dispatch(initializeAppAC(true));
    })
    .catch(error => {
      handleReject(error, dispatch);
    });
};
