import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import Validation from "./validation.js";

export class UserRepository {
  static async create({ username, password, messages }) {
    const userInputData = { username, password, messages };

    try {
      // 1.- username and password validation
      Validation.validateUser(userInputData);

      // 2.- Check if the username already exists
      const user = await User.findOne({ username });

      if (user) {
        throw new Error("username already exists");
      }

      // 3.- encrypt the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 4.- create the new user profile
      const userProfile = new User({
        ...userInputData,
        password: hashedPassword,
      });

      // 5.- save the new user profile
      const newUserProfile = await userProfile.save();

      // 6.- save the user profile without the password
      const publicUser = {
        id: newUserProfile._id,
        username: newUserProfile.username,
      };

      return publicUser;
    } catch (error) {
      throw new Error(error || "register the user failed");
    }
  }

  static async login({ username, password, messages }) {
    const userInputData = { username, password, messages };

    try {
      Validation.validateUser(userInputData);

      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("username does not exist");
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error("password is invalid");
      }

      const publicUser = user._doc.username;

      return publicUser;
    } catch (error) {
      throw new Error(error || "login the user failed");
    }
  }
}
