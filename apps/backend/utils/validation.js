import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(20, "Username must not exceed 20 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores."
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(24, "Password must not exceed 24 characters.")
    .regex(/[0-9]/, "Password must include at least one number.")
    .regex(
      /[!@#$%^&*]/,
      "Password must include at least one special character (!@#$%^&*)."
    ),

  messages: z.array(z.object({})).optional(),
});

const messageSchema = z.object({
  mood: z
    .enum(["happy", "sad", "neutral", "angry", "excited"])
    .default("neutral"),
  date: z
    .date()
    .default(() => new Date()),
  message: z.string().min(1, "Message cannot be empty").optional(),
});

class Validation {
  static validateUser(inputUserData) {
    const results = userSchema.safeParse(inputUserData);

    if (!results.success) {
      throw new Error(fromZodError(results.error));
    }
  }

  static validateMessage(inputMessageData) {
    const results = messageSchema.safeParse(inputMessageData);

    if (!results.success) {
      throw new Error(fromZodError(results.error));
    }
  }
}

export default Validation;
