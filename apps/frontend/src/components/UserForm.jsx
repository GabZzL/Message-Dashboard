import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";
import { registerUser, loginUser } from "../utils/http-user";
import { getAuthContext } from "../utils/authContextHelper";
import Button from "../UI/Button";

import classes from "../styles/UserForm.module.css";

export default function UserForm({ text }) {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  function handleCancelAction() {
    navigate("..");
  }

  return (
    <Form className={classes.authForm} method="post">
      <div className={classes.formGroup}>
        <label className={classes.label} htmlFor="username">
          User Name
        </label>
        <input
          className={classes.input}
          id="username"
          type="text"
          name="username"
          minLength="3"
          maxLength="20"
          required
        />
      </div>
      <div className={classes.formGroup}>
        <label className={classes.label} htmlFor="password">
          Password
        </label>
        <input
          className={classes.input}
          id="password"
          type="password"
          name="password"
          minLength="8"
          maxLength="24"
          required
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          type="button"
          buttonType="secondary"
          onClick={handleCancelAction}
          isDisabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button buttonType="primary" isDisabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : text}
        </Button>
      </div>
    </Form>
  );
}

export async function registerAction({ request }) {
  const method = request.method;
  const data = await request.formData();

  const userData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const user = await registerUser(method, userData);

  console.log("register user", user);

  if (user) {
    const { authenticateUser } = getAuthContext();
    authenticateUser(user);
  }

  return redirect("/");
}

export async function loginAction({ request }) {
  const method = request.method;
  const data = await request.formData();

  const userData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const user = await loginUser(method, userData);

  if (user) {
    const { authenticateUser } = getAuthContext();
    authenticateUser(user);
  }

  return redirect("/");
}
