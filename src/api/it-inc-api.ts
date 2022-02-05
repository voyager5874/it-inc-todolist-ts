import axios from 'axios'
import {EINPROGRESS} from "constants";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'dd744663-c08a-476e-8a84-c072bf5b7a68'
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

export const backendAPI = {
    getTodoLists() {
        return instance.get<Array<TodoListOnServerType>>('todo-lists')
    },
    deleteTodoList(todoListID: string) {
        return instance.delete(`todo-lists/${todoListID}`)
    },
    createTodoList(){

    },
    updateTodoList(){

    },
    getTasks(){

    },
    deleteTask(){

    },
    createTask(){

    },
    updateTask(){

    },

}