import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import authenticationRoutes from "./routes/authentication.js";
import messagesRoutes from "./routes/messages.js";

const app = express();
// connect to the database
connectDB();

// enviroment variables
const PORT = process.env.PORT;
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

// middlewares
app.use(express.json());
app.use(cookieParser());
// cookies
app.use((req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY); // { _id, username}
    req.session.user = data;
  } catch {}

  next(); // follow to the next route or middleware
});
// cors
// allow all origins (less secure for production)
app.use(cors());

app.use("/auth", authenticationRoutes);
app.use("/messages", messagesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
