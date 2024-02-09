// In your todoController file (e.g., todoController.js)
const Todo = require('../schemas/TodoSchema');

// Middleware function to calculate and set the position for the new todo
exports.addTodo = async (req, res, next) => {
    try {
        // Fetch all todos sorted by deadline
        const todos = await Todo.find().sort({ deadline: 1 }).exec();

        // Calculate position based on the length of the sorted todos array
        const position = todos.length > 0 ? todos[todos.length - 1].position + 1 : 1;
        
        // Set the calculated position in the request object
        req.position = position;
        console.log(position)
        // Call the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error calculating todo position:', error);
        res.status(500).json({ error: 'Failed to calculate todo position' });
    }
};
