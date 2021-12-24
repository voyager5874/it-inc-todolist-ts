import {TasksFilterType, TodolistType} from "../App";
import {v1} from "uuid";


export const listsActionsReducer = (state: Array<TodolistType>, action: ListsActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'ADD-LIST':
            return [...state, {id: action.payload.listID, title: action.payload.name, activeFilter: 'all'}]
        case 'REMOVE-LIST':
            return state.filter(list => list.id !== action.payload.listID)
        case 'CHANGE-FILTER':
            return state.map(list => list.id === action.payload.listID ? {
                ...list,
                activeFilter: action.payload.activeFilter
            } : list)
        default:
            return state
    }

};

type ListsActionsType = AddListActionType | RemoveListActionType | ChangeFilterActionType

type RemoveListActionType = ReturnType<typeof removeListAC>
export const removeListAC = (listID: string) => {
    return {
        type: 'REMOVE-LIST',
        payload: {
            listID: listID
        }
    } as const
}

type AddListActionType = ReturnType<typeof addListAC>
export const addListAC = (name: string, listID: string) => {
    return {
        type: 'ADD-LIST',
        payload: {
            name: name,
            listID: listID
        }
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