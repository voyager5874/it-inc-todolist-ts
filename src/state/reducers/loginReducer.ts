type LoginStateType = {
  isLoggedIn: boolean;
};

const iniState: LoginStateType = {
  isLoggedIn: false,
};
export const loginReducer = (state = iniState, action: ActionType): LoginStateType => {
  switch (action.type) {
    case 'loginReducer/SET-AUTH-STATE':
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};

type ActionType = ReturnType<typeof setAuthStateAC>;

export const setAuthStateAC = (newAuthState: boolean) =>
  ({
    type: 'loginReducer/SET-AUTH-STATE',
    isLoggedIn: newAuthState,
  } as const);
