import { TaskType } from '../../api/types';
import { RootStateType } from '../store';
import { TasksListType } from '../reducers/tasksActionsReducer';

export const getTasks = (state: RootStateType): TasksListType => state.tasks;
