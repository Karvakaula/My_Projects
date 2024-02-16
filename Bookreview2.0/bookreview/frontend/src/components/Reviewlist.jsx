import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Review from "./review";
import Commentfield from './CommentField'
import './reviewlist.css'

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
  const [reviews, SetReviews] = React.useState([]);
  const [book, SetBook] = React.useState([]);
  const bookId = localStorage.Bookid;
  console.log("book", book);
  console.log("reviews", reviews);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/books/books/${bookId}`
        );
        const data = Array.from(response.data);
        console.log(response.data);
        SetBook(response.data);
        SetReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchBooks();
  }, []);
  return (
    <section id="reviews">
      <h2 className="bookname">{book.name}, by {book.author}</h2>
      <Commentfield/>
      <div id="gridrev">
        {reviews.map((review) => (
          <Review key={review._id} review={review} book={book._id} />
        ))}
      </div>
    </section>
  );
};
export default Reviewlist;
