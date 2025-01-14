import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
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

console.log(PORT);
console.log(SECRET_JWT_KEY);

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY); // { _id, username}
    req.session.user = data;
  } catch {}

  next(); // follow to the next route or middleware
});

app.use("/auth", authenticationRoutes);
app.use("/messages", messagesRoutes);

// app.get("/", (req, res) => {
//   const { user } = req.session;
//   res.json({ route: "/", user });
// });

// app.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const id = await UserRepository.create({ username, password });
//     res.send({ id });
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await UserRepository.login({ username, password });
//     const token = jwt.sign(
//       { id: user._id, username: user.username },
//       SECRET_JWT_KEY,
//       { expiresIn: "1h" }
//     );

//     res
//       .cookie("access-token", token, {
//         httpOnly: true, // it can only be access in the server
//         secure: process.env.NODE_ENV === "production", // htts only
//         sameSite: "strict", // the cookie only can be access on the same domain
//         maxAge: 1000 * 60 * 60, // cookie valid time (ms)
//       })
//       .send({ user, token });
//   } catch (error) {
//     res.status(401).send(error.message);
//   }
// });

// app.post("/logout", (req, res) => {
//   res.clearCookie("access_token").json({ message: "logout successfully" });
// });

// app.get("/messages", (req, res) => {
//   const { user } = req.session;

//   if (!user) {
//     res.status(403).send("Access not authorized");
//   }

//   res.json({ route: "mesagges", user });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
