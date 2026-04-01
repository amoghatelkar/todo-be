const todoService = require('../services/todo.service');

const createTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.body);
    res.status(201).json(todo);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: 'Failed to create todo' });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos();
    res.json(todos);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await todoService.deleteTodo(id);
    res.json(data);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: 'Failed to delete todo' });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await todoService.updateTodo(req.body, id);
    res.json(data);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: 'Failed to update todo' });
  }
};

module.exports = {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo
};
