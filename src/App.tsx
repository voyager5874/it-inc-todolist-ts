import React from 'react';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskNameAC, changeTaskStatusAC, removeTaskAC} from "./state/tasksActionsReducer";
import {addListAC, changeFilterAC, changeListNameAC, removeListAC} from "./state/listsActionsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";

export type TasksFilterType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string
    title: string
    activeFilter: TasksFilterType
}
export type TasksListType = {
    [key: string]: Array<TaskType>
}

export const App = () => {

    // export const todolistID1 = v1()
    // export const todolistID2 = v1()


    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.lists);
    const tasks = useSelector<RootStateType, TasksListType>(state => state.tasks)
    const dispatch = useDispatch()

    const changeFilter = (todolistID: string, newFilterValue: TasksFilterType) => {
        dispatch(changeFilterAC(todolistID, newFilterValue))
    }
    const changeTaskStatus = (todolistID: string, taskID: string, newStatus: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, newStatus))
    }
    const getFilteredTasks = (todolist: TodolistType) => {
        let filteredTasks = tasks[todolist.id];
        if (todolist.activeFilter === 'active') {
            return filteredTasks.filter(task => !task.isDone)
        }
        if (todolist.activeFilter === 'completed') {
            return filteredTasks.filter(task => task.isDone)
        }
        return filteredTasks
    }
    const addTask = (todolistID: string, name: string) => {
        dispatch(addTaskAC(todolistID, name))
    }
    const removeTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }
    const addTodolist = (listName: string) => {
        if (listName) {
            let action = addListAC(listName)
            dispatch(action)
        }
    }
    const deleteTodoList = (todolistID: string) => {
        let action = removeListAC(todolistID)
        dispatch(action)
    }
    const changeTaskName = (todolistID: string, taskID: string, newName: string) => {
        dispatch(changeTaskNameAC(todolistID, taskID, newName))
    }
    const changeListName = (todolistID: string, newName: string) => {
        dispatch(changeListNameAC(todolistID, newName))
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{paddingTop: "20px"}}>
                    <AddItemForm addItemCallback={(listName) => addTodolist(listName)}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(list => {
                            let taskToShow = getFilteredTasks(list)
                            return (
                                <Grid item key={list.id}>
                                    <Paper style={{padding: "20px"}} elevation={10}>
                                        <Todolist
                                            todolistID={list.id}
                                            title={list.title}
                                            tasks={taskToShow}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            activeFilter={list.activeFilter}
                                            changeTaskName={changeTaskName}
                                            changeListName={changeListName}
                                            deleteTodoList={deleteTodoList}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
        ;
}
