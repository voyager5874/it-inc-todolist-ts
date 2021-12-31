import React from "react";
import {TasksFilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, Divider, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Backspace} from "@material-ui/icons";
import styled from "styled-components";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    activeFilter: TasksFilterType
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, filterValue: TasksFilterType) => void
    addTask: (todolistID: string, taskName: string) => void
    changeTaskStatus: (todolistID: string, id: string, newStatus: boolean) => void
    deleteTodoList: (todolistID: string) => void
    changeTaskName: (todolistID: string, taskID: string, newName: string) => void
    changeListName: (todolistID: string, newName: string) => void
}

// const StyledListItem = styled(ListItem)`
//
//   display: flex;
//   justify-content: space-between;
//   border: 1px solid blue;
// `

// const StyledListItem = styled(List)`
//   & .MuiListItem-root: {
//   "justify-content: space-between;"
//   }
//
// `


const TodolistCard = styled.div`
  min-width: 300px;
`

const FilterButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 0;
`

const TaskNameWithCheckboxWrapper = styled.div`
  //min-width: 260px;
  //border-bottom: 2px solid gray;
`

export const Todolist = (props: TodolistPropsType) => {

    const addTask = (taskName: string) => {
        props.addTask(props.todolistID, taskName)
    }
    const removeTaskHandler = (todolistID: string, id: string) => {
        props.removeTask(todolistID, id)
    }
    const changeFilterHandler = (todolistID: string, filter: TasksFilterType) => {
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
        <TodolistCard>
            <h3>
                <EditableSpan itemName={props.title} itemNameChangedCallback={(newName) => changeListName(newName)}/>
                <IconButton onClick={deleteTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItemCallback={(taskName) => addTask(taskName)}/>
            <List disablePadding>
                {
                    props.tasks.map(task =>
                        <ListItem disableGutters key={task.id}
                                  style={{justifyContent: "space-between"}}
                        >
                            <TaskNameWithCheckboxWrapper>
                                <Checkbox checked={task.isDone}
                                          color={"primary"}
                                          onChange={(event) => checkboxClickHandler(props.todolistID, task.id, event.currentTarget.checked)}/>
                                <EditableSpan itemName={task.title}
                                              itemNameChangedCallback={(newName) => changeTaskName(task.id, newName)}/>
                            </TaskNameWithCheckboxWrapper>

                            <IconButton size={"small"}
                                // variant={"contained"}
                                        onClick={() => removeTaskHandler(props.todolistID, task.id)}><Backspace
                                color={"primary"}
                            /></IconButton>
                        </ListItem>)

                }
                {/*< Divider variant="inset" component="li"/>*/}
            </List>
            <FilterButtonsWrapper>
                <Button variant="contained" color={props.activeFilter === "all" ? "primary" : "default"}
                        onClick={() => changeFilterHandler(props.todolistID, 'all')}>All
                </Button>
                <Button variant="contained" color={props.activeFilter === "active" ? "primary" : "default"}
                        onClick={() => changeFilterHandler(props.todolistID, 'active')}>Active
                </Button>
                <Button variant="contained" color={props.activeFilter === "completed" ? "primary" : "default"}
                        onClick={() => changeFilterHandler(props.todolistID, 'completed')}>Completed
                </Button>
            </FilterButtonsWrapper>

        </TodolistCard>
    )
}