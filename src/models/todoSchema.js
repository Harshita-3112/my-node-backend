const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from both ends of a string
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false, // Default value for new tasks
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
});

module.exports = mongoose.model("todo", todoSchema);
