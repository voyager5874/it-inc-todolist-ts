import {TasksListType, TodolistType} from "../App";
import {addListAC, listsActionsReducer} from "./listsActionsReducer";
import {tasksActionsReducer} from "./tasksActionsReducer";


test('ids should be equal', () => {
    const startTasksState: TasksListType = {};
    const startTodolistsState: TodolistType[] = [];
    const action = addListAC("new todolist");
    const endTasksState = tasksActionsReducer(startTasksState, action);
    const endTodolistsState = listsActionsReducer(startTodolistsState, action);
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
    expect(idFromTasks).toBe(action.payload.listID);
    expect(idFromTodolists).toBe(action.payload.listID);
});