import {v1} from "uuid";
import {AddListActionType, RemoveListActionType, setListsActionType} from "./listsActionsReducer";
import {backendAPI, TaskPriority, TaskStatus, TaskType} from "../api/it-inc-api";
import {Dispatch} from "redux";


let initialState: TasksListType = {}

export type TasksListType = {
    [key: string]: Array<TaskType>
}


export const tasksActionsReducer = (state: TasksListType = initialState, action: TasksActionsType): TasksListType => {
    switch (action.type) {

        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.listID]: [...state[action.payload.listID], {
                    id: v1(),
                    title: action.payload.title,
                    status: TaskStatus.New,
                    todoListId: action.payload.listID,
                    priority: TaskPriority.Someday,
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    description: 'description',
                }]
            }

        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.listID]: state[action.payload.listID].filter(task => task.id !== action.payload.taskID)
            }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.listID]: state[action.payload.listID].map(task => task.id === action.payload.taskID ? {
                    ...task,
                    status: action.payload.status
                } : task)
            }

        case 'ADD-LIST':
            return {...state, [action.payload.listID]: []}

        case 'REMOVE-LIST': {
            debugger
            const stateCopy = {...state}
            delete stateCopy[action.payload.listID]
            return stateCopy
        }

        case 'CHANGE-TASK-NAME':
            return {
                ...state,
                [action.payload.listID]: state[action.payload.listID].map(task => task.id === action.payload.taskID ? {
                    ...task,
                    title: action.payload.newName
                } : task)
            }
        case "SET-LISTS":
            const stateCopy = {...state}
            action.payload.lists.forEach(list => {
                stateCopy[list.id] = []
            })
            return stateCopy

        case "SET-TASKS":
            return {...state, [action.payload.todoListID] : action.payload.tasks}
        default:
            return state
    }

}

type TasksActionsType =
    AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskNameActionType
    | AddListActionType
    | RemoveListActionType
    | setListsActionType
    | setTasksActionType

type AddTaskActionType = ReturnType<typeof addTaskAC>

export const addTaskAC = (listID: string, title: string) => {
    //preparation code
    return {
        type: 'ADD-TASK',
        payload: {
            title: title,
            listID: listID,
        }
    } as const
}

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (listID: string, taskID: string) => {
    //preparation code
    return {
        type: 'REMOVE-TASK',
        payload: {
            listID: listID,
            taskID: taskID,
        }
    } as const
}

type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (listID: string, taskID: string, newStatus: TaskStatus) => {
    //preparation code
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            listID: listID,
            taskID: taskID,
            status: newStatus,
        }
    } as const
}


type ChangeTaskNameActionType = ReturnType<typeof changeTaskNameAC>

export const changeTaskNameAC = (listID: string, taskID: string, newName: string) => {
    //preparation code
    return {
        type: 'CHANGE-TASK-NAME',
        payload: {
            listID,
            taskID,
            newName,
        }
    } as const
}

type setTasksActionType = ReturnType<typeof setTasksAC>

export const setTasksAC = (todoListID: string, tasks: Array<TaskType>) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todoListID,
            tasks,
        },
    } as const
}

export const fetchTasksTC = (todoListID: string) => {
    return (dispatch: Dispatch) => {
        backendAPI.getTasks(todoListID)
            .then(response => dispatch(setTasksAC(todoListID, response.data.items)))
    }

}