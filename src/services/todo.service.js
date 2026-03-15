const prisma = require("../prisma/prismaClient");

const createTodo = async (data) => {
    return prisma.todo.create({
        data
    });
}

const getTodos = async () => {
    return prisma.todo.findMany();
}

const deleteTodo = async (id) => {
    return prisma.todo.delete({where:{
        id
    }});
}

const updateTodo = async (data, id) => {
    return prisma.todo.update({
        where:{
            id: id
        },
        data
    })
}

module.exports = {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo
}