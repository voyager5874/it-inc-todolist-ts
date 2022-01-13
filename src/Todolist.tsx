import React from "react";
import {TasksFilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {Backspace, Delete} from "@material-ui/icons";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {addTaskAC, changeTaskNameAC, changeTaskStatusAC, removeTaskAC} from "./state/tasksActionsReducer";
import {changeFilterAC, changeListNameAC, removeListAC} from "./state/listsActionsReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    todolistID: string
    title: string
    activeFilter: TasksFilterType
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

    const tasks = useSelector<RootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])
    const dispatch = useDispatch()

    const changeTaskStatus = (taskID: string, newStatus: boolean) => {
        dispatch(changeTaskStatusAC(props.todolistID, taskID, newStatus))
    }

    const getFilteredTasks = () => {
        if (props.activeFilter === 'active') {
            return tasks.filter(task => !task.isDone)
        }
        if (props.activeFilter === 'completed') {
            return tasks.filter(task => task.isDone)
        }
        return tasks
    }

    const addTask = (name: string) => {
        dispatch(addTaskAC(props.todolistID, name))
    }

    const removeTask = (taskID: string) => {
        dispatch(removeTaskAC(props.todolistID, taskID))
    }

    const changeFilter = (newFilterValue: TasksFilterType) => {
        dispatch(changeFilterAC(props.todolistID, newFilterValue))
    }

    const deleteTodolist = () => {
        let action = removeListAC(props.todolistID)
        dispatch(action)
    }

    const changeTaskName = (taskID: string, newName: string) => {
        dispatch(changeTaskNameAC(props.todolistID, taskID, newName))
    }

    const changeListName = (newName: string) => {
        dispatch(changeListNameAC(props.todolistID, newName))
    }


    return (
        <TodolistCard>
            <h3>
                <EditableSpan itemName={props.title} itemNameChangedCallback={(newName) => changeListName(newName)}/>
                <IconButton onClick={deleteTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItemCallback={(taskName) => addTask(taskName)}/>
            <List disablePadding>
                {
                    getFilteredTasks().map(task =>
                        <ListItem disableGutters key={task.id}
                                  style={{justifyContent: "space-between"}}
                        >
                            <TaskNameWithCheckboxWrapper>
                                <Checkbox checked={task.isDone}
                                          color={"primary"}
                                          onChange={(event) => changeTaskStatus(task.id, event.currentTarget.checked)}/>
                                <EditableSpan itemName={task.title}
                                              itemNameChangedCallback={(newName) => changeTaskName(task.id, newName)}/>
                            </TaskNameWithCheckboxWrapper>

                            <IconButton size={"small"}
                                // variant={"contained"}
                                        onClick={() => removeTask(task.id)}><Backspace
                                color={"primary"}
                            /></IconButton>
                        </ListItem>)

                }
                {/*< Divider variant="inset" component="li"/>*/}
            </List>
            <FilterButtonsWrapper>
                <Button variant="contained" color={props.activeFilter === "all" ? "primary" : "default"}
                        onClick={() => changeFilter('all')}>All
                </Button>
                <Button variant="contained" color={props.activeFilter === "active" ? "primary" : "default"}
                        onClick={() => changeFilter('active')}>Active
                </Button>
                <Button variant="contained" color={props.activeFilter === "completed" ? "primary" : "default"}
                        onClick={() => changeFilter('completed')}>Completed
                </Button>
            </FilterButtonsWrapper>

        </TodolistCard>
    )
}