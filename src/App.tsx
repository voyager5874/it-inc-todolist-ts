import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./components/AddItemForm";
import {Routes, Route} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import {Menu} from "@material-ui/icons";
import {addListTC, fetchListsTC} from "./state/listsActionsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {EntityStatusType} from "./state/appReducer";
import {AllTodoLists} from "./components/AllTodoLists";
import {Login} from "./components/Login";


type AppPropsType = {
   demo?: boolean
}


export const App = ({demo = false, ...props}: AppPropsType) => {
    console.log("app was called")
    const appStatus = useSelector<RootStateType, EntityStatusType>(state => state.app.appStatus)
    const dispatch = useDispatch()


    useEffect(()=>{
        if(demo) return
        dispatch(fetchListsTC())
    },[dispatch, demo])

    let showProgressBar = appStatus === "loading"

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
                {showProgressBar && < LinearProgress color="secondary"/>}
            </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={"/"} element={<AllTodoLists demo={demo}/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>
                </Container>

        </div>
    )
        ;
}
