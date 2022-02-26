import { Dispatch } from 'redux';

import { appDataAPI } from 'api';
import { ServerResultCodes, TodoListOnServerType } from 'api/types';
import { setAppStatusAC } from 'state/actions/app';
import { ListsActionsType } from 'state/actions/types';
import {
  addListAC,
  changeListNameAC,
  removeListAC,
  setListsAC,
  setListStatusAC,
} from 'state/reducers/listsActionsReducer';
import { handleReject, handleResolveWithServerErrorMessage } from 'utils';

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
