import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
// import {Button, IconButton, List, ListItem} from "@material-ui/core";
//tree-shaking is working out of the box??
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/Delete";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../state/store";
import {addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC} from "../state/tasksActionsReducer";
import {changeFilterAC, changeListNameTC, removeListTC, TasksFilterType} from "../state/listsActionsReducer";
import {Task} from "./Task";
import {TaskStatus, TaskType} from "../api/it-inc-api";
import {EntityStatusType} from "../state/appReducer";


type TodolistPropsType = {
    demo?: boolean
    listStatus: EntityStatusType
    todolistID: string
    title: string
    activeFilter: TasksFilterType
}


const TodolistCard = styled.div`
  min-width: 300px;
`

const FilterButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 0;
`


export const Todolist = React.memo(({demo = false, listStatus, ...props}: TodolistPropsType) => {
    console.log(`todolist was called, title: ${props.title}`)
    const tasks = useSelector<RootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])
    // const listStatus = useSelector<RootStateType, EntityStatusType>(state => state.lists.)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(demo) return
        dispatch(fetchTasksTC(props.todolistID))
    }, [dispatch, props.todolistID])

    let filteredTasks = tasks
    if (props.activeFilter === 'active') {
        filteredTasks = tasks.filter(task => task.status===TaskStatus.New)
    }
    if (props.activeFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.status===TaskStatus.Completed)
    }

    const changeTaskStatus = useCallback((taskID: string, newStatus: TaskStatus) => {
        dispatch(updateTaskTC(props.todolistID, taskID, {status: newStatus}))
    }, [dispatch, props.todolistID])

    const addTask = useCallback((name: string) => {
        dispatch(addTaskTC(props.todolistID, name))
    }, [dispatch, props.todolistID])

    const removeTask = useCallback((taskID: string) => {
        dispatch(removeTaskTC(props.todolistID, taskID))
    }, [dispatch, props.todolistID])

    const changeFilter = useCallback((newFilterValue: TasksFilterType) => {
        dispatch(changeFilterAC(props.todolistID, newFilterValue))
    }, [dispatch, props.todolistID])

    const deleteTodolist = useCallback(() => {
        let action = removeListTC(props.todolistID)
        dispatch(action)
    }, [dispatch, props.todolistID])

    const changeTaskName = useCallback((taskID: string, newName: string) => {
        dispatch(updateTaskTC(props.todolistID, taskID, {title: newName}))
    }, [dispatch, props.todolistID])

    const changeListName = useCallback((newName: string) => {
        dispatch(changeListNameTC(props.todolistID, newName))
    }, [dispatch, props.todolistID])


    return (
        <TodolistCard>
            <h3>
                <EditableSpan itemName={props.title} itemNameChangedCallback={changeListName}/>
                <IconButton disabled={listStatus === 'loading'} onClick={deleteTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm disabled={listStatus==='loading'} addItemCallback={addTask}/>
            <List disablePadding>
                {
                    (filteredTasks || []).map(task =>
                        <ListItem disableGutters key={task.id}
                                  style={{justifyContent: "space-between"}}
                        >
                            <Task taskID={task.id}
                                  isDone={task.status === TaskStatus.Completed}
                                  changeName={changeTaskName}
                                  taskName={task.title}
                                  changeStatus={changeTaskStatus}
                                  removeTask={removeTask}
                            />
                        </ListItem>)

                }
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
})



