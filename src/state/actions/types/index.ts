import { initializeAppAC, setAppErrorAC, setAppStatusAC } from 'state/actions/app';
import { Nullable } from 'types/Nullable';

export type EntityStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppStateType = {
  appStatus: EntityStatusType;
  error: Nullable<string>;
  isInitialized: boolean;
};

export type AppReducerActionsType =
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof initializeAppAC>;
