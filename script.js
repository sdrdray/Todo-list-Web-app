import React, { useState, useEffect } from 'react';

export default function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (taskInput.trim() !== '') {
            setTasks([...tasks, { text: taskInput.trim(), completed: false }]);
            setTaskInput('');
        }
    };

    const toggleTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const editTask = (index) => {
        const newText = prompt('Edit task:', tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            const newTasks = [...tasks];
            newTasks[index].text = newText.trim();
            setTasks(newTasks);
        }
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <div className="container">
            <h1>To-Do List</h1>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Enter a new task"
                    required
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(index)}
                        />
                        <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                            {task.text}
                        </span>
                        <button onClick={() => editTask(index)}>Edit</button>
                        <button onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

