const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "https://ai-task-agent-frontend.onrender.com",
  credentials: true
}));
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
  const { title, due } = req.body;
  const newTask = { id: Date.now().toString(), title, due, status: 'needsAction' };
  tasks.push(newTask);
  res.json(newTask);
});

app.put('/tasks/:id/complete', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.status = 'completed';
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));