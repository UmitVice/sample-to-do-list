const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Endpoint to get tasks
app.get('/api/tasks', (req, res) => {
  fs.readFile('../mocks/tasks.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading tasks: ', err);
      res.status(500).json({ error: 'Error reading tasks' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to add a task
app.post('/api/tasks', async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  try {
    const data = await fs.promises.readFile('../mocks/tasks.json', 'utf8');
    const tasks = JSON.parse(data);
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      task: task
    };
    tasks.push(newTask);
    await fs.promises.writeFile('../mocks/tasks.json', JSON.stringify(tasks, null, 2), 'utf8');
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error adding task: ', err);
    res.status(500).json({ error: 'Error adding task' });
  }
});

// Endpoint to delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  try {
    const data = await fs.promises.readFile('../mocks/tasks.json', 'utf8');
    let tasks = JSON.parse(data);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    await fs.promises.writeFile('../mocks/tasks.json', JSON.stringify(tasks, null, 2), 'utf8');
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task: ', err);
    res.status(500).json({ error: 'Error deleting task' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
