import TodoList from './components/TodosList'
import './App.css';
import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import axios from 'axios';

const App = () => {
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
  const handleAddTodo = (deletedTodoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== deletedTodoId));
  };

  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;