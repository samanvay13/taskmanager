import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import TaskForm from './TaskForm'
import './Dashboard.css';

export default function Dashboard() {

    const location = useLocation();
    const user = location.state.username;
    const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className='dashboard'>
        <h1>TASK-MANAGER</h1>
        <h3>Hello, {user}!</h3>
        <div className='task'>
        <TaskForm onAddTask={handleAddTask} />
        </div>
    </div>
  )
}
