import React, { useState } from "react";
import "./review.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import axios from 'axios';
const Review = ({ review, book }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      // Make a PUT request to update the review with like/unlike
      await axios.put(`/books/edit/${review.Id}/reviews/${review.id}`, { userId: localStorage.userId });
      // Toggle liked state
      setLiked(!liked);
    } catch (error) {
      console.error('Error occurred while liking the review:', error);
    }
  };
  console.log("from reveiw", review);
  return (
    <div className="review">
      <h2>{review.user}</h2>
      <p>{review.content}</p>
      <span className="like" onClick={handleLike}>
        {liked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
      </span>
    </div>
  );
};
export default Review;
