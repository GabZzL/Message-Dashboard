import mongoose from "mongoose";

const connectDB = async () => {
  const con = await mongoose.connect(process.env.MONGO_URL);
  console.log(`MongoDB connected: ${con.connection.host}`);
};

mongoose.set("strictQuery", true);

export default connectDB;
