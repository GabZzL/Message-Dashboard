import express from "express";
import User from "../models/UserModel.js";
import Validation from "../utils/validation.js";

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
router.get("/:userId/:messageId", async (req, res) => {
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
    res.status(500).json({
      success: false,
      error: error.message || "failed to fetch the message",
    });
  }
});

// create a message
router.post("/create/:userId", async (req, res) => {
  const { user } = req.session;
  const { userId } = req.params;

  if (!user) {
    res.status(403).send("Access not authorized");
  }

  try {
    const userProfile = await User.findById(userId);

    if (userProfile) {
      const messageData = {
        mood: req.body.mood,
        date: new Date(),
        message: req.body.message,
      };

      // validate the message data
      Validation.validateMessage(messageData);

      const response = await User.findByIdAndUpdate(
        userId,
        {
          $push: { messages: messageData },
        },
        { new: true, projection: { username: 1, messages: { $slice: -1 } } }
      );

      res.json({ success: true, res: response });
    } else {
      res
        .status(404)
        .json({ success: false, error: "the user does not exists" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "failed to create the message",
    });
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
      const messageData = {
        mood: req.body.mood,
        date: new Date(),
        message: req.body.message,
      };

      // validate the message data
      Validation.validateMessage(messageData);

      const response = await User.findOneAndUpdate(
        { _id: userId, "messages._id": messageId },
        {
          $set: {
            "messages.$.mood": messageData.mood,
            "messages.$.date": Date.now(),
            "messages.$.message": messageData.message,
          },
        },
        { new: true, projection: { username: 1, messages: 1 } }
      );

      // get the updated message
      const updatedMessage = response.messages.find(
        (msg) => msg._id.toString() === messageId
      );

      res.json({
        success: true,
        res: {
          _id: response._id,
          username: response.username,
          message: updatedMessage,
        },
      });
    } else {
      res.status(403).send("Access not authorized");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "failed to update the message",
    });
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
    const user = await User.findById(userId);

    if (username === user.username) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { messages: { _id: messageId } },
        },
        { new: true }
      );
      res.json({ success: true });
    } else {
      res.status(403).send("Access not authorized");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "failed to delete the message",
    });
  }
});

const messagesRoutes = router;
export default messagesRoutes;
