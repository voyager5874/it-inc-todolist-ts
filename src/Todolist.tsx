import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {addTaskAC, changeTaskNameAC, changeTaskStatusAC, removeTaskAC} from "./state/tasksActionsReducer";
import {changeFilterAC, changeListNameAC, removeListAC, TasksFilterType} from "./state/listsActionsReducer";
import {Task} from "./Task";
import {TaskStatus, TaskType} from "./api/it-inc-api";


type TodolistPropsType = {
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


export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log(`todolist was called, title: ${props.title}`)
    const tasks = useSelector<RootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])
    const dispatch = useDispatch()

    let filteredTasks = tasks
    if (props.activeFilter === 'active') {
        filteredTasks = tasks.filter(task => task.status===TaskStatus.New)
    }
    if (props.activeFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.status===TaskStatus.Completed)
    }

    const changeTaskStatus = useCallback((taskID: string, newStatus: TaskStatus) => {
        dispatch(changeTaskStatusAC(props.todolistID, taskID, newStatus))
    }, [dispatch, props.todolistID])

    const addTask = useCallback((name: string) => {
        dispatch(addTaskAC(props.todolistID, name))
    }, [props.todolistID])

    const removeTask = useCallback((taskID: string) => {
        dispatch(removeTaskAC(props.todolistID, taskID))
    }, [dispatch, props.todolistID])

    const changeFilter = useCallback((newFilterValue: TasksFilterType) => {
        dispatch(changeFilterAC(props.todolistID, newFilterValue))
    }, [dispatch, props.todolistID])

    const deleteTodolist = useCallback(() => {
        let action = removeListAC(props.todolistID)
        dispatch(action)
    }, [dispatch, props.todolistID])

    const changeTaskName = useCallback((taskID: string, newName: string) => {
        dispatch(changeTaskNameAC(props.todolistID, taskID, newName))
    }, [dispatch, props.todolistID])

    const changeListName = useCallback((newName: string) => {
        dispatch(changeListNameAC(props.todolistID, newName))
    }, [dispatch, props.todolistID])


    return (
        <TodolistCard>
            <h3>
                <EditableSpan itemName={props.title} itemNameChangedCallback={changeListName}/>
                <IconButton onClick={deleteTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItemCallback={addTask}/>
            <List disablePadding>
                {
                    filteredTasks.map(task =>
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
})



