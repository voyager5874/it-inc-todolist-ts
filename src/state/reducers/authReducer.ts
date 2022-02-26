import { LoginActionType } from 'state/actions/types';

type LoginStateType = {
  isLoggedIn: boolean;
};

const iniState: LoginStateType = {
  isLoggedIn: false,
};
export const authReducer = (
  state = iniState,
  action: LoginActionType,
): LoginStateType => {
  switch (action.type) {
    case 'login/SET-AUTH-STATE':
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};

export const setAuthStateAC = (newAuthState: boolean) =>
  ({
    type: 'login/SET-AUTH-STATE',
    isLoggedIn: newAuthState,
  } as const);
