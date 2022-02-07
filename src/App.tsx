import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addListTC, fetchListsThunk, TodoListInAppType} from "./state/listsActionsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {Todolist} from "./Todolist";


export const App = () => {
    console.log("app was called")
    const todolists = useSelector<RootStateType, TodoListInAppType[]>(state => state.lists);
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(fetchListsThunk())
    },[dispatch])

    const addTodolist = useCallback((listName: string) => {
        if (listName) {
            dispatch(addListTC(listName))
        }
    }, [dispatch])

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
                    <AddItemForm addItemCallback={addTodolist}/>
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
