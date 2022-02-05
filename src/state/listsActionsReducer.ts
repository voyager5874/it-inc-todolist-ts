import {v1} from "uuid";
import {TodoListOnServerType} from "../api/it-inc-api";



export type TasksFilterType = 'all' | 'completed' | 'active';

export type TodoListInAppType = TodoListOnServerType & {
    activeFilter: TasksFilterType
}

let initialState: Array<TodoListInAppType> = []

export const todolistID1 = v1()
export const todolistID2 = v1()
// let initialState: Array<TodolistType> = [
//     {id: todolistID1, title: "What  to learn", activeFilter: 'all'},
//     {id: todolistID2, title: "What  to buy", activeFilter: 'all'},
// ]

export const listsActionsReducer = (state: Array<TodoListInAppType> = initialState, action: ListsActionsType): Array<TodoListInAppType> => {
    switch (action.type) {
        case 'ADD-LIST':
            return [...state, {id: action.payload.listID, title: action.payload.name, activeFilter: 'all', addedDate: '', order: 0}]
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
        default:
            return state
    }

};

type ListsActionsType = AddListActionType | RemoveListActionType | ChangeFilterActionType | ChangeListNameActionType

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
export const addListAC = (name: string) => {
    return {
        type: 'ADD-LIST',
        payload: {
            name: name,
            listID: v1(),
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