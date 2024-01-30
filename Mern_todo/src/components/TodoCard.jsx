import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './todocard.css';

const TodoCard = ({ todo, onDelete, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isDone, setIsDone] = useState(todo.completed);

  const calculateTimeRemaining = () => {
    const now = moment(); // now
    const deadline = moment(todo.deadline); // deadline 
    const duration = moment.duration(deadline.diff(now)); // difference between now and deadline

    const days = Math.floor(duration.asDays()); // days between now and deadline
    const hours = duration.hours(); // hours between now and deadline
    const minutes = duration.minutes(); // minutes between now and deadline

      // conditions for time displaying, days? hours? minutes?
    if (days > 0) {
      setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
    } else if (hours > 0) {
      setTimeRemaining(`${hours}h ${minutes}m`);
    } else {
      setTimeRemaining(`${minutes}m`);
    }
  };

  useEffect(() => {
    calculateTimeRemaining();

    // Update the timer every minute
    const timerInterval = setInterval(calculateTimeRemaining, 60000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [todo.deadline]);

  const handleCheckboxChange = async () => {
    try {
      await axios.put(`http://localhost:3001/api/todos/${todo._id}`, { completed: !isDone });
      setIsDone(!isDone);
      onComplete(todo._id);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  const handleDelete = async () => {
    try {
      // Send a DELETE request to your server's endpoint with the todo ID
      await axios.delete(`http://localhost:3001/api/todos/${todo._id}`);

      // Call the onDelete function to update 
      onDelete(todo._id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  
  const isDeadlineNear = (deadline) => {
    const currentDate = moment(); // Lets take current time
    const deadlineDate = moment(deadline); // deadline 

    const isLate = deadlineDate.isBefore(currentDate);
    const isNear = Math.abs(deadlineDate.diff(currentDate, 'milliseconds')) < 24 * 60 * 60 * 1000 && !isLate; // lets count if deadline is 24h from current
    const isWithinWeek = deadlineDate.isSameOrBefore(moment().add(7, 'days')) && !isNear && !isLate; // letts see if deadline is within week AND isNear = false
 
    return { near: isNear, withinWeek: isWithinWeek, late: isLate };
  };

  const formattedDeadline = todo.deadline ? moment(todo.deadline).format('YYYY-MM-DD') : '';
  const { near, withinWeek, late } = isDeadlineNear(todo.deadline);

  return (
    <div className={`todo-card ${near ? 'near-deadline' : ''} ${withinWeek ? 'weekfromdeadline' : ''} ${late && !todo.completed ?  'late' : ''} ${todo.completed ? 'Completed' : ''}`}>
      <span className='delBtn' onClick={() => handleDelete(todo.id)} >X</span>
      {(near || withinWeek || late) && (
        <p className="deadline-text">
          {near ? 'DEADLINE SOON!!' : ''} {late && !todo.completed ? 'late' : ''} {todo.completed ? 'Completed': ' '} {withinWeek && !todo.completed ? 'One week or less till deadline' : ''}
        </p>
      )}
      <h3 className='title'>{todo.title}</h3>
      <div className="description">{todo.description}</div>
      <label>
        Done:
        <input type="checkbox" checked={isDone} onChange={handleCheckboxChange} />
      </label>
      <span className='date'>{formattedDeadline}</span>
      
          {timeRemaining && <p className="timer">{timeRemaining}</p>}

    </div>
  );
};

export default TodoCard;
