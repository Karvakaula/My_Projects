import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Review from "./review";
import CommentField from "./CommentField"; // Fixed import statement
import "./reviewlist.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f8bbd0",
    },
    secondary: {
      main: "#aed581",
    },
  },
});

const Reviewlist = () => {
  const [reviews, setReviews] = useState([]);
  const [book, setBook] = useState([]);
  const bookId = localStorage.Bookid;
  console.log("book", book);
  console.log("reviews", reviews);

  // Function to fetch book and reviews data
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/books/books/${bookId}`
      );
      console.log(response.data);
      setBook(response.data);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  // Function to refresh review list after posting a review
  const handleRefreshReviews = () => {
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <section id="reviews">
      <h2 className="bookname">
        {book.name}, by {book.author}
      </h2>
      <span>published: {book.year}</span>
      <br></br>
      <span>Average rating: {book.AVGrating}</span>
      <CommentField onPost={handleRefreshReviews} />{" "}
      {/* Pass the callback function */}
      <div id="gridrev">
        {reviews.map((review) => (
          <Review key={review._id} review={review} book={book._id} />
        ))}
      </div>
    </section>
  );
};
export default Reviewlist;
