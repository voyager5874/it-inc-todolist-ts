import React from "react";
import {TaskFilterType} from "./App";
import s from './Todolist.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    changeTaskName: (todolistID: string, taskID: string, newName: string) => void
    changeListName: (todolistID: string, newName: string) => void

}
export const Todolist = (props: TodolistPropsType) => {

    const addTask = (taskName: string) => {
        props.addTask(props.todolistID, taskName)
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

    const changeTaskName = (taskID: string, newName: string) => {
        props.changeTaskName(props.todolistID, taskID, newName)
    }
    const changeListName = (newName: string) => {
        props.changeListName(props.todolistID, newName)

    }


    return (
        <div className={s.todolistWrapper}>
            <h3>
                <EditableSpan itemName={props.title} itemNameChangedCallback={(newName) => changeListName(newName)}/>
                <IconButton onClick={deleteTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItemCallback={(taskName) => addTask(taskName)}/>
            <List>
                {
                    props.tasks.map(task =>
                        <ListItem key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={task.isDone}
                                   onChange={(event) => checkboxClickHandler(props.todolistID, task.id, event.currentTarget.checked)}/>
                            {/*<span>{task.title}</span>*/}
                            <EditableSpan itemName={task.title}
                                          itemNameChangedCallback={(newName) => changeTaskName(task.id, newName)}/>
                            <button onClick={() => removeTaskHandler(props.todolistID, task.id)}>X</button>
                        </ListItem>)
                }
            </List>
            <div>
                <Button variant="contained" color={props.activeFilter === "all" ? "primary" : "default"}
                        onClick={() => changeFilterHandler(props.todolistID, 'all')}>All
                </Button>
                <Button variant="contained" color={props.activeFilter === "active" ? "primary" : "default"}
                        onClick={() => changeFilterHandler(props.todolistID, 'active')}>Active
                </Button>
                <Button variant="contained" color={props.activeFilter === "completed" ? "primary" : "default"}
                        onClick={() => changeFilterHandler(props.todolistID, 'completed')}>Completed
                </Button>
            </div>

        </div>
    )
}