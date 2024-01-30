// TodoList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoCard from './TodoCard';
import TodoComponent from './AddTodo';
import './TodosList.css'
const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);
  
  const handleDelete = (deletedTodoId) => {
    // Update the state by filtering out the deleted todo
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== deletedTodoId));
  };
  const HandleComplete = (completedTodoId) =>{
    setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo._id === completedTodoId ? { ...todo, completed: !todo.completed } : todo
    )
  );
  }
  const handleAddTodo= (newTodo) =>{
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }
  return (
    
    <section className='container'>
    <TodoComponent onAddTodo={handleAddTodo} />
    <div id='todoList'>
      {todos.map(todo => (
        <TodoCard key={todo._id} todo={todo} onDelete={handleDelete} onComplete={HandleComplete} />
      ))}
      
    </div>
    </section>
  );
};

export default TodoList;
