import { Dispatch } from 'redux';

import { appDataAPI } from '../../api/appDataAPI';
import { ServerResultCodes, taskPutRequestBodyType, TaskType } from '../../api/types';
import {
  handleReject,
  handleResolveWithServerErrorMessage,
} from '../../utils/backendErrorHandler';

import { setAppErrorAC, setAppStatusAC } from './appReducer';
import {
  AddListActionType,
  RemoveListActionType,
  setListsActionType,
} from './listsActionsReducer';
import { RootStateType } from '../store';

const initialState: TasksListType = {};

export type TasksListType = {
  [key: string]: Array<TaskType>;
};

export const tasksActionsReducer = (
  state: TasksListType = initialState,
  action: TasksActionsType,
): TasksListType => {
  switch (action.type) {
    case 'ADD-TASK':
      // action.payload.task.todoListId - where should I get the value ?
      // new task always on top after app reload - is it server determined?
      return {
        ...state,
        [action.payload.listID]: [action.payload.task, ...state[action.payload.listID]],
      };

    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payload.listID]: state[action.payload.listID].filter(
          task => task.id !== action.payload.taskID,
        ),
      };

    case 'UPDATE-TASK-DATA':
      return {
        ...state,
        [action.payload.listID]: state[action.payload.listID].map(task =>
          task.id === action.payload.taskID
            ? { ...task, ...action.payload.newData }
            : task,
        ),
      };

    // case 'ADD-LIST':
    //     return {...state, [action.payload.todoList.id]: []}

    case 'REMOVE-LIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.payload.listID];
      return stateCopy;
    }
    // I've used (tasks || []).map... expression in Todolist JSX, so there's no need in setting empty arrays in this reducer
    // case "SET-LISTS":
    //     const stateCopy = {...state}
    //     action.payload.lists.forEach(list => {
    //         stateCopy[list.id] = []
    //     })
    //     return stateCopy

    case 'SET-TASKS':
      return { ...state, [action.payload.todoListID]: action.payload.tasks };
    default:
      return state;
  }
};

type TasksActionsType =
  | AddTaskActionType
  | RemoveTaskActionType
  | AddListActionType
  | RemoveListActionType
  | setListsActionType
  | setTasksActionType
  | UpdateTaskDataActionType;

type AddTaskActionType = ReturnType<typeof addTaskAC>;

export const addTaskAC = (listID: string, task: TaskType) =>
  ({
    type: 'ADD-TASK',
    payload: {
      listID,
      task,
    },
  } as const);

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

export const removeTaskAC = (listID: string, taskID: string) =>
  ({
    type: 'REMOVE-TASK',
    payload: {
      listID,
      taskID,
    },
  } as const);

type UpdateTaskDataActionType = ReturnType<typeof updateTaskDataAC>;

export const updateTaskDataAC = (
  listID: string,
  taskID: string,
  newData: UpdateTaskDataType,
) =>
  ({
    type: 'UPDATE-TASK-DATA',
    payload: {
      listID,
      taskID,
      newData,
    },
  } as const);

type setTasksActionType = ReturnType<typeof setTasksAC>;

export const setTasksAC = (todoListID: string, tasks: Array<TaskType>) =>
  ({
    type: 'SET-TASKS',
    payload: {
      todoListID,
      tasks,
    },
  } as const);

export const fetchTasksTC = (todoListID: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  appDataAPI
    .getTasks(todoListID)
    .then(response => {
      dispatch(setTasksAC(todoListID, response.data.items));
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch(error => {
      handleReject(error, dispatch);
    });
};

export const removeTaskTC = (listID: string, taskID: string) => (dispatch: Dispatch) => {
  appDataAPI
    .deleteTask(listID, taskID)
    .then(response => {
      dispatch(removeTaskAC(listID, taskID));
    })
    .catch(error => {
      handleReject(error, dispatch);
    });
};

export const addTaskTC = (listID: string, taskName: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'));
  appDataAPI
    .createTask(listID, taskName)
    .then(response => {
      if (response.data.resultCode === ServerResultCodes.success) {
        dispatch(addTaskAC(listID, response.data.data.item));
        dispatch(setAppStatusAC('succeeded'));
      } else {
        handleResolveWithServerErrorMessage<{ item: TaskType }>(response.data, dispatch);
      }
    })
    .catch(error => {
      handleReject(error, dispatch);
    });
};

// export type UpdateTaskDataType = {
//     title?: string
//     description?: string
//     status?: TaskStatus
//     priority?: TaskPriority
//     startDate?: string
//     deadline?: string
// }
// "partial" makes all properties optional, so we get the same result as UpdateTaskDataType above
// no need to create one more data type
type UpdateTaskDataType = Partial<taskPutRequestBodyType>;

export const updateTaskTC =
  (listID: string, taskID: string, newTaskData: UpdateTaskDataType) =>
  (dispatch: Dispatch, getState: () => RootStateType) => {
    const currentState = getState();
    const taskToBeChanged = currentState.tasks[listID].find(task => task.id === taskID);

    if (!taskToBeChanged) {
      console.warn(`task with id ${taskID} not found in todo list ${listID}`);
      return;
    }

    const requestPayload: taskPutRequestBodyType = {
      deadline: taskToBeChanged.deadline,
      description: taskToBeChanged.description,
      priority: taskToBeChanged.priority,
      startDate: taskToBeChanged.startDate,
      status: taskToBeChanged.status,
      title: taskToBeChanged.title,
      ...newTaskData,
    };

    // type TodoPreview = Omit<Todo, "addedDate">;
    // type TodoPreview = Pick<TaskType, "deadline" | "description" | "priority" | "startDate" | "status"  |"title">
    // is there a way to "filter" task properties and create object for put request body automatically?
    // let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    // debugger

    appDataAPI
      .updateTask(listID, taskID, requestPayload)
      .then(response => {
        if (response.data.resultCode === ServerResultCodes.success) {
          dispatch(updateTaskDataAC(listID, taskID, newTaskData));
        } else {
          handleResolveWithServerErrorMessage(response.data, dispatch);
        }
      })
      .catch(error => {
        dispatch(setAppErrorAC(error.message));
      });
  };
