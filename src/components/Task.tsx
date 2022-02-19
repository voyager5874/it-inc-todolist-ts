import React, {useCallback} from "react";
import  IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import Backspace from "@material-ui/icons/Backspace";
import styled from "styled-components";
import {TaskStatus} from "../api/it-inc-api";

type TaskPropsType = {
    // listID: string
    taskID: string
    taskName: string
    isDone: boolean
    changeStatus: (taskID:string, newStatus: TaskStatus) => void
    changeName: (taskID: string, newName: string) => void
    removeTask: (taskID: string) => void

}

export const Task = React.memo((props: TaskPropsType) => {
    console.log(`Task was called, title: ${props.taskName}`)

    // const dispatch = useDispatch()

    const changeStatus = useCallback((event)=>{
        const newTaskStatus = event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        props.changeStatus(props.taskID, newTaskStatus)
    },[props.changeStatus, props.taskID])

    const changeName = useCallback((newName: string)=>{
        props.changeName(props.taskID, newName)
    },[props.changeName, props.taskID])

    const removeTask = useCallback(()=>{
        props.removeTask(props.taskID)
    },[props.removeTask, props.taskID])

    return <>
        <TaskNameWithCheckboxWrapper>
            <Checkbox checked={props.isDone}
                      color={"primary"}
                      onChange={changeStatus}/>
            <EditableSpan itemName={props.taskName}
                          itemNameChangedCallback={changeName}/>
        </TaskNameWithCheckboxWrapper>

        <IconButton size={"small"}
            // variant={"contained"}
                    onClick={removeTask}><Backspace
            color={"primary"}
        /></IconButton>
    </>
})

const TaskNameWithCheckboxWrapper = styled.div`
  //min-width: 260px;
  //border-bottom: 2px solid gray;
`