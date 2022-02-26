import { TaskType } from 'api/types';
import { TasksActionsType, TasksListType, UpdateTaskDataType } from 'state/actions/types';

const initialState: TasksListType = {};

export const tasksActionsReducer = (
  state: TasksListType = initialState,
  action: TasksActionsType,
): TasksListType => {
  switch (action.type) {
    case 'ADD-TASK': {
      // action.payload.task.todoListId - where should I get the value ?
      // new task always on top after app reload - is it server determined?
      const newState = {
        ...state,
        [action.payload.listID]: [action.payload.task, ...state[action.payload.listID]],
      };
      return newState;
    }
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

    case 'REMOVE-LIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.payload.listID];
      return stateCopy;
    }
    case 'SET-TASKS':
      return { ...state, [action.payload.todoListID]: action.payload.tasks };

    case 'ADD-LIST':
      return { ...state, [action.payload.todoList.id]: [] };

    case 'SET-LISTS': {
      const stateCopy = { ...state };
      action.payload.lists.forEach(list => {
        stateCopy[list.id] = [];
      });
      return stateCopy;
    }
    default:
      return state;
  }
};

export const addTaskAC = (listID: string, task: TaskType) =>
  ({
    type: 'ADD-TASK',
    payload: {
      listID,
      task,
    },
  } as const);

export const removeTaskAC = (listID: string, taskID: string) =>
  ({
    type: 'REMOVE-TASK',
    payload: {
      listID,
      taskID,
    },
  } as const);

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
