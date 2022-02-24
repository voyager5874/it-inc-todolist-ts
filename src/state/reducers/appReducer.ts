import { APP_ACTIONS_TYPE } from 'state/actions/enums';
import { AppReducerActionsType, AppStateType } from 'state/actions/types';

const iniAppState: AppStateType = {
  appStatus: 'idle',
  error: null,
  isInitialized: false,
};

export const appReducer = (
  state: AppStateType = iniAppState,
  action: AppReducerActionsType,
): AppStateType => {
  switch (action.type) {
    case APP_ACTIONS_TYPE.APP_SET_STATUS:
      return { ...state, appStatus: action.status };
    case APP_ACTIONS_TYPE.APP_SET_ERROR:
      return { ...state, error: action.error };
    case APP_ACTIONS_TYPE.APP_SET_INIT:
      return { ...state, isInitialized: action.isInitialized };
    default:
      return { ...state };
  }
};
