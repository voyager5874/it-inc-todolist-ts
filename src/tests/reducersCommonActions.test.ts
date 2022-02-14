import {addListAC, listsActionsReducer, TodoListInAppType} from "../state/listsActionsReducer";
import {tasksActionsReducer, TasksListType} from "../state/tasksActionsReducer";
import {TodoListOnServerType} from "../api/it-inc-api";


test('ids should be equal', () => {

    const startTasksState: TasksListType = {};
    const startTodolistsState: TodoListInAppType[] = [];
    const newTodolist: TodoListOnServerType= {id:'id_addListAC_test', title: 'test addListAC',order: 0, addedDate: ''}
    const action = addListAC(newTodolist);
    const endTasksState = tasksActionsReducer(startTasksState, action);
    const endTodolistsState = listsActionsReducer(startTodolistsState, action);
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
    expect(idFromTasks).toBe('id_addListAC_test');
    expect(idFromTodolists).toBe('id_addListAC_test');
});