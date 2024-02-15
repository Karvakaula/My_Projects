import React from 'react';
import './Book.css';
import { useNavigate } from 'react-router-dom';

const Book = ({ book }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('./reviews')
    console.log(book)
    localStorage.setItem("Bookid", book._id);

  };

  return (
    <div onClick={handleClick} className='book-item' id={book._id}>
        <h2>{book.name}</h2>
        <p>{book.author}</p>
        <p>{book.reviews ? `Reviews: ${book.reviews.length}` : ' ' }</p>
    </div>
  )
}

export default Book