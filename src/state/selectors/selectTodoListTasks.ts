import { RootStateType } from '../store';

import { TaskType } from 'api/types';

export const selectTodoListTasks = (
  state: RootStateType,
  todoListID: string,
): TaskType[] => state.tasks[todoListID];
