import bcrypt from "bcrypt";
import User from "./models/user.js";
import { SALT_ROUNDS } from "./config.js";

class Validation {
  static username(username) {
    if (typeof username !== "string") {
      throw new Error("username must be a string");
    }
    if (username.length < 3) {
      throw new Error("username must be at leats 3 characteres long");
    }
  }

  static password(password) {
    if (typeof password !== "string") {
      throw new Error("password must be a string");
    }

    if (password.length < 6) {
      throw new Error("password must be at leats 6 characteres long");
    }
  }
}

export class UserRepository {
  static async create({ username, password }) {
    try {
      // 1.- username and password validation
      Validation.username(username);
      Validation.password(password);

      //   2.- Check if the username already exists
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("username already exists");
      }

      // 3.- encrypt the password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // 4.- create the new user profile
      const userProfile = new User({
        username,
        password: hashedPassword,
        messages: [],
      });

      // 5.- save the new user profile
      const newUserProfile = await userProfile.save();

      // 6.- save the user profile without the password
      const { password: _, ...publicUser } = newUserProfile;

      return publicUser;
    } catch (error) {
      throw new Error("User register failed");
    }
  }

  static async login({ username, password }) {
    try {
      Validation.username(username);
      Validation.password(password);

      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("username does not exist");
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error("password is invalid");
      }

      const { password: _, ...publicUser } = user;

      return publicUser;
    } catch (error) {
      throw new Error("login the user failed");
    }
  }
}
