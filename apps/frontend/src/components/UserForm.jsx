import { Form, redirect, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../utils/http-user";
import { getAuthContext } from "../utils/authContextHelper";

export default function UserForm({ text }) {
  const navigate = useNavigate();

  function handleCancelAction() {
    navigate("..");
  }

  return (
    <Form method="post">
      <p>
        <label htmlFor="username">User Name</label>
        <input
          id="username"
          type="text"
          name="username"
          minLength="3"
          maxLength="20"
          required
        />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          minLength="8"
          maxLength="24"
          required
        />
      </p>
      <div>
        <button type="button" onClick={handleCancelAction}>
          Cancel
        </button>
        <button>{text}</button>
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
