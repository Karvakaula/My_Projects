import React from "react";
import "./Book.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const Book = ({ book }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("./reviews");
    console.log(book);
    localStorage.setItem("Bookid", book._id);
  };

  return (
    /*<div onClick={handleClick} className='book-item' id={book._id}>
        <h2>{book.name}</h2>
        <p>{book.author}</p>
        <p>{book.reviews ? `Reviews: ${book.reviews.length}` : ' ' }</p>
    </div>*/
    <Card className="book-item" sx={{ Width: 150 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {book.author}
        </Typography>
        <Typography variant="h5" component="div">
          {book.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {book.reviews ? `Reviews: ${book.reviews.length}` : ' ' }
        </Typography>
        
      </CardContent>
      <CardActions >
        <Button onClick={handleClick}  size="small">leave a review</Button>
      </CardActions>
    </Card>
  );
};

export default Book;
