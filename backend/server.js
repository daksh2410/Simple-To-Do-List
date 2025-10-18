const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// File path for tasks storage
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Helper function to read tasks from file
async function readTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Helper function to write tasks to file
async function writeTasks(tasks) {
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// Helper function to generate unique ID
function generateId() {
  return Date.now().toString();
}

// Helper function to find task by ID
async function findTaskById(id) {
  const tasks = await readTasks();
  return tasks.find(task => task.id === id);
}

// Routes

// GET /tasks → Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// GET /tasks/:id → Get a specific task by ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await findTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
});

// POST /tasks → Create a task with title and completed status
app.post('/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    
    // Basic validation
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    // Create new task
    const newTask = {
      id: generateId(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Read existing tasks
    const tasks = await readTasks();
    
    // Add new task
    tasks.push(newTask);
    
    // Save tasks to file
    await writeTasks(tasks);
    
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /tasks/:id → Update a task's title or completed status
app.put('/tasks/:id', async (req, res) => {
  try {
    const { title, completed } = req.body;
    
    // Find task by ID
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(task => task.id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Update task properties if provided
    if (title !== undefined) {
      tasks[taskIndex].title = title;
    }
    
    if (completed !== undefined) {
      tasks[taskIndex].completed = completed;
    }
    
    // Update timestamp
    tasks[taskIndex].updatedAt = new Date().toISOString();
    
    // Save tasks to file
    await writeTasks(tasks);
    
    res.json(tasks[taskIndex]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /tasks/:id → Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
  try {
    // Find task by ID
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(task => task.id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Remove task
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    
    // Save tasks to file
    await writeTasks(tasks);
    
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});