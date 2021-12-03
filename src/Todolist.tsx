import React, {useState} from "react";
import {TaskFilterType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    activeFilter: TaskFilterType
    removeTask: (id: string) => void
    changeFilter: (filterValue: TaskFilterType) => void
    addTask: (taskName: string) => void
    changeTaskStatus: (id: string, newStatus: boolean) => void
}
export const Todolist = (props: TodolistPropsType) => {
    const [taskName, setTaskName] = useState<string>('')
    const [inputError, setInputError] = useState<boolean>(false)

    const addTaskHandler = () => {
        if (taskName.trim()) {
            props.addTask(taskName.trim())
        } else {
            setInputError(true)
        }
        setTaskName('')
    }
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputError(false)
        setTaskName(event.currentTarget.value)
    }

    const keyPressWithinInputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }
    const changeFilterHandler = (filter: TaskFilterType) => {
        props.changeFilter(filter)
    }
    const checkboxClickHandler = (taskID: string, newTaskStatus: boolean) => {
        props.changeTaskStatus(taskID, newTaskStatus)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskName}
                       className={inputError ? "error" : ""}
                       onChange={inputChangeHandler}
                       onKeyPress={keyPressWithinInputHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {inputError && <div className={"error-message"}>Name your task</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task =>
                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={task.isDone}
                                   onChange={(event) => checkboxClickHandler(task.id, event.currentTarget.checked)}/>
                            <span>{task.title}</span>
                            <button onClick={() => removeTaskHandler(task.id)}>X</button>
                        </li>)
                }
            </ul>
            <div>
                <button className={props.activeFilter === "all" ? "active-filter" : ""}
                        onClick={() => changeFilterHandler('all')}>All
                </button>
                <button className={props.activeFilter === "active" ? "active-filter" : ""}
                        onClick={() => changeFilterHandler('active')}>Active
                </button>
                <button className={props.activeFilter === "completed" ? "active-filter" : ""}
                        onClick={() => changeFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    )
}