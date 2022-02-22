import React, { ReactNode } from 'react';

import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { v1 } from 'uuid';

import { TaskPriority, TaskStatus } from '../../api/types';
import { appReducer } from '../../state/reducers/appReducer';
import { listsActionsReducer } from '../../state/reducers/listsActionsReducer';
import { RootStateType } from '../../state/store';
import { tasksActionsReducer } from '../../state/reducers/tasksActionsReducer';

const rootReducer = combineReducers({
  tasks: tasksActionsReducer,
  lists: listsActionsReducer,
  app: appReducer,
});

const initialGlobalState: RootStateType = {
  lists: [
    {
      id: 'todolistId1',
      title: 'What to learn',
      activeFilter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
    {
      id: 'todolistId2',
      title: 'What to buy',
      activeFilter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
  ],
  tasks: {
    todolistId1: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatus.Completed,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatus.Completed,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
    ],
    todolistId2: [
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatus.Completed,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatus.Completed,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
    ],
  },
  app: {
    appStatus: 'idle',
    error: null,
    isInitialized: false,
  },
  auth: {
    isLoggedIn: false,
  },
};

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState,
  applyMiddleware(thunk),
);

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
);
