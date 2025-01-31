import express from "express";
import { UserRepository } from "../utils/user-repository.js";
import { UserToken } from "../utils/user-token.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.create({
      username,
      password,
      messages: [],
    });

    const token = UserToken.createToken(user.id, user.username);

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .json({ sucess: true, user });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password });

    const userData = {
      id: user.id.toString(),
      username: user.username,
    };

    const token = UserToken.createToken(userData.id, userData.username);

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
  } else {
    res.json({ success: false });
  }
});

const authenticationRoutes = router;
export default authenticationRoutes;
