import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type TaskFilterType = 'all' | 'completed' | 'active';

export const App = () => {
    // let tasks = [
    //     {id: 1, title: "HTML&CSS", isDone: true},
    //     {id: 2, title: "JS/TS", isDone: true},
    //     {id: 3, title: "React", isDone: false},
    //     {id: 4, title: "Redux", isDone: false}
    // ]
    const tasks2 = [
        {id: 1, title: "Learn how to learn", isDone: true},
        {id: 2, title: "Be regular", isDone: false},
        {id: 3, title: "Make a timetable", isDone: false}
    ]
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 4, title: "HTML&CSS", isDone: true},
        {id: 5, title: "JS/TS", isDone: true},
        {id: 6, title: "React", isDone: false},
        {id: 7, title: "Redux", isDone: false}
    ])
    const [filter, setFilter] = useState<TaskFilterType>('all')

    const changeFilter = (filterValue: TaskFilterType) => {
        setFilter(filterValue)
    }
    let filteredTasks = tasks;
    if(filter === 'active'){
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if(filter === 'completed'){
        filteredTasks = tasks.filter(task => task.isDone)
    }
    const removeTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))

    }
    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={filteredTasks} removeTask={removeTask} changeFilter={changeFilter}/>
            <Todolist title={"You're in the beginning"} tasks={tasks2} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}
