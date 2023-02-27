import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);

    if (connection.readyState === 1) {
      console.log("Connected to Database");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectDB;
