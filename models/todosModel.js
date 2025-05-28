import mongoose from "mongoose";

export const TodoModel = mongoose.model("Todo", {
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
