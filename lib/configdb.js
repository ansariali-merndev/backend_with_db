import mongoose from "mongoose";

const URI = process.env.MONGODBURI;

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(URI);
    console.log("db connect successfully");
  } catch (err) {
    console.log(err);
  }
};
