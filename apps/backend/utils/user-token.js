import jwt from "jsonwebtoken";

const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

export class UserToken {
  static createToken(id, username) {
    const token = jwt.sign({ id, username }, SECRET_JWT_KEY, {
      expiresIn: "1h",
    });

    return token;
  }
}
