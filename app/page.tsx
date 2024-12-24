"use client"

import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function TodoApp() {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setTasks(storedTasks)
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: taskInput.trim(), completed: false }])
      setTaskInput('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const editTask = (id: number) => {
    const taskToEdit = tasks.find(task => task.id === id)
    if (taskToEdit) {
      const newText = prompt('Edit task:', taskToEdit.text)
      if (newText !== null && newText.trim() !== '') {
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, text: newText.trim() } : task
        ))
      }
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="max-w-md mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-2">
        <h1 className="text-2xl font-bold text-center text-gray-800 my-4">To-Do List</h1>
        <form onSubmit={addTask} className="flex items-center mb-4">
          <Input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow mr-2"
            required
          />
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </form>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  id={`task-${task.id}`}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                >
                  {task.text}
                </label>
              </div>
              <div className="flex space-x-1">
                <Button variant="outline" size="icon" onClick={() => editTask(task.id)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => deleteTask(task.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

