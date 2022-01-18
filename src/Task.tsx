import React from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Backspace} from "@material-ui/icons";
import styled from "styled-components";

type TaskPropsType = {
    taskID: string
    taskName: string
    isDone: boolean
    changeStatus: (taskID:string, newStatus: boolean) => void
    changeName: (taskID: string, newName: string) => void
    removeTask: (taskID: string) => void

}

export const Task = React.memo((props: TaskPropsType) => {
    console.log("Task was called")
    return <>
        <TaskNameWithCheckboxWrapper>
            <Checkbox checked={props.isDone}
                      color={"primary"}
                      onChange={(event) => props.changeStatus(props.taskID, event.currentTarget.checked)}/>
            <EditableSpan itemName={props.taskName}
                          itemNameChangedCallback={(newName) => props.changeName(props.taskID, newName)}/>
        </TaskNameWithCheckboxWrapper>

        <IconButton size={"small"}
            // variant={"contained"}
                    onClick={() => props.removeTask(props.taskID)}><Backspace
            color={"primary"}
        /></IconButton>
    </>
})

const TaskNameWithCheckboxWrapper = styled.div`
  //min-width: 260px;
  //border-bottom: 2px solid gray;
`