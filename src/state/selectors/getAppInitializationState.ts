import { RootStateType } from '../store';

export const getAppInitializationState = (state: RootStateType): boolean =>
  state.app.isInitialized;
