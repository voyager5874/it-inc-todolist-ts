import React, {useState} from "react";
import {TaskFilterType} from "./App";
import s from './Todolist.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    activeFilter: TaskFilterType
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, filterValue: TaskFilterType) => void
    addTask: (todolistID: string, taskName: string) => void
    changeTaskStatus: (todolistID: string, id: string, newStatus: boolean) => void
    deleteTodoList: (todolistID: string) => void

}
export const Todolist = (props: TodolistPropsType) => {
    const [taskName, setTaskName] = useState<string>('')
    const [inputError, setInputError] = useState<boolean>(false)

    const addTaskHandler = () => {
        if (taskName.trim()) {
            props.addTask(props.todolistID, taskName.trim())
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
    const removeTaskHandler = (todolistID: string, id: string) => {
        props.removeTask(todolistID, id)
    }
    const changeFilterHandler = (todolistID: string, filter: TaskFilterType) => {
        props.changeFilter(todolistID, filter)
    }
    const checkboxClickHandler = (todolistID: string, taskID: string, newTaskStatus: boolean) => {
        props.changeTaskStatus(todolistID, taskID, newTaskStatus)
    }
    const deleteTodolistHandler = () => {
        props.deleteTodoList(props.todolistID)
    }


    return (
        <div className={s.todolistWrapper}>
            <h3>{props.title}</h3>
            <button className={`commonButton deleteButton`} onClick={deleteTodolistHandler}>X</button>
            <div>
                <input value={taskName}
                       className={`${inputError ? "error" : ""} ${s.customInput}`}
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
                                   onChange={(event) => checkboxClickHandler(props.todolistID, task.id, event.currentTarget.checked)}/>
                            <span>{task.title}</span>
                            <button onClick={() => removeTaskHandler(props.todolistID, task.id)}>X</button>
                        </li>)
                }
            </ul>
            <div>
                <button className={props.activeFilter === "all" ? "active-filter" : ""}
                        onClick={() => changeFilterHandler(props.todolistID, 'all')}>All
                </button>
                <button className={props.activeFilter === "active" ? "active-filter" : ""}
                        onClick={() => changeFilterHandler(props.todolistID, 'active')}>Active
                </button>
                <button className={props.activeFilter === "completed" ? "active-filter" : ""}
                        onClick={() => changeFilterHandler(props.todolistID, 'completed')}>Completed
                </button>
            </div>

        </div>
    )
}