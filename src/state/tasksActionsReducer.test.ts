import {TasksListType} from "../App";
import {addTaskAC, removeTaskAC, tasksActionsReducer} from "./tasksActionsReducer";
import {v1} from "uuid";
import {removeListAC} from "./listsActionsReducer";

let startState: TasksListType = {};
let listID1: string = v1();
let listID2: string = v1();

beforeEach(() => {
    startState = {
        [listID1]: [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        [listID2]: [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false},
        ],
    }
})


test('correct task from correct array deleted', () => {
    const action = removeTaskAC(listID2, "2");
    const endState = tasksActionsReducer(startState, action);
    expect(endState[listID1].length).toBe(3);
    expect(endState[listID2].length).toBe(2);
    expect(endState[listID2].every(item => item.id !== "2")).toBeTruthy();
});

test("task with given name added to correct list", () => {
    const action = addTaskAC(listID2, "juice");
    const endState = tasksActionsReducer(startState, action);
    expect(endState[listID1].length).toBe(3);
    expect(endState[listID2].length).toBe(4);
});

test('property with given todolistId should be deleted', () => {
    const action = removeListAC(listID2);
    const endState = tasksActionsReducer(startState, action);
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState[listID2]).toBeUndefined();
});