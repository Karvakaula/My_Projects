import React, { useState } from "react";
import "./CommentField.css";
import axios from "axios";

const CommentField = ({ onPost }) => {
  // Modified to receive props
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const bookId = localStorage.Bookid;
  console.log(localStorage);

  const handleAddReview = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/books/books/${bookId}/reviews`,
        {
          user: localStorage.username, // Assuming user ID is stored in localStorage
          content: description,
          date: new Date(),
          rating: rating,
        }
      );
      console.log("Review added:", response.data);
      setDescription("");
      setRating(0);
      onPost(); // Invoke the callback function
    } catch (error) {
      console.error("Error occurred while adding review:", error);
    }
  };

  return (
    <div id="container">
      <div id="AddForm">
        <textarea
          placeholder="Review"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="rating">
          <input
            type="number"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <button id="addBtn" onClick={handleAddReview}>
          Add review
        </button>
      </div>
    </div>
  );
};

export default CommentField;
