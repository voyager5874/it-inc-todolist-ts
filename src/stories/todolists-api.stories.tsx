import React, {useState} from 'react'
import ReactJson from "react-json-view";
import {backendAPI, TaskPriority, TaskStatus, taskPutRequestBodyType} from "../api/it-inc-api";

export default { //for storybook
    title: 'API'
}



export const RequestsMiniApp = () => {
    const [todoLists, setTodoLists] = useState<any>(null)
    const [tasks, setTasks] = useState<any>(null)
    const [response, setResponse] = useState<any>(null)
    const [chosenTodoListID, setChosenTodoListID] = useState<any>(null)
    const [chosenTaskID, setChosenTaskID] = useState<any>(null)
    const [listNameToCreate, setListNameToCreate] = useState<any>(null)
    const [taskNameToCreate, setTaskNameToCreate] = useState<any>(null)
    const [taskDescription, setTaskDescription] = useState<any>(null)


    const getListsFromServer = () => {
        backendAPI.getTodoLists()
            .then(response => setTodoLists(response.data))

    }

    const getTasksFromServer = () => {
        if (chosenTodoListID) {
            backendAPI.getTasks(chosenTodoListID)
                .then(response => setTasks(response.data))
        }
        else{
            alert('choose a todolist')
        }
    }
    const createNewList = () => {
        if(listNameToCreate) {
            backendAPI.createTodoList(listNameToCreate)
                .then(response=>setResponse(response))
                .then(getListsFromServer)
        }
        else{
            alert('new list name field is empty')
        }
        setListNameToCreate('')
    }

    const deleteListFromServer = () => {
        if (chosenTodoListID) {
            backendAPI.deleteTodoList(chosenTodoListID)
                .then(response => setResponse(response))
                .then(getListsFromServer)
        }
        return
    }

    const deleteTaskFromList = () => {
        if(chosenTodoListID && chosenTaskID){
            backendAPI.deleteTask(chosenTodoListID, chosenTaskID)
                .then(response=>setResponse(response))
                .then(getTasksFromServer)
        }
        else{
            alert('not enough data provided to make the request')
        }

    }


    const createTaskInChosenList = () => {
        if (chosenTodoListID && taskNameToCreate) {
            backendAPI.createTask(chosenTodoListID, taskNameToCreate)
                .then(response => setResponse(response))
                .then(getTasksFromServer)
        }
        else{
            alert('new task name field is empty')
        }
        setTaskNameToCreate('')

    }

    const changeTaskName = () => {
        if(chosenTodoListID && chosenTaskID && taskNameToCreate && taskDescription){
            const requestPayload: taskPutRequestBodyType = {
                title: taskNameToCreate,
                description: taskDescription,
                status: TaskStatus.New,
                priority: TaskPriority.Low,
                startDate: '2022-02-05T13:03:26.157',
                deadline: '2022-02-10T13:03:26.157',
            }

            backendAPI.updateTask(chosenTodoListID, chosenTaskID, requestPayload)
                .then(response=>setResponse(response))
                .then(getTasksFromServer)
        }
        else{
            alert('not enough info to proceed')
        }

    }

    const changeListName = () => {
        if (listNameToCreate && chosenTodoListID) {
            backendAPI.updateTodoList(chosenTodoListID, listNameToCreate)
                .then(response => setResponse(response))
                .then(getListsFromServer)
        } else {
            alert('not enough info to proceed')
        }
    }


    // todolistAPI.createTask(todolistId, taskName).then(response=>setState(response.data))


    return (
        <div>
            <div>
                <h3>todoLists</h3>
                <ReactJson src={todoLists}/>
            </div>
            <div>
                <h3>Tasks</h3>
                <ReactJson src={tasks}/>
            </div>
            <div>
                <h3>Response</h3>
                <ReactJson src={response}/>
            </div>
            <h3>{`chosen list is ${chosenTodoListID}`}</h3>
            <div>

                <input type="text" placeholder={'todolistID'}
                       onChange={(e) => setChosenTodoListID(e.currentTarget.value)}
                       value={chosenTodoListID} style={{width:"250px"}}/>
                <input type="text" placeholder={'taskID'}
                       onChange={(e) => setChosenTaskID(e.currentTarget.value)}
                       value={chosenTaskID} style={{width:"250px"}}/>
            </div>
            <div>
                <input type="text" placeholder={'new list name'}
                       onChange={(e) => setListNameToCreate(e.currentTarget.value)}
                       value={listNameToCreate} style={{width:"250px"}}/>
                <input type="text" placeholder={'new task name'}
                       onChange={(e) => setTaskNameToCreate(e.currentTarget.value)}
                       value={taskNameToCreate} style={{width:"250px"}}/>
            </div>
            <div >
                <textarea placeholder={'task description'} value={taskDescription}
                          onChange={(e)=> setTaskDescription(e.currentTarget.value)}
                          style={{height:"80px", minWidth:"500px"}}/>
            </div>

            <div>
                <div>
                    <button onClick={getListsFromServer}>get todolists</button>
                    <button onClick={getTasksFromServer}>get tasks</button>
                    <button onClick={createTaskInChosenList}>create task</button>
                    <button onClick={createNewList}>create new list</button>
                </div>
                <div>
                    <button onClick={deleteListFromServer}>delete chosen list</button>
                    <button onClick={changeTaskName}>change task</button>
                    <button onClick={changeListName}>change list name</button>
                    <button onClick={deleteTaskFromList}>delete task</button>
                </div>


            </div>
        </div>


    )
}

