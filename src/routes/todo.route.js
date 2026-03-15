const express = require('express');
const router = express.Router();

const todoController = require("../controller/todo.controller");

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.delete('/:id', todoController.deleteTodo);
router.patch('/:id', todoController.updateTodo);

module.exports = router;

