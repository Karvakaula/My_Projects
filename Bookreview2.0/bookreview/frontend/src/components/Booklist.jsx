import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book.jsx";
import TextField from "@mui/material/TextField";

import "./Booklist.css";
const Booklist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [Books, setBooks] = useState([]);
  console.log(Books);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/books/books");
        const data = Array.from(response.data);

        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchBooks();
  }, []);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter books based on search query
  const filteredBooks = Books.filter((book) =>
    book.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  return (
    <section id="books">
      <h2 className="username">Welcome {localStorage.username}</h2>

      <div id="searchblock">
        <TextField
          label="Search books"
          color="primary"
          focused
          onChange={handleSearchInputChange}
        />
      </div>
      <div id="grid">
        {filteredBooks.map((book) => (
          <Book key={book._id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default Booklist;
