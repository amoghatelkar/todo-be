const todoService = require('../services/todo.service');

const createTodo = async (req, res) => {
    try {
        console.log("===>", req.body);
        const todo = await todoService.createTodo(req.body);
        
        res.json(todo);
    } catch (error) {
        console.error({ error: error });
    }
}

const getTodos = async (req, res) => {
    try{
        const todos = await todoService.getTodos();
        res.json(todos);
    }catch(error){
        console.error({error: error});
    }
}

const deleteTodo = async (req, res) => {
    try{
        const { id } = req.params;
        const data = await todoService.deleteTodo(id);
        res.json(data);
    }
    catch(error){
        console.log(error);
    }
}

const updateTodo = async (req, res) => {
    try{
        const {id } = req.params;
        const data = todoService.updateTodo(req.body, id);
        res.json(data);
    }catch(error){
        console.error({error: error})
    }
}
module.exports = {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo
}