import {AddListActionType, RemoveListActionType, setListsActionType} from "./listsActionsReducer";
import {backendAPI, TaskPriority, TaskStatus, TaskType, putRequestBodyType} from "../api/it-inc-api";
import {Dispatch} from "redux";
import {RootStateType} from "./store";


let initialState: TasksListType = {}

export type TasksListType = {
    [key: string]: Array<TaskType>
}


export const tasksActionsReducer = (state: TasksListType = initialState, action: TasksActionsType): TasksListType => {
    switch (action.type) {

        case 'ADD-TASK':
            // action.payload.task.todoListId - where should I get the value ?
            //new task always on top after app reload - is it server determined?
            return {
                ...state,
                [action.payload.listID]: [action.payload.task, ...state[action.payload.listID]]
            }

        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.listID]: state[action.payload.listID].filter(task => task.id !== action.payload.taskID)
            }

        case "UPDATE-TASK-DATA":
            return {...state, [action.payload.listID]: state[action.payload.listID].map(task => task.id === action.payload.taskID ? {...task, ...action.payload.newData} : task)}

        case 'ADD-LIST':
            return {...state, [action.payload.todoList.id]: []}

        case 'REMOVE-LIST': {
            debugger
            const stateCopy = {...state}
            delete stateCopy[action.payload.listID]
            return stateCopy
        }

        case "SET-LISTS":
            const stateCopy = {...state}
            action.payload.lists.forEach(list => {
                stateCopy[list.id] = []
            })
            return stateCopy

        case "SET-TASKS":
            return {...state, [action.payload.todoListID]: action.payload.tasks}
        default:
            return state
    }

}

type TasksActionsType =
    AddTaskActionType
    | RemoveTaskActionType
    | AddListActionType
    | RemoveListActionType
    | setListsActionType
    | setTasksActionType
    | UpdateTaskDataActionType

type AddTaskActionType = ReturnType<typeof addTaskAC>

export const addTaskAC = (listID: string, task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            listID,
            task,
        }
    } as const
}

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (listID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            listID: listID,
            taskID: taskID,
        }
    } as const
}

type UpdateTaskDataActionType = ReturnType<typeof updateTaskDataAC>

export const updateTaskDataAC = (listID: string, taskID: string, newData: UpdateTaskDataType) => {
    return {
        type: 'UPDATE-TASK-DATA',
        payload: {
            listID,
            taskID,
            newData,
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

export const removeTaskTC = (listID: string, taskID: string) => {
    return (dispatch: Dispatch) => {
        backendAPI.deleteTask(listID, taskID)
            .then(response => {
                dispatch(removeTaskAC(listID, taskID))
            })
    }
}

export const addTaskTC = (listID: string, taskName: string) => {
    return (dispatch: Dispatch) => {
        backendAPI.createTask(listID, taskName)
            .then(response => {
                dispatch(addTaskAC(listID, response.data.data.item))
            })
    }
}

export type UpdateTaskDataType = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (listID: string, taskID: string, newTaskData: UpdateTaskDataType) => {

    return (dispatch: Dispatch, getState: () => RootStateType) => {
        const currentState = getState()
        const taskToBeChanged = currentState.tasks[listID].find(task => task.id === taskID)

        if (!taskToBeChanged) {
            console.warn(`task with id ${taskID} not found in todo list ${listID}`)
            return
        }

        const requestPayload: putRequestBodyType = {
            deadline: taskToBeChanged.deadline,
            description: taskToBeChanged.description,
            priority: taskToBeChanged.priority,
            startDate: taskToBeChanged.startDate,
            status: taskToBeChanged.status,
            title: taskToBeChanged.title,
            ...newTaskData,
        }
        backendAPI.updateTask(listID, taskID, requestPayload)
            .then(response => {
                dispatch(updateTaskDataAC(listID, taskID, newTaskData))
            })
    }
}