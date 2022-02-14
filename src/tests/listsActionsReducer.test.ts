import {v1} from 'uuid';
import {
    addListAC,
    changeFilterAC,
    changeListNameAC,
    listsActionsReducer,
    removeListAC, setListsAC, setListStatusAC, TasksFilterType, TodoListInAppType,
} from "../state/listsActionsReducer";
import {TodoListOnServerType} from "../api/it-inc-api";
import {EntityStatusType} from "../state/appReducer";


let startState: TodoListInAppType[] = [];
const todolistId1 = v1();
const todolistId2 = v1();

beforeEach(() => {
    startState = [
        {id: todolistId1, title: "What to learn", activeFilter: "all", order: 0, addedDate:'', entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", activeFilter: "all", order: 0, addedDate:'', entityStatus: 'idle'},
    ]
});

test('correct todolist should be removed', () => {
    let action = removeListAC(todolistId1)
    const endState = listsActionsReducer(startState, action);
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const newTodolist: TodoListOnServerType= {id:todolistId1, title: 'test addListAC',order: 0, addedDate: ''}
    const endState = listsActionsReducer(startState, addListAC(newTodolist));
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('test addListAC');
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";
    const action = changeListNameAC(todolistId2, newTodolistTitle);
    const endState = listsActionsReducer(startState, action);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: TasksFilterType = "completed";
    const action = changeFilterAC(todolistId2, newFilter);
    const endState = listsActionsReducer(startState, action);
    expect(endState[0].activeFilter).toBe("all");
    expect(endState[1].activeFilter).toBe(newFilter);
});

test('received todo lists should be set to the state', () => {

    const action = setListsAC(startState);
    const endState = listsActionsReducer([], action);
    expect(endState.length).toBe(2);
});


test('listStatus of the correct todolist should be changed', () => {
    let newStatus: EntityStatusType = "loading";
    const action = setListStatusAC(todolistId2, newStatus);
    const endState = listsActionsReducer(startState, action);
    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});
