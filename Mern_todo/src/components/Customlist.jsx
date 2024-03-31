

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoCard from './TodoCard';
import TodoComponent from './AddTodo';
import './TodosList.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const newTodos = Array.from(todos);
    const [reorderedTodo] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, reorderedTodo);
    setTodos(newTodos);

    try {
      await axios.post('http://localhost:3001/api/todos/reorder', { newOrder: newTodos.map(todo => todo._id) });
    } catch (error) {
      console.error('Error updating todo positions:', error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/todos');
        const sortedTodos = response.data.sort((a, b) => a.position - b.position);

        setTodos(sortedTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);
  
  const handleDelete = (deletedTodoId) => {
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
    

   
    <div id='todoList'>
    <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} id='draglist'>
              {todos.map((todo, index) => (
                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                  {(provided, snapshot) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={snapshot.isDragging ? 'dragging' : ''}

                    >
                      <TodoCard todo={todo} onDelete={handleDelete} onComplete={HandleComplete} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
          </Droppable>
        </DragDropContext>
    </div>
    
  );
};

export default TodoList;