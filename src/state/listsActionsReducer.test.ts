import {v1} from 'uuid';
import {TasksFilterType, TodolistType} from '../App';
import {addListAC, changeFilterAC, changeListNameAC, listsActionsReducer} from "./listsActionsReducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", activeFilter: "all"},
        {id: todolistId2, title: "What to buy", activeFilter: "all"}
    ]

    const endState = listsActionsReducer(startState, {type: 'REMOVE-LIST', payload: {listID: todolistId1}})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", activeFilter: "all"},
        {id: todolistId2, title: "What to buy", activeFilter: "all"}
    ]

    // const endState = listsActionsReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle})
    const endState = listsActionsReducer(startState, addListAC(newTodolistTitle, v1()))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", activeFilter: "all"},
        {id: todolistId2, title: "What to buy", activeFilter: "all"}
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     id: todolistId2,
    //     title: newTodolistTitle
    // };

    const action = changeListNameAC(todolistId2, newTodolistTitle)

    const endState = listsActionsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: TasksFilterType = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", activeFilter: "all"},
        {id: todolistId2, title: "What to buy", activeFilter: "all"}
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     id: todolistId2,
    //     filter: newFilter
    // };
    
    const action = changeFilterAC(todolistId2, newFilter)

    const endState = listsActionsReducer(startState, action);

    expect(endState[0].activeFilter).toBe("all");
    expect(endState[1].activeFilter).toBe(newFilter);
});

