import {tasksActionsReducer} from "./tasksActionsReducer";
import {listsActionsReducer} from "./listsActionsReducer";
import {combineReducers, createStore} from "redux";

const rootReducer = combineReducers({
    tasks: tasksActionsReducer,
    lists: listsActionsReducer,
})

export const store = createStore(rootReducer)
export type RootStateType = ReturnType<typeof rootReducer>