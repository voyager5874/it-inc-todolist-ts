import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTaskAC,
    changeTaskStatusAC,
    createNewEntryAC,
    removeTaskAC,
    tasksActionsReducer
} from "./state/tasksActionsReducer";
import {addListAC, changeFilterAC, listsActionsReducer, removeListAC} from "./state/listsActionsReducer";

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

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, listsActionsDispatch] = useReducer(listsActionsReducer, [
        {id: todolistID1, title: "What  to learn", activeFilter: 'all'},
        {id: todolistID2, title: "What  to buy", activeFilter: 'all'}
    ])

    const [tasks, tasksActionsDispatch] = useReducer(tasksActionsReducer, {
            [todolistID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS/TS", isDone: true},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Redux", isDone: false}
            ],
            [todolistID2]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS/TS", isDone: true},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Redux", isDone: false}
            ]
        }
    )

    const changeFilter = (todolistID: string, newFilterValue: TasksFilterType) => {
        // setTodolists(todolists.map(list => list.id === todolistID ? {...list, activeFilter: newFilterValue} : list))
        listsActionsDispatch(changeFilterAC(todolistID, newFilterValue))
    }

    const changeTaskStatus = (todolistID: string, taskID: string, newStatus: boolean) => {
        // setTasks({
        //     ...tasks,
        //     [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, isDone: newStatus} : task)
        // })
        tasksActionsDispatch(changeTaskStatusAC(todolistID, taskID, newStatus))
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
        // setTasks({...tasks, [todolistID]: [{id: v1(), title: name, isDone: false}, ...tasks[todolistID]]}) //вроде это не изменение стейта напрямую - создание нового объекта на месте
        tasksActionsDispatch(addTaskAC(todolistID, name))
    }
    const removeTask = (todolistID: string, taskID: string) => {
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== taskID)})
        tasksActionsDispatch(removeTaskAC(todolistID, taskID))
    }
    const addTodolist = (listName: string) => {
        if (listName) {
            let newID = v1()
            //     const newTodolist: TodolistType = {id: v1(), title: listName, activeFilter: 'all'}
            //     setTodolists([...todolists, newTodolist])
            //     setTasks({...tasks, [newTodolist.id]: []})
            tasksActionsDispatch(createNewEntryAC(newID))
            listsActionsDispatch(addListAC(listName, newID))
            // tasksActionsDispatch(createNewEntryAC(newID))
        }
    }
    const deleteTodoList = (todolistID: string) => {
        // setTodolists(todolists.filter(list => list.id !== todolistID))
        listsActionsDispatch(removeListAC(todolistID))
    }
    const changeTaskName = (todolistID: string, taskID: string, newName: string) => {
        // setTasks({
        //     ...tasks,
        //     [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, title: newName} : task)
        // })
    }
    const changeListName = (todolistID: string, newName: string) => {
        // setTodolists(todolists.map(list => list.id === todolistID ? {...list, title: newName} : list))
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
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItemCallback={(listName) => addTodolist(listName)}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(list => {
                            let taskToShow = getFilteredTasks(list)
                            return (
                                <Grid item>
                                    <Paper key={list.id} style={{padding: "20px"}} elevation={10}>
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
