import { APP_ACTIONS_TYPE } from 'state/actions/enums';
import { EntityStatusType } from 'state/actions/types';

export const setAppErrorAC = (errorMessage: string | null) =>
  ({
    type: APP_ACTIONS_TYPE.APP_SET_ERROR,
    error: errorMessage,
  } as const);

export const setAppStatusAC = (newStatus: EntityStatusType) =>
  ({
    type: APP_ACTIONS_TYPE.APP_SET_STATUS,
    status: newStatus,
  } as const);

export const initializeAppAC = (newInitState: boolean) =>
  ({
    type: APP_ACTIONS_TYPE.APP_SET_INIT,
    isInitialized: newInitState,
  } as const);
