import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const TodoModel =
  mongoose.models.Todo || mongoose.model("Todo", todoSchema);
