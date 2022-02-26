import { Dispatch } from 'redux';

import { appDataAPI } from 'api';
import { ServerResultCodes, taskPutRequestBodyType, TaskType } from 'api/types';
import { setAppErrorAC, setAppStatusAC } from 'state/actions/app';
import { UpdateTaskDataType } from 'state/actions/types';
import {
  addTaskAC,
  removeTaskAC,
  updateTaskDataAC,
} from 'state/reducers/tasksActionsReducer';
import { RootStateType } from 'state/store';
import { handleReject, handleResolveWithServerErrorMessage } from 'utils';

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
