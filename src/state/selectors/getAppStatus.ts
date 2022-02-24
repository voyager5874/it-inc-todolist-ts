import { RootStateType } from '../store';

import { EntityStatusType } from 'state/actions/types';

export const getAppStatus = (state: RootStateType): EntityStatusType =>
  state.app.appStatus;
