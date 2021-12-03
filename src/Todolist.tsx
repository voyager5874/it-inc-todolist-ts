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
    removeTask: (id: string) => void
    changeFilter: (filterValue: TaskFilterType) => void
    addTask: (taskName: string) => void
}
export const Todolist = (props: TodolistPropsType) => {
    const [taskName, setTaskName] = useState('')

    const addTaskHandler = () => {
        props.addTask(taskName)
        setTaskName('')
    }
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskName}
                       onChange={inputChangeHandler}
                       onKeyPress={keyPressWithinInputHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task =>
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => removeTaskHandler(task.id)}>X</button>
                        </li>)
                }
            </ul>
            <div>
                <button onClick={() => changeFilterHandler('all')}>All</button>
                <button onClick={() => changeFilterHandler('active')}>Active</button>
                <button onClick={() => changeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}