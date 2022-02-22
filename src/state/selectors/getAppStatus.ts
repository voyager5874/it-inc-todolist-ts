import { EntityStatusType } from '../reducers/appReducer';
import { RootStateType } from '../store';

export const getAppStatus = (state: RootStateType): EntityStatusType =>
  state.app.appStatus;
