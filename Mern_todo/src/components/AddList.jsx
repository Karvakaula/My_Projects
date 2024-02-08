import React, { useState } from 'react';
import axios from 'axios';
const baseURL = 'http://localhost:3001/api/list';

const AddList= ({ onAddList }) => {
    const [newList, setNewList] = useState({
      name: ''
    });
  
    const handleAddList = () => {
      axios.post(baseURL, newList)
        .then((response) => {
          onAddList(response.data);
          setNewList({ name: '' }); 
        })
        .catch((error) => {
          console.error('Error adding list:', error);
        });
    };
  
    return (
      <div>
        <h2>Add New List</h2>
        <input
          type="text"
          placeholder="List Name"
          value={newList.name}
          onChange={(e) => setNewList({ ...newList, name: e.target.value })}
        />
        <button onClick={handleAddList}>Add List</button>
      </div>
    );
  };
  
  export default AddList;