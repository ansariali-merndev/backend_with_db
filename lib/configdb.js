import mongoose from "mongoose";

const URI = process.env.MONGODBURI;

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already Conneccted");
      return;
    }
    await mongoose.connect(URI);
    console.log("db connect successfully");
  } catch (err) {
    console.log(err);
  }
};
