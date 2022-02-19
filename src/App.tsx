import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./components/AddItemForm";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import {Menu} from "@material-ui/icons";
import {addListTC, fetchListsTC, TodoListInAppType} from "./state/listsActionsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType, useAppSelector} from "./state/store";
import {Todolist} from "./components/Todolist";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {EntityStatusType} from "./state/appReducer";


type AppPropsType = {
   demo?: boolean
}


export const App = ({demo = false, ...props}: AppPropsType) => {
    console.log("app was called")
    // const todolists = useSelector<RootStateType, TodoListInAppType[]>(state => state.lists);
    const todolists = useAppSelector<TodoListInAppType[]>(state => state.lists);
    const appStatus = useSelector<RootStateType, EntityStatusType>(state => state.app.appStatus)
    const dispatch = useDispatch()


    useEffect(()=>{
        if(demo) return
        dispatch(fetchListsTC())
    },[dispatch, demo])

    const addTodolist = useCallback((listName: string) => {
        if (listName) {
            dispatch(addListTC(listName))
        }
    }, [dispatch])

    return (
        <div>
            <ErrorSnackbar/>
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
                {appStatus === 'loading' && < LinearProgress style={{position:"absolute", top: "800px"}} color="secondary"/>}
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
                                            demo={demo}
                                            listStatus={list.entityStatus}
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
