import {v1} from "uuid";
import {AddListActionType, RemoveListActionType, todolistID1, todolistID2} from "./listsActionsReducer";
import {TaskPriority, TaskStatus, TaskType} from "../api/it-inc-api";


let initialState: TasksListType = {}

export type TasksListType = {
    [key: string]: Array<TaskType>
}

// let initialState: TasksListType = {
//     [todolistID1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS/TS", isDone: true},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false},
//     ],
//     [todolistID2]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS/TS", isDone: true},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false},
//     ]
// }

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
