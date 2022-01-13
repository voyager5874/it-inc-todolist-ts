import {v1} from "uuid";
import {TasksListType} from "../App";
import {AddListActionType, RemoveListActionType, todolistID1, todolistID2} from "./listsActionsReducer";


// let initialState: TasksListType = {}

let initialState: TasksListType = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ]
}

export const tasksActionsReducer = (state: TasksListType = initialState, action: TasksActionsType): TasksListType => {
    switch (action.type) {

        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.listID]: [...state[action.payload.listID], {
                    id: v1(),
                    title: action.payload.title,
                    isDone: false,
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
                    isDone: action.payload.isDone
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

export const changeTaskStatusAC = (listID: string, taskID: string, newStatus: boolean) => {
    //preparation code
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            listID: listID,
            taskID: taskID,
            isDone: newStatus,
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
