import React, { useState, useEffect } from "react";
import "./review.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

import axios from "axios";
const Review = ({ review, book }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(review.likes.length);
  const [ratingStars, setRatingStars] = useState([]);

  useEffect(() => {
    // Check if the logged-in user has liked the review
    const checkUserLiked = async () => {
      try {
        const likes = review.likes;
        const userId = localStorage.userId;
        console.log(userId);
        const userLiked = likes.some((like) => like.userId === userId);
        setLiked(userLiked);
      } catch (error) {
        console.error(
          "Error occurred while checking if the user liked the review:",
          error
        );
      }
    };
    const generateRatingStars = (rating) => {
      const stars = [];
      // loop 5 times
      for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
          // if rating = full number
          stars.push(<StarIcon key={i} color="secondary" />);
        } else if (i === Math.floor(rating) && rating % 1 !== 0) {
          // if rating mod i< 0 half star
          stars.push(<StarHalfIcon key={i} color="secondary" />);
        } else {
          // if i > rating no star
          stars.push(<StarIcon key={i} color="disabled" />);
        }
      }
      setRatingStars(stars);
    };

    checkUserLiked();
    generateRatingStars(review.rating);
  }, [book, review._id, review.rating]);

  const handleLike = async () => {
    try {
      // Make a PUT request to update the review with like/unlike

      await axios.put(
        `http://localhost:3001/books/books/edit/${book}/reviews/${review._id}`,
        { userId: localStorage.userId }
      );
      // Toggle liked state
      console.log(review.likes);
      setLiked(!liked);
      // update likes count
      setLikesCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    } catch (error) {
      console.error("Error occurred while liking the review:", error);
    }
  };
  return (
      <div className="review">
      <h2 className="Username">{review.user === localStorage.username ? "You" : review.user}</h2>
        <div className="comment">
          <p>{review.content}</p>
        </div>
        <span className="like" onClick={handleLike}>
          {likesCount}
          {liked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
        </span>
        <span className="stars">{ratingStars}</span>
      </div>
  );
};
export default Review;
