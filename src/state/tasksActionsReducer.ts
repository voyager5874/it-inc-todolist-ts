import {v1} from "uuid";
import {TasksListType} from "../App";


export const tasksActionsReducer = (state: TasksListType, action: TasksActionsType): TasksListType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.listID]: [...state[action.payload.listID], {
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }]
            }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.listID]: state[action.payload.listID].filter(task => task.id !== action.payload.taskID)
            }
        case 'CHANGE-STATUS':
            return {
                ...state,
                [action.payload.listID]: state[action.payload.listID].map(task => task.id === action.payload.taskID ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)
            }
        case 'NEW-ENTRY':
            return {...state, [action.payload.listID]: []}

        case 'DELETE-ENTRY': {
            debugger
            const stateCopy = {...state}
            delete stateCopy[action.payload.listID]
            return stateCopy
        }

        case 'CHANGE-NAME':
            return {
                ...state,
                [action.payload.listID]: state[action.payload.listID].map(task => task.id === action.payload.taskID ? {
                    ...task,
                    title: action.payload.newName
                } : task)
            }
        default:
            return state
    }

}

type TasksActionsType =
    AddTaskActionType
    | RemoveTaskActionType
    | CreateNewEntryActionType
    | ChangeTaskStatusActionType
    | ChangeTaskNameActionType
    | RemoveEntryActionType

type AddTaskActionType = ReturnType<typeof addTaskAC>

export const addTaskAC = (listID: string, title: string) => {
    //preparation code
    return {
        type: 'ADD-TASK',
        payload: {
            title: title,
            listID: listID
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
            taskID: taskID
        }
    } as const
}

type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (listID: string, taskID: string, newStatus: boolean) => {
    //preparation code
    return {
        type: 'CHANGE-STATUS',
        payload: {
            listID: listID,
            taskID: taskID,
            isDone: newStatus
        }
    } as const
}


type ChangeTaskNameActionType = ReturnType<typeof changeTaskNameAC>

export const changeTaskNameAC = (listID: string, taskID: string, newName: string) => {
    //preparation code
    return {
        type: 'CHANGE-NAME',
        payload: {
            listID,
            taskID,
            newName
        }
    } as const
}


type CreateNewEntryActionType = ReturnType<typeof createNewEntryAC>

export const createNewEntryAC = (listID: string) => {
    //preparation code
    return {
        type: 'NEW-ENTRY',
        payload: {
            listID: listID
        }
    } as const
}

type RemoveEntryActionType = ReturnType<typeof removeEntryAC>

export const removeEntryAC = (listID: string) => {
    //preparation code
    return {
        type: 'DELETE-ENTRY',
        payload: {
            listID: listID
        }
    } as const
}