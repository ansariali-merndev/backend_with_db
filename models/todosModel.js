import mongoose, { Schema } from "mongoose";

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const TodoModel =
  mongoose.models.Todo || mongoose.model("Todo", todoSchema);
