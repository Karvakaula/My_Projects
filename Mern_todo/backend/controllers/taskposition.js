const Todo = require('../schemas/TodoSchema');

exports.addTodo = async (req, res, next) => {
    try {
        // lets get the todos
        const todos = await Todo.find().sort({ deadline: 1 }).exec();

        // 
        const position = todos.length > 0 ? todos[todos.length - 1].position + 1 : 1;
        
        req.position = position;

        console.log(position)
        next();
    } catch (error) {
        console.error('Error calculating todo position:', error);
        res.status(500).json({ error: 'Failed to calculate todo position' });
    }
};
