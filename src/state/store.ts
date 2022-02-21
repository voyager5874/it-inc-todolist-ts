import {tasksActionsReducer} from "./tasksActionsReducer";
import {listsActionsReducer} from "./listsActionsReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {appReducer} from "./appReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {loginReducer} from "./reducers/loginReducer";

const rootReducer = combineReducers({
    tasks: tasksActionsReducer,
    lists: listsActionsReducer,
    app: appReducer,
    auth: loginReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type RootStateType = ReturnType<typeof rootReducer>
//useSelector which has store RootStateType
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

// @ts-ignore
window.store = store