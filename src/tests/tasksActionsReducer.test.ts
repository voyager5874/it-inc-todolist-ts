import { v1 } from 'uuid';

import { TaskPriority, TaskStatus } from 'api/types';
import { TasksListType } from 'state/actions/types';
import { setTasksAC } from 'state/middlewares/tasks';
import { removeListAC } from 'state/reducers/listsActionsReducer';
import {
  addTaskAC,
  removeTaskAC,
  tasksActionsReducer,
} from 'state/reducers/tasksActionsReducer';

let startState: TasksListType = {};
const listID1: string = v1();
const listID2: string = v1();

beforeEach(() => {
  startState = {
    [listID1]: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        order: 0,
        description: 'description',
        addedDate: '',
        deadline: '',
        startDate: '',
        todoListId: listID1,
        priority: TaskPriority.Someday,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        addedDate: '',
        order: 0,
        deadline: '',
        description: '',
        priority: TaskPriority.Someday,
        startDate: '',
        todoListId: listID1,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        addedDate: '',
        order: 0,
        deadline: '',
        description: '',
        priority: TaskPriority.Someday,
        startDate: '',
        todoListId: listID1,
      },
    ],
    [listID2]: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatus.New,
        addedDate: '',
        order: 0,
        deadline: '',
        description: '',
        priority: TaskPriority.Someday,
        startDate: '',
        todoListId: listID2,
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatus.Completed,
        addedDate: '',
        order: 0,
        deadline: '',
        description: '',
        priority: TaskPriority.Someday,
        startDate: '',
        todoListId: listID2,
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatus.New,
        addedDate: '',
        order: 0,
        deadline: '',
        description: '',
        priority: TaskPriority.Someday,
        startDate: '',
        todoListId: listID2,
      },
    ],
  };
});

test('correct task from correct array deleted', () => {
  const action = removeTaskAC(listID2, '2');
  const endState = tasksActionsReducer(startState, action);
  expect(endState[listID1].length).toBe(3);
  expect(endState[listID2].length).toBe(2);
  expect(endState[listID2].every(item => item.id !== '2')).toBeTruthy();
});

test('task with given name added to correct list', () => {
  const newTask = {
    id: '999',
    title: 'newTask',
    status: TaskStatus.New,
    order: 0,
    description: 'newTask for test addTaskAC',
    addedDate: '',
    deadline: '',
    startDate: '',
    todoListId: listID2,
    priority: TaskPriority.Someday,
  };
  const action = addTaskAC(listID2, newTask);
  const endState = tasksActionsReducer(startState, action);
  expect(endState[listID1].length).toBe(3);
  expect(endState[listID2].length).toBe(4);
});

test('property with given todolistId should be deleted', () => {
  const action = removeListAC(listID2);
  const endState = tasksActionsReducer(startState, action);
  const keys = Object.keys(endState);
  expect(keys.length).toBe(1);
  expect(endState[listID2]).toBeUndefined();
});
// fixed in the component Todolist => empty array will be mapped if there are no tasks for the list

// test('empty array should be added for each todo list', () => {
//   const action = setListsAC([
//     { id: 'todolistId1', title: 'What to learn', order: 0, addedDate: '' },
//     { id: 'todolistId2', title: 'What to buy', order: 0, addedDate: '' },
//   ]);
//   const endState = tasksActionsReducer({}, action);
//   const keys = Object.keys(endState);
//   expect(keys.length).toBe(2);
//   expect(endState.todolistId1).toStrictEqual([]);
//   expect(endState.todolistId2).toStrictEqual([]);
// });

test('tasks should be added for determined list', () => {
  const action = setTasksAC(listID1, startState[listID1]);
  const endState = tasksActionsReducer({ [listID1]: [], [listID2]: [] }, action);
  expect(endState[listID1].length).toBe(3);
  expect(endState[listID2].length).toBe(0);
});
