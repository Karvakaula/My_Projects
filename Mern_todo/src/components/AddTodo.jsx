import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './Addtodo.css'
const baseURL = 'http://localhost:3001/api/todos';


const TodoComponent = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '', 
    deadline: null,
  });

  const [Deaddate, setNewDate] = useState('');
  const handleAddTodo = () => {
    axios.post(baseURL, { ...newTodo, deadline: Deaddate, completed: false }).then((response) => {
 
      console.log("deadline:", Deaddate)

      onAddTodo(response.data);

      setNewTodo({
        // reset fields
        title: '',
        description: '', 
        deadline: null,
      });
    });
  };

  return (
    <div>
      <div id='AddForm'>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <DatePicker onChange={setNewDate} value={Deaddate} />
         <button id='addBtn' onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default TodoComponent;
