import {addTaskAC, removeTaskAC, tasksActionsReducer, TasksListType} from "./tasksActionsReducer";
import {v1} from "uuid";
import {removeListAC} from "./listsActionsReducer";
import {TaskPriority, TaskStatus} from "../api/it-inc-api";

let startState: TasksListType = {};
let listID1: string = v1();
let listID2: string = v1();

beforeEach(() => {
    startState = {
        [listID1]: [
            {
                id: "1", title: "CSS",  status: TaskStatus.New,
                order: 0, description: 'description', addedDate: '',
                deadline: '', startDate: '', todoListId: listID1,
                priority:TaskPriority.Someday,
            },
            {
                id: "2", title: "JS", status: TaskStatus.Completed,
                addedDate: '', order: 0, deadline: '',
                description: '', priority: TaskPriority.Someday,
                startDate: '', todoListId: listID1,
            },
            {
                id: "3", title: "React", status: TaskStatus.New,
                addedDate: '', order: 0, deadline: '',
                description: '', priority: TaskPriority.Someday,
                startDate: '', todoListId: listID1,
            },
        ],
        [listID2]: [
            {
                id: "1", title: "bread", status: TaskStatus.New,
                addedDate: '', order: 0, deadline: '',
                description: '', priority: TaskPriority.Someday,
                startDate: '', todoListId: listID2,
            },
            {
                id: "2", title: "milk", status: TaskStatus.Completed,
                addedDate: '', order: 0, deadline: '',
                description: '', priority: TaskPriority.Someday,
                startDate: '', todoListId: listID2,
            },
            {
                id: "3", title: "tea", status: TaskStatus.New,
                addedDate: '', order: 0, deadline: '',
                description: '', priority: TaskPriority.Someday,
                startDate: '', todoListId: listID2,
            },
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