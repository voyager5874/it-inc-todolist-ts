import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Todolist} from "./Todolist";
import React, {useCallback} from "react";
import {useAppSelector} from "../state/store";
import {addListTC, TodoListInAppType} from "../state/listsActionsReducer";
import {AddItemForm} from "./AddItemForm";
import {useDispatch} from "react-redux";

type AllTodoListsPropsType = {
    demo?: boolean
}

export const AllTodoLists = React.memo(({demo = false}: AllTodoListsPropsType) => {
    // const todolists = useSelector<RootStateType, TodoListInAppType[]>(state => state.lists);
    const todolists = useAppSelector<TodoListInAppType[]>(state => state.lists)

    const dispatch = useDispatch()

    const addTodolist = useCallback((listName: string) => {
        if (listName) {
            dispatch(addListTC(listName))
        }
    }, [dispatch])

    return (
        <>
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
        </>
    );
});


