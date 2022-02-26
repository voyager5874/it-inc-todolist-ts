import React, { memo, useCallback, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AddItemForm } from './AddItemForm';
import { Todolist } from './Todolist';

import { TodoListInAppType } from 'state/actions/types';
import { addListTC, fetchListsTC } from 'state/middlewares/lists';
import { getAuthState } from 'state/selectors';
import { useAppSelector } from 'state/store';

type AllTodoListsPropsType = {
  demo?: boolean;
};

export const AllTodoLists = memo(({ demo = false }: AllTodoListsPropsType) => {
  // const todolists = useSelector<RootStateType, TodoListInAppType[]>(state => state.lists);
  const todolists = useAppSelector<TodoListInAppType[]>(state => state.lists);
  const userIsLoggedIn = useSelector(getAuthState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (demo || !userIsLoggedIn) return;
    dispatch(fetchListsTC());
  }, []);

  const addTodolist = useCallback(
    (listName: string) => {
      if (listName) {
        dispatch(addListTC(listName));
      }
    },
    [dispatch],
  );
  if (!userIsLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  return (
    <>
      <Grid container style={{ paddingTop: '20px' }}>
        <AddItemForm addItemCallback={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(list => (
          <Grid item key={list.id}>
            <Paper style={{ padding: '20px' }} elevation={10}>
              <Todolist
                demo={demo}
                listStatus={list.entityStatus}
                todolistID={list.id}
                title={list.title}
                activeFilter={list.activeFilter}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
});
