import { axiosInstance } from './config';
import {
  BaseResponseType,
  GetTasksResponseDataType,
  taskPutRequestBodyType,
  TaskType,
  TodoListOnServerType,
} from './types';

export const appDataAPI = {
  updateTodoList(todolistId: string, title: string) {
    return axiosInstance.put<BaseResponseType>(`todo-lists/${todolistId}`, { title });
  },
  deleteTodoList(todolistId: string) {
    return axiosInstance.delete<BaseResponseType>(`todo-lists/${todolistId}`);
  },
  createTodoList(name: string) {
    return axiosInstance.post<BaseResponseType<{ item: TodoListOnServerType }>>(
      'todo-lists',
      {
        title: name,
      },
    );
  },
  getTodoLists() {
    return axiosInstance.get<Array<TodoListOnServerType>>('todo-lists');
  },
  createTask(todolistID: string, name: string) {
    return axiosInstance.post<BaseResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistID}/tasks`,
      { title: name },
    );
  },
  getTasks(todolistID: string) {
    return axiosInstance.get<GetTasksResponseDataType>(`todo-lists/${todolistID}/tasks`);
  },
  updateTask(todolistID: string, taskID: string, requestPayload: taskPutRequestBodyType) {
    return axiosInstance.put<BaseResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistID}/tasks/${taskID}`,
      requestPayload,
    );
  },
  deleteTask(todolistID: string, taskID: string) {
    return axiosInstance.delete<BaseResponseType>(
      `/todo-lists/${todolistID}/tasks/${taskID}`,
    );
  },
};
