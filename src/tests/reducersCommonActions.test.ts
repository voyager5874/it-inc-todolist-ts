import { TaskPriority, TaskStatus, TaskType, TodoListOnServerType } from 'api/types';
import { TasksListType, TodoListInAppType } from 'state/actions/types';
import { addListAC, listsActionsReducer } from 'state/reducers/listsActionsReducer';
import { addTaskAC, tasksActionsReducer } from 'state/reducers/tasksActionsReducer';

test('after new todo list created, addTaskAC should work properly', () => {
  const FIRST_ITEM_INDEX = 0;

  const startTasksState: TasksListType = {};
  const startTodolistsState: TodoListInAppType[] = [];

  const newTodolist: TodoListOnServerType = {
    id: 'id_addListAC_test',
    title: 'test addListAC',
    order: 0,
    addedDate: '',
  };

  const newTask: TaskType = {
    id: '999',
    title: 'newTask',
    status: TaskStatus.New,
    order: 0,
    description: 'newTask for test addTaskAC',
    addedDate: '',
    deadline: '',
    startDate: '',
    todoListId: 'id_addListAC_test',
    priority: TaskPriority.Someday,
  };

  const listsAction = addListAC(newTodolist);
  const tasksAction = addListAC(newTodolist);
  // const tasksAction = addTaskAC('id_addListAC_test', newTask);
  const endTodolistsState = listsActionsReducer(startTodolistsState, listsAction);
  const endTasksState = tasksActionsReducer(startTasksState, tasksAction);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[FIRST_ITEM_INDEX];
  const idFromTodolists = endTodolistsState[FIRST_ITEM_INDEX].id;
  expect(idFromTasks).toBe('id_addListAC_test');
  expect(idFromTodolists).toBe('id_addListAC_test');
});
