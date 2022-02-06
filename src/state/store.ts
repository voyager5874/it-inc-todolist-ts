import {tasksActionsReducer} from "./tasksActionsReducer";
import {listsActionsReducer} from "./listsActionsReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksActionsReducer,
    lists: listsActionsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store