import { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ToDoList from './ToDoList';

function TaskForm() {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [tasks, setTasks] = useState(JSON.parse(sessionStorage.getItem('tasks') ));

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleAddTaskClick = () => {
    const newTask = { taskName, dueDate, status };
    const tasks = JSON.parse(sessionStorage.getItem('tasks') || '[]');
    tasks.push(newTask);
    setTasks(tasks);
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Tasks:', tasks);

  
  };

  return (
    <>
    <form>
      <TextField
        id="task-name"
        label="Task Name"
        value={taskName}
        onChange={handleTaskNameChange}
        margin="normal"
        required
        fullWidth
      />

<TextField name="dueDate" label="Due Date" type="date" defaultValue={''} onChange={handleDueDateChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />


      <FormControl fullWidth margin="normal">
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          value={status}
          onChange={handleStatusChange}
          required
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleAddTaskClick}>
        Add Task
      </Button>
    </form>
    <ToDoList tasks={tasks}/>
    </>
  );
}

export default TaskForm;
