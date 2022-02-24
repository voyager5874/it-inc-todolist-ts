import { RootStateType } from '../store';

import { Nullable } from 'types/Nullable';

export const getAppError = (state: RootStateType): Nullable<string> => state.app.error;
