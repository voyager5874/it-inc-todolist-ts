import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Backspace} from "@material-ui/icons";
import styled from "styled-components";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    // listID: string
    taskID: string
    taskName: string
    isDone: boolean
    changeStatus: (taskID:string, newStatus: boolean) => void
    changeName: (taskID: string, newName: string) => void
    removeTask: (taskID: string) => void

}

export const Task = React.memo((props: TaskPropsType) => {
    console.log(`Task was called, title: ${props.taskName}`)
    // const dispatch = useDispatch()

    const changeStatus = useCallback((event)=>{
        props.changeStatus(props.taskID, event.currentTarget.checked)
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