import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskFilterType = 'all' | 'completed' | 'active';

export const App = () => {
    // let tasks = [
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS/TS", isDone: true},
    //     {id: v1(), title: "React", isDone: false},
    //     {id: v1(), title: "Redux", isDone: false}
    // ]
    const tasks2 = [
        {id: v1(), title: "Learn how to learn", isDone: true},
        {id: v1(), title: "Be regular", isDone: false},
        {id: v1(), title: "Make a timetable", isDone: false}
    ]
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])
    const [filter, setFilter] = useState<TaskFilterType>('all')

    const changeFilter = (filterValue: TaskFilterType) => {
        setFilter(filterValue)
    }
    let filteredTasks = tasks;
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }
    const addTask = (name: string) => {
        setTasks([{id: v1(), title: name, isDone: false}, ...tasks])
    }
    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))

    }
    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
            <Todolist title={"You're in the beginning"} tasks={tasks2}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}
