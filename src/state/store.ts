import {tasksActionsReducer} from "./tasksActionsReducer";
import {listsActionsReducer} from "./listsActionsReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {appReducer} from "../appReducer";

const rootReducer = combineReducers({
    tasks: tasksActionsReducer,
    lists: listsActionsReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store