import {backendAPI, TodoListOnServerType} from "../api/it-inc-api";
import {Dispatch} from "redux";


export type TasksFilterType = 'all' | 'completed' | 'active'

export type TodoListInAppType = TodoListOnServerType & {
    activeFilter: TasksFilterType
}

let initialState: Array<TodoListInAppType> = []


export const listsActionsReducer = (state: Array<TodoListInAppType> = initialState, action: ListsActionsType): Array<TodoListInAppType> => {
    switch (action.type) {
        case 'ADD-LIST': {
            const newInAppList: TodoListInAppType = {...action.payload.todoList, activeFilter: 'all'}
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
        case "SET-LISTS":
            return action.payload.lists.map(list => ({...list, activeFilter: 'all'}))
        default:
            return state
    }

};

type ListsActionsType =
    AddListActionType
    | RemoveListActionType
    | ChangeFilterActionType
    | ChangeListNameActionType
    | setListsActionType

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

type ChangeFilterActionType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (listID: string, filter: TasksFilterType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            listID: listID,
            activeFilter: filter
        }
    } as const
}

type ChangeListNameActionType = ReturnType<typeof changeListNameAC>
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


export const fetchListsThunk = () => {
    return (dispatch: Dispatch) => {
        backendAPI.getTodoLists()
            .then(response => {
                dispatch(setListsAC(response.data))
            })
    }
}

export const removeListTC = (listID: string) => {
    return (dispatch: Dispatch) => {
        backendAPI.deleteTodoList(listID)
            .then(response=> dispatch(removeListAC(listID)))
    }
}

export const addListTC = (name: string) => {
    return (dispatch: Dispatch) => {
     backendAPI.createTodoList(name)
         .then(response => {
             dispatch(addListAC(response.data.data.item))
         })
    }
}

export const changeListNameTC = (listID: string, newName: string) => {
    return (dispatch: Dispatch) => {
        backendAPI.updateTodoList(listID, newName)
            .then(response => {
                dispatch(changeListNameAC(listID, newName))
            })
    }
}