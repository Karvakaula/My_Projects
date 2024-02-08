import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './todocard.css';

const TodoCard = ({ todo, onDelete, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isDone, setIsDone] = useState(todo.completed);
  const [isExpanded, setIsExpanded] = useState(false);

  const calculateTimeRemaining = () => {
    const now = moment(); 
    const deadline = moment(todo.deadline); 
    const duration = moment.duration(deadline.diff(now)); 

    const days = Math.floor(duration.asDays());
    const hours = duration.hours(); 
    const minutes = duration.minutes()

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
      const userConfirmed = window.confirm(`Are you sure you want to delete ${todo.title}?`);

      if (userConfirmed) {
        
        await axios.delete(`http://localhost:3001/api/todos/${todo._id}`);
       
        onDelete(todo._id);
      }

    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const isDeadlineNear = (deadline) => {
    const currentDate = moment(); 
    const deadlineDate = moment(deadline); 

    const isLate = deadlineDate.isBefore(currentDate);
    const isNear = Math.abs(deadlineDate.diff(currentDate, 'milliseconds')) < 24 * 60 * 60 * 1000 && !isLate; // lets count if deadline is 24h from current
    const isWithinWeek = deadlineDate.isSameOrBefore(moment().add(7, 'days')) && !isNear && !isLate; // letts see if deadline is within week AND isNear = false

    return { near: isNear, withinWeek: isWithinWeek, late: isLate };
  };

  const formattedDeadline = todo.deadline ? moment(todo.deadline).format('YYYY-MM-DD') : '';
  const { near, withinWeek, late } = isDeadlineNear(todo.deadline);

  return (
    <div id={todo._id} onClick={toggleExpand} className={`todo-card ${near ? 'near-deadline' : ''} ${withinWeek ? 'weekfromdeadline' : ''} ${late && !todo.completed ? 'late' : ''} ${todo.completed ? 'Completed' : ''} ${isExpanded ? 'expanded' : ''}`}>
      <div className="header" onClick={toggleExpand}>
        <h3 className='title'>{todo.title}</h3>
        <span className='timer'>{timeRemaining}</span>
      </div>
      {isExpanded && (
        <div className="details">
          {(near || withinWeek || late) && (
            <p className="deadline-text">
              {near ? 'DEADLINE SOON!!' : ''} {late && !todo.completed ? 'late' : ''} {todo.completed ? 'Completed' : ' '} {withinWeek && !todo.completed ? 'One week or less till deadline' : ''}
            </p>
          )}
          <div className="description">{todo.description}</div>
          <label>
            Done:
            <input type="checkbox" checked={isDone} onChange={handleCheckboxChange} />
          </label>
          <span className='date'>{formattedDeadline}</span>
        </div>
      )}
      <span className='delBtn' onClick={() => handleDelete(todo.id)}>X</span>
    </div>
  );
};

export default TodoCard;
