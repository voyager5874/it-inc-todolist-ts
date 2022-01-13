import {TasksListType} from "../App";
import {addTaskAC, removeTaskAC, tasksActionsReducer} from "./tasksActionsReducer";
import {v1} from "uuid";


test('correct task from correct array deleted', () => {
    const listID1 = v1()
    const listID2 = v1()

    const startState: TasksListType = {
        [listID1]: [
            {id: "1", title: "CSS", isDone: true},
            {id: "2", title: "JS", isDone: false},
            {id: "3", title: "React", isDone: false}
        ],
        [listID2]: [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }
    const action = removeTaskAC(listID2, "2")
    const endState = tasksActionsReducer(startState, action)

    expect(endState[listID1].length).toBe(3)
    expect(endState[listID2].length).toBe(2)
    expect(endState[listID2].every(item => item.id !== "2")).toBeTruthy()


})

test("task with given name added to correct list", () => {
    const listID1 = v1()
    const listID2 = v1()

    const startState: TasksListType = {
        [listID1]: [
            {id: "1", title: "CSS", isDone: true},
            {id: "2", title: "JS", isDone: false},
            {id: "3", title: "React", isDone: false}
        ],
        [listID2]: [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }
    const action = addTaskAC(listID2, "juice")
    const endState = tasksActionsReducer(startState, action)

    expect(endState[listID1].length).toBe(3)
    expect(endState[listID2].length).toBe(4)
})