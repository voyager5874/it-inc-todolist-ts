export enum TaskStatus {
  New,
  InProgress,
  Completed,
  Draft,
}

export enum TaskPriority {
  Low,
  Middle,
  High,
  Urgent,
  Someday,
}

export type TodoListOnServerType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export enum ServerResultCodes {
  success = 0,
  error = 1,
  captcha = 10,
}

export type BaseResponseType<T = {}> = {
  resultCode: ServerResultCodes;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: T;
};

export type GetTasksResponseType = {
  error: null | string;
  items: Array<TaskType>;
  totalCount: number;
};

export type taskPutRequestBodyType = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
};

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
