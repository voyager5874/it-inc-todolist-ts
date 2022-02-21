import React, {ReactNode} from "react"
import {Provider} from "react-redux";
import {RootStateType} from "../../state/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {listsActionsReducer} from "../../state/listsActionsReducer";
import {tasksActionsReducer} from "../../state/tasksActionsReducer";
import {TaskPriority, TaskStatus} from "../../api/it-inc-api";
import {appReducer} from "../../state/appReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksActionsReducer,
    lists: listsActionsReducer,
    app: appReducer,
})

const initialGlobalState: RootStateType = {
    lists: [
        {id: "todolistId1", title: "What to learn", activeFilter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", activeFilter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatus.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low
            },
            {
                id: v1(), title: "JS", status: TaskStatus.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low
            },
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatus.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low
            },
            {
                id: v1(), title: "React Book", status: TaskStatus.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low
            },
        ]
    },
    app: {
        appStatus: 'idle',
        error: null,
        isInitialized: false,
    },
    auth:{
        isLoggedIn: false,
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}