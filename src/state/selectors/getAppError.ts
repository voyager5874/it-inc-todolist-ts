import { Nullable } from '../../types/Nullable';
import { RootStateType } from '../store';

export const getAppError = (state: RootStateType): Nullable<string> => state.app.error;
