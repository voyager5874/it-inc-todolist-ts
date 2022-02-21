import {backendAPI, ServerResultCodes, TodoListOnServerType} from "../api/it-inc-api";
import {Dispatch} from "redux";
import {AppReducerActionsType, EntityStatusType, setAppStatusAC,} from "./appReducer";
import {
    handleReject,
    handleResolveWithServerErrorMessage
} from "../utils/backendErrorHandler";


export type TasksFilterType = 'all' | 'completed' | 'active'

export type TodoListInAppType = TodoListOnServerType & {
    activeFilter: TasksFilterType
    entityStatus: EntityStatusType
}

let initialState: Array<TodoListInAppType> = []


export const listsActionsReducer = (state: Array<TodoListInAppType> = initialState, action: ListsActionsType): Array<TodoListInAppType> => {
    switch (action.type) {
        case 'ADD-LIST': {
            const newInAppList: TodoListInAppType = {
                ...action.payload.todoList,
                activeFilter: 'all',
                entityStatus: 'idle'
            }
            return [newInAppList, ...state]
        }
        case 'REMOVE-LIST':
            return state.filter(list => list.id !== action.payload.listID)
        case 'CHANGE-FILTER':
            return state.map(list => list.id === action.payload.listID ? {
                ...list,
                activeFilter: action.payload.activeFilter
            } : list)
        case 'CHANGE-LIST-NAME':
            return state.map(list => list.id === action.payload.listID ? {
                ...list,
                title: action.payload.newName
            } : list)
        case 'SET-LISTS':
            return action.payload.lists.map(list => ({
                ...list,
                activeFilter: 'all',
                entityStatus: 'idle'
            }))
        case "SET-LIST-STATUS":
            return state.map(list => list.id === action.payload.listID ? {
                ...list,
                entityStatus: action.payload.entityStatus
            } : list)
        default:
            return state
    }

};

type ListsActionsType =
    ReturnType<typeof addListAC>
    | ReturnType<typeof removeListAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeListNameAC>
    | ReturnType<typeof setListsAC>
    | ReturnType<typeof setListStatusAC>
    | AppReducerActionsType

export type RemoveListActionType = ReturnType<typeof removeListAC>
export const removeListAC = (listID: string) => {
    return {
        type: 'REMOVE-LIST',
        payload: {
            listID: listID,
        },
    } as const
}

export type AddListActionType = ReturnType<typeof addListAC>
export const addListAC = (todoList: TodoListOnServerType) => {
    return {
        type: 'ADD-LIST',
        payload: {
            todoList,
        },
    } as const
}

// type ChangeFilterActionType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (listID: string, filter: TasksFilterType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            listID: listID,
            activeFilter: filter
        }
    } as const
}

// type ChangeListNameActionType = ReturnType<typeof changeListNameAC>
export const changeListNameAC = (listID: string, newName: string) => {
    return {
        type: 'CHANGE-LIST-NAME',
        payload: {
            listID,
            newName,
        },
    } as const
}

export type setListsActionType = ReturnType<typeof setListsAC>
export const setListsAC = (lists: Array<TodoListOnServerType>) => {
    return {
        type: 'SET-LISTS',
        payload: {
            lists,
        },
    } as const
}

export type setListStatusActionType = ReturnType<typeof setListStatusAC>
export const setListStatusAC = (listID: string, newStatus: EntityStatusType) => {
    return {
        type: 'SET-LIST-STATUS',
        payload: {
            listID,
            entityStatus: newStatus,
        },
    } as const
}


export const fetchListsTC = () => {
    return (dispatch: Dispatch<ListsActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        backendAPI.getTodoLists()
            .then(response => {
                dispatch(setListsAC(response.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                handleReject(error, dispatch)
            })
    }
}

export const removeListTC = (listID: string) => {
    return (dispatch: Dispatch<ListsActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setListStatusAC(listID, 'loading'))
        backendAPI.deleteTodoList(listID)
            .then(response => {
                if(response.data.resultCode === ServerResultCodes.success){
                    dispatch(removeListAC(listID))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(setListStatusAC(listID, 'idle'))
                } else{
                    handleResolveWithServerErrorMessage(response.data, dispatch)
                }
            })
            .catch(error => {
                handleReject(error, dispatch)
            })
    }
}

export const addListTC = (name: string) => {
    return (dispatch: Dispatch<ListsActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        backendAPI.createTodoList(name)
            .then(response => {
                if(response.data.resultCode === ServerResultCodes.success){
                    dispatch(addListAC(response.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleResolveWithServerErrorMessage<{item: TodoListOnServerType}>(response.data, dispatch)
                }
            })
            .catch(error => {
                handleReject(error, dispatch)
            })
    }
}

export const changeListNameTC = (listID: string, newName: string) => {
    return (dispatch: Dispatch<ListsActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setListStatusAC(listID, 'loading'))
        backendAPI.updateTodoList(listID, newName)
            .then(response => {
                if(response.data.resultCode===ServerResultCodes.success){
                    dispatch(changeListNameAC(listID, newName))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(setListStatusAC(listID, 'idle'))
                } else{
                    handleResolveWithServerErrorMessage(response.data, dispatch)
                }

            })
            .catch(error => {
                handleReject(error, dispatch)
            })
    }
}