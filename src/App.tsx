import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export const App = () => {
    const tasks = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS/TS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: "Learn how to learn", isDone: true},
        {id: 2, title: "Be regular", isDone: false},
        {id: 3, title: "Make a timetable", isDone: false}
    ]
    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks}/>
            <Todolist title={"Some name"}tasks={tasks}/>
            <Todolist title={"You're in the beginning"}tasks={tasks2}/>
        </div>
    );
}
