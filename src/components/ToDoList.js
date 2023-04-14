import { useState } from 'react';
import { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ToDoList(props) {
  let {tasks} = props
  const [taskList, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskName, setTaskName] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState('');
  const [index, setIndex] = useState(null);

  useEffect(() => {
    setTasks(props.tasks? props.tasks : []);
  }, [props.tasks]);
  

  function clearTasks() {
    sessionStorage.clear();
    setTasks([]);
  }

  function handleEditTask(index) {
    setSelectedTask(taskList[index]);
    setTaskName(taskList[index].taskName);
    setDueDate(taskList[index].dueDate);
    setStatus(taskList[index].status);
    setIndex(index)
    setOpen(true);
  }

  function handleDeleteTask(index) {
    const updatedTasks = taskList.filter((_, i) => i !== index);
    sessionStorage.setItem('taskList', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  function handleClose() {
    setOpen(false);
    setSelectedTask(null);
  }

  function handleSave() {
    let updatedTask = {
      taskName: taskName,
      dueDate: dueDate,
      status: status
    }
    console.log('Save edited task:', updatedTask);
    taskList[index] = updatedTask
    setTasks(taskList)
    handleClose();
  }

  const handleTaskNameChange = event => {
    setTaskName(event.target.value)
  }

  const handleDueDateChange = event => {
    setDueDate(event.target.value)
  }

  const handleStatusChange = event => {
    setStatus(event.target.value)
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditTask(index)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDeleteTask(index)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="secondary" onClick={clearTasks}>
        Clear Tasks
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
          <h2>Edit Task</h2>
          <form noValidate autoComplete="off">
            <TextField name="taskName" label="Task Name" defaultValue={taskName} onChange={handleTaskNameChange} fullWidth margin="normal" />
            <TextField name="dueDate" label="Due Date" type="date" defaultValue={dueDate} onChange={handleDueDateChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
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
      </FormControl>          </form>
          <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '10px' }}>Save</Button>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}

export default ToDoList;

