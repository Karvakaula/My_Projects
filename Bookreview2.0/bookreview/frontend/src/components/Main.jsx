import React, { useState } from "react";
import "./main.css";
import BookList from "./Booklist";
import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Reviewlist from "./Reviewlist";
import Profile from "./usermenus/Profile";
const Main = () => {
  return (
    <main className="main">
      <Header />
      <Routes>
        <Route exact path="/" element={<BookList />} />
        <Route path="/reviews" element={<Reviewlist />} />
        <Route path="/profile" element={<Profile/>}/>

      </Routes>
    </main>
  );
};

export default Main;
