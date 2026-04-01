const express = require('express');
const cors = require('cors');

const todoRoutes = require('./routes/todo.route');

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/todo', todoRoutes);

module.exports = app;

