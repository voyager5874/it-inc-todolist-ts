import { taskPutRequestBodyType, TaskType, TodoListOnServerType } from 'api/types';
import { initializeAppAC, setAppErrorAC, setAppStatusAC } from 'state/actions/app';
import { setTasksAC } from 'state/middlewares/tasks';
import { setAuthStateAC } from 'state/reducers/authReducer';
import {
  addListAC,
  changeFilterAC,
  changeListNameAC,
  removeListAC,
  setListsAC,
  setListStatusAC,
} from 'state/reducers/listsActionsReducer';
import {
  addTaskAC,
  removeTaskAC,
  updateTaskDataAC,
} from 'state/reducers/tasksActionsReducer';
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

// export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>;

export type ListsActionsType =
  | ReturnType<typeof addListAC>
  | ReturnType<typeof removeListAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof changeListNameAC>
  | ReturnType<typeof setListsAC>
  | ReturnType<typeof setListStatusAC>
  | AppReducerActionsType;

export type setListStatusActionType = ReturnType<typeof setListStatusAC>;
export type AddListActionType = ReturnType<typeof addListAC>;

export type TasksFilterType = 'all' | 'completed' | 'active';

export type TodoListInAppType = TodoListOnServerType & {
  activeFilter: TasksFilterType;
  entityStatus: EntityStatusType;
};

export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type UpdateTaskDataActionType = ReturnType<typeof updateTaskDataAC>;
export type setTasksActionType = ReturnType<typeof setTasksAC>;
export type UpdateTaskDataType = Partial<taskPutRequestBodyType>;

export type TasksListType = {
  [key: string]: Array<TaskType>;
};

export type TasksActionsType =
  | AddTaskActionType
  | RemoveTaskActionType
  | AddListActionType
  | ReturnType<typeof removeListAC>
  | ReturnType<typeof setListsAC>
  | setTasksActionType
  | UpdateTaskDataActionType;

export type LoginActionType = ReturnType<typeof setAuthStateAC>;
