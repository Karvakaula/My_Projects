import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Droppable } from 'react-beautiful-dnd';
import TodoCard from './TodoCard';

const TodoListContainer = ({ list }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosResponse = await axios.get(`http://localhost:3001/api/lists/${list._id}/todos`);
        setTodos(todosResponse.data);
      } catch (error) {
        console.error(`Error fetching todos for list ${list._id}:`, error);
      }
    };

    fetchData();
  }, [list._id]);

  const handleDelete = (deletedTodoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== deletedTodoId));
  };

  const HandleComplete = (completedTodoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === completedTodoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className='List' key={list._id}>
      <h2>{list.name}</h2>
      <Droppable droppableId={list._id.toString()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, index) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onDelete={handleDelete}
                onComplete={HandleComplete}
                index={index} 
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoListContainer;
