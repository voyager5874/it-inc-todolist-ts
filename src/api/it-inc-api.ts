import axios from 'axios'
import {itIncAPI} from "./apiKey";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': itIncAPI
    }
})

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
    id: string
    addedDate: string
    order: number
    title: string
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type BaseResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

type GetTasksResponseType = {
    error: null | string
    items: Array<TaskType>
    totalCount: number
}

export type taskPutRequestBodyType = {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
}


export const backendAPI = {
    updateTodoList(todolistId: string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    createTodoList(name: string) {
        return instance.post<BaseResponseType<{ item: TodoListOnServerType }>>('todo-lists', {title: name})
    },
    getTodoLists() {
        return instance.get<Array<TodoListOnServerType>>('todo-lists')
    },
    createTask(todolistID: string, name: string) {
        return instance.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${todolistID}/tasks`, {title: name})
    },
    getTasks(todolistID: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistID}/tasks`)
    },
    updateTask(todolistID: string, taskID: string, requestPayload: taskPutRequestBodyType) {
        return instance.put<BaseResponseType<{ item: TaskType }>>(`todo-lists/${todolistID}/tasks/${taskID}`, requestPayload)
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<BaseResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`)

    }
}