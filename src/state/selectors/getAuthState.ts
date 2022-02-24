import { RootStateType } from 'state/store';

export const getAuthState = (state: RootStateType): boolean =>
  state.auth.isLoggedIn;
