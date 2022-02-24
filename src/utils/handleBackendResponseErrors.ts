import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { BaseResponseType } from 'api/types';
import { setAppErrorAC, setAppStatusAC } from 'state/actions/app';
import { AppReducerActionsType } from 'state/actions/types';

const FIRST_ARRAY_ITEM = 0;

export const handleResolveWithServerErrorMessage = <T>(
  data: BaseResponseType<T>,
  dispatch: Dispatch<AppReducerActionsType>,
): void => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[FIRST_ARRAY_ITEM]));
  } else {
    dispatch(setAppErrorAC('some error occurred'));
  }
  dispatch(setAppStatusAC('failed'));
};

export const handleReject = (
  error: AxiosError,
  dispatch: Dispatch<AppReducerActionsType>,
): void => {
  dispatch(setAppErrorAC(error.message));
  dispatch(setAppStatusAC('failed'));
};
