const express = require('express');
const cors = require('cors');

const todoRoutes = require('./routes/todo.route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/todo', todoRoutes);

module.exports = app;

