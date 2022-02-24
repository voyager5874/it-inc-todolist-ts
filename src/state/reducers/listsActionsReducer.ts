import { Dispatch } from 'redux';

import { appDataAPI } from 'api';
import { ServerResultCodes, TodoListOnServerType } from 'api/types';
import { setAppStatusAC } from 'state/actions/app';
import { AppReducerActionsType, EntityStatusType } from 'state/actions/types';
import {
  handleReject,
  handleResolveWithServerErrorMessage,
} from 'utils/handleBackendResponseErrors';

export type TasksFilterType = 'all' | 'completed' | 'active';

export type TodoListInAppType = TodoListOnServerType & {
  activeFilter: TasksFilterType;
  entityStatus: EntityStatusType;
};

const initialState: Array<TodoListInAppType> = [];

export const listsActionsReducer = (
  state: Array<TodoListInAppType> = initialState,
  action: ListsActionsType,
): Array<TodoListInAppType> => {
  switch (action.type) {
    case 'ADD-LIST': {
      const newInAppList: TodoListInAppType = {
        ...action.payload.todoList,
        activeFilter: 'all',
        entityStatus: 'idle',
      };
      return [newInAppList, ...state];
    }
    case 'REMOVE-LIST':
      return state.filter(list => list.id !== action.payload.listID);
    case 'CHANGE-FILTER':
      return state.map(list =>
        list.id === action.payload.listID
          ? {
              ...list,
              activeFilter: action.payload.activeFilter,
            }
          : list,
      );
    case 'CHANGE-LIST-NAME':
      return state.map(list =>
        list.id === action.payload.listID
          ? {
              ...list,
              title: action.payload.newName,
            }
          : list,
      );
    case 'SET-LISTS':
      return action.payload.lists.map(list => ({
        ...list,
        activeFilter: 'all',
        entityStatus: 'idle',
      }));
    case 'SET-LIST-STATUS':
      return state.map(list =>
        list.id === action.payload.listID
          ? {
              ...list,
              entityStatus: action.payload.entityStatus,
            }
          : list,
      );
    default:
      return state;
  }
};

type ListsActionsType =
  | ReturnType<typeof addListAC>
  | ReturnType<typeof removeListAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof changeListNameAC>
  | ReturnType<typeof setListsAC>
  | ReturnType<typeof setListStatusAC>
  | AppReducerActionsType;

export type RemoveListActionType = ReturnType<typeof removeListAC>;
export const removeListAC = (listID: string) =>
  ({
    type: 'REMOVE-LIST',
    payload: {
      listID,
    },
  } as const);

export type AddListActionType = ReturnType<typeof addListAC>;
export const addListAC = (todoList: TodoListOnServerType) =>
  ({
    type: 'ADD-LIST',
    payload: {
      todoList,
    },
  } as const);

// type ChangeFilterActionType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (listID: string, filter: TasksFilterType) =>
  ({
    type: 'CHANGE-FILTER',
    payload: {
      listID,
      activeFilter: filter,
    },
  } as const);

// type ChangeListNameActionType = ReturnType<typeof changeListNameAC>
export const changeListNameAC = (listID: string, newName: string) =>
  ({
    type: 'CHANGE-LIST-NAME',
    payload: {
      listID,
      newName,
    },
  } as const);

export type setListsActionType = ReturnType<typeof setListsAC>;
export const setListsAC = (lists: Array<TodoListOnServerType>) =>
  ({
    type: 'SET-LISTS',
    payload: {
      lists,
    },
  } as const);

export type setListStatusActionType = ReturnType<typeof setListStatusAC>;
export const setListStatusAC = (listID: string, newStatus: EntityStatusType) =>
  ({
    type: 'SET-LIST-STATUS',
    payload: {
      listID,
      entityStatus: newStatus,
    },
  } as const);

export const fetchListsTC = () => (dispatch: Dispatch<ListsActionsType>) => {
  dispatch(setAppStatusAC('loading'));
  appDataAPI
    .getTodoLists()
    .then(response => {
      dispatch(setListsAC(response.data));
      dispatch(setAppStatusAC('succeeded'));
    })
    .catch(error => {
      handleReject(error, dispatch);
    });
};

export const removeListTC =
  (listID: string) => (dispatch: Dispatch<ListsActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(setListStatusAC(listID, 'loading'));
    appDataAPI
      .deleteTodoList(listID)
      .then(response => {
        if (response.data.resultCode === ServerResultCodes.success) {
          dispatch(removeListAC(listID));
          dispatch(setAppStatusAC('succeeded'));
          dispatch(setListStatusAC(listID, 'idle'));
        } else {
          handleResolveWithServerErrorMessage(response.data, dispatch);
        }
      })
      .catch(error => {
        handleReject(error, dispatch);
      });
  };

export const addListTC = (name: string) => (dispatch: Dispatch<ListsActionsType>) => {
  dispatch(setAppStatusAC('loading'));
  appDataAPI
    .createTodoList(name)
    .then(response => {
      if (response.data.resultCode === ServerResultCodes.success) {
        dispatch(addListAC(response.data.data.item));
        dispatch(setAppStatusAC('succeeded'));
      } else {
        handleResolveWithServerErrorMessage<{ item: TodoListOnServerType }>(
          response.data,
          dispatch,
        );
      }
    })
    .catch(error => {
      handleReject(error, dispatch);
    });
};

export const changeListNameTC =
  (listID: string, newName: string) => (dispatch: Dispatch<ListsActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(setListStatusAC(listID, 'loading'));
    appDataAPI
      .updateTodoList(listID, newName)
      .then(response => {
        if (response.data.resultCode === ServerResultCodes.success) {
          dispatch(changeListNameAC(listID, newName));
          dispatch(setAppStatusAC('succeeded'));
          dispatch(setListStatusAC(listID, 'idle'));
        } else {
          handleResolveWithServerErrorMessage(response.data, dispatch);
        }
      })
      .catch(error => {
        handleReject(error, dispatch);
      });
  };
