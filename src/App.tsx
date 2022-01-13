import React from 'react';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addListAC} from "./state/listsActionsReducer";
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

    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.lists);
    const dispatch = useDispatch()

    const addTodolist = (listName: string) => {
        if (listName) {
            let action = addListAC(listName)
            dispatch(action)
        }
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
                            return (
                                <Grid item key={list.id}>
                                    <Paper style={{padding: "20px"}} elevation={10}>
                                        <Todolist
                                            todolistID={list.id}
                                            title={list.title}
                                            activeFilter={list.activeFilter}
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
