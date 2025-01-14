import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  messages: [
    {
      mood: {
        type: String,
        enum: ["happy", "sad", "neutral", "angry", "excited"],
        default: "neutral",
      },
      date: {
        type: Date,
        default: Date.now,
      },
      message: {
        type: String,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
