import React, { memo, useCallback } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useDispatch } from 'react-redux';

import { addListTC, TodoListInAppType } from '../state/reducers/listsActionsReducer';
import { useAppSelector } from '../state/store';

import { AddItemForm } from './AddItemForm';
import { Todolist } from './Todolist';

type AllTodoListsPropsType = {
  demo?: boolean;
};

export const AllTodoLists = memo(({ demo = false }: AllTodoListsPropsType) => {
  // const todolists = useSelector<RootStateType, TodoListInAppType[]>(state => state.lists);
  const todolists = useAppSelector<TodoListInAppType[]>(state => state.lists);

  const dispatch = useDispatch();

  const addTodolist = useCallback(
    (listName: string) => {
      if (listName) {
        dispatch(addListTC(listName));
      }
    },
    [dispatch],
  );

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
