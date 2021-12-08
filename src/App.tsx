import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskFilterType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string
    title: string
    activeFilter: TaskFilterType
}
type TasksListType = {
    [key: string]: Array<TaskType>
}

export const App = () => {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What  to learn", activeFilter: 'all'},
        {id: todolistID2, title: "What  to buy", activeFilter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksListType>({
            [todolistID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS/TS", isDone: true},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Redux", isDone: false}
            ],
            [todolistID2]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS/TS", isDone: true},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Redux", isDone: false}
            ]
        }
    )

    const changeFilter = (todolistID: string, newFilterValue: TaskFilterType) => {
        setTodolists(todolists.map(list => list.id === todolistID ? {...list, activeFilter: newFilterValue} : list))
    }

    const changeTaskStatus = (todolistID: string, taskID: string, newStatus: boolean) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, isDone: newStatus} : task)
        })
    }

    const getFilteredTasks = (todolist: TodolistType) => {
        let filteredTasks = tasks[todolist.id];
        if (todolist.activeFilter === 'active') {
            return filteredTasks.filter(task => !task.isDone)
        }
        if (todolist.activeFilter === 'completed') {
            return filteredTasks.filter(task => task.isDone)
        }
        return filteredTasks
    }

    const addTask = (todolistID: string, name: string) => {
        setTasks({...tasks, [todolistID]: [{id: v1(), title: name, isDone: false}, ...tasks[todolistID]]}) //вроде это не изменение стейта напрямую - создание нового объекта на месте
    }
    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== taskID)})
    }
    const createTodolist = (title: string) => {
        if (title) {
            const newTodolist: TodolistType = {id: v1(), title: title, activeFilter: 'all'}
            setTodolists([...todolists, newTodolist])
            setTasks({...tasks, [newTodolist.id]: []})
        }
    }
    const deleteTodoList = (todolistID: string) => {
        setTodolists(todolists.filter(list => list.id !== todolistID))
    }

    return (
        <div className="App">
            {
                todolists.map(list => {
                    let taskToShow = getFilteredTasks(list)
                    return <Todolist
                        key={list.id}
                        todolistID={list.id}
                        title={list.title}
                        tasks={taskToShow}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        activeFilter={list.activeFilter}

                        deleteTodoList={deleteTodoList}

                    />
                })
            }
            <button onClick={() => createTodolist("New")}>create new todolist</button>
        </div>
    );
}
