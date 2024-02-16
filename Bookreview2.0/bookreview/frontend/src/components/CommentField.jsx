import React, { useState, useEffect } from "react";
import "./CommentField.css";
const CommentField = () => {
  return (
    <div id="container">
      <div id="AddForm">
        <input
          type="text"
          placeholder="Title"

          /*onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}*/
        />
        <textarea
          placeholder="Description"
          value=""
          /*onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}*/
        />
        <div className="rating"></div>
        <button id="addBtn" onClick="{handleAddReview}">
          Add review
        </button>
      </div>
    </div>
  );
};

export default CommentField;
