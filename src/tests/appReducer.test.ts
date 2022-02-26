import { setAppErrorAC, setAppStatusAC } from 'state/actions/app';
import { AppStateType, EntityStatusType } from 'state/actions/types';
import { appReducer } from 'state/reducers/appReducer';

let startState: AppStateType;

beforeEach(() => {
  const startState = {
    appStatus: 'idle',
    error: null,
    isInitialized: false,
  };
});

test('proper error should be set', () => {
  const err: string | null = 'server error, code 500';
  const endState = appReducer(startState, setAppErrorAC(err));
  expect(endState.error).toBe(err);
});

test('the status should be set', () => {
  const status: EntityStatusType = 'failed';
  const endState = appReducer(startState, setAppStatusAC(status));
  expect(endState.appStatus).toBe(status);
});
