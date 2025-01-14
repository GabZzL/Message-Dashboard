import express from "express";
import User from "../models/UserModel.js";

const router = express.Router();

// get all the messages
router.get("/", async (req, res) => {
  const { user } = req.session;

  try {
    const messages = await User.aggregate([
      { $unwind: "$messages" }, // Deconstruct the messages array into individual documents
      {
        $addFields: {
          "messages.username": "$username",
          "messages.userId": "$_id",
        },
      }, // add the username field into each message
      {
        $sort: { "messages.date": -1 }, // Sort messages by descending order
      },
      {
        $project: {
          password: 0,
        },
      }, // Exclude unnecessary fields
      { $replaceRoot: { newRoot: "$messages" } }, // Replace root with the message object
    ]);

    res.json({ success: true, user, messages });
  } catch (error) {
    res.status(500).json({ success: false, error });
    // res.status(500).json({ success: false, error: "failed to fetch messages" });
  }
});

// get message by id
router.get("/message/:userId/:messageId", async (req, res) => {
  const { userId, messageId } = req.params;

  try {
    const message = await User.findOne(
      {
        _id: userId,
        "messages._id": messageId,
      }, // Match user and message ID
      { "messages.$": 1, username: 1 } // Include only the matched message and username
    );

    if (message) {
      res.json({ success: true, message });
    } else {
      res
        .status(404)
        .json({ success: false, error: "message does not exists" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "failed to fetch the message" });
  }
});

// create a message
router.post("/create/:userId", async (req, res) => {
  // const { user } = req.session;
  const { userId } = req.params;

  const user = true;

  if (!user) {
    res.status(403).send("Access not authorized");
  }

  try {
    const userProfile = await User.findById(userId);

    if (userProfile) {
      const messageData = {
        mood: req.body.mood,
        date: Date.now(),
        message: req.body.message,
      };

      const newMessage = await User.findByIdAndUpdate(
        userId,
        {
          $push: { messages: messageData },
        },
        { new: true, projection: { username: 1, messages: { $slice: -1 } } }
      );

      res.json({ success: true, message: newMessage });
    } else {
      res
        .status(404)
        .json({ success: false, error: "the user does not exists" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "failed to create the message" });
  }
});

// update a message by id
router.put("/update/:userId/:messageId", async (req, res) => {
  const { user } = req.session;
  const username = user.username;
  const { userId, messageId } = req.params;

  if (!user) {
    res.status(403).send("Access not authorized");
  }

  try {
    const userProfile = await User.findById(userId);

    if (username === userProfile.username) {
      const updatedMessage = await User.findOneAndUpdate(
        { _id: userId, "messages._id": messageId },
        {
          $set: {
            "messages.$.mood": req.body.mood,
            "messages.$.date": Date.now(),
            "messages.$.message": req.body.message,
          },
        },
        { new: true }
      );
      res.json({ success: true, message: updatedMessage });
    } else {
      res.status(403).send("Access not authorized");
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "failed to update the message" });
  }
});

// delete message by id
router.delete("/delete/:userId/:messageId", async (req, res) => {
  const { user } = req.session;
  const username = user.username;
  const { userId, messageId } = req.params;

  if (!user) {
    res.status(403).send("Access not authorized");
  }

  try {
    const mesagge = await User.findById(messageId);

    if (username === mesagge.username) {
      const updatedMessage = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { messages: { _id: messageId } },
        },
        { new: true }
      );
      res.json({ success: true, message: updatedMessage });
    } else {
      res.status(403).send("Access not authorized");
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "failed to update the message" });
  }
});

const messagesRoutes = router;
export default messagesRoutes;
