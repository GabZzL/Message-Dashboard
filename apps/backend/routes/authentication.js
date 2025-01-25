import express from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../utils/user-repository.js";

const router = express.Router();

const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.create({
      username,
      password,
      messages: [],
    });

    res.json({ success: true, user });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_JWT_KEY,
      { expiresIn: "1h" }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true, // it can only be access in the server
        secure: process.env.NODE_ENV === "production", // htts only
        sameSite: "strict", // the cookie only can be access on the same domain
        maxAge: 1000 * 60 * 60, // cookie valid time (ms)
      })
      .json({ success: true, user });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.post("/logout", (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(400).send("No active session found");
  }

  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(204).send();
});

router.get("/me", (req, res) => {
  const { user } = req.session;

  if (user) {
    res.json({ success: true, user });
  }

  res.json({ success: false });
});

const authenticationRoutes = router;
export default authenticationRoutes;
