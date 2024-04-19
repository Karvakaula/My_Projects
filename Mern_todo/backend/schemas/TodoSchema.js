const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  id: String,
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  completed: { type: Boolean, required: true },
  position: { type: Number, required: true },
});

const Todo = mongoose.model("Todo", TodoSchema, "Todos");

module.exports = Todo;
