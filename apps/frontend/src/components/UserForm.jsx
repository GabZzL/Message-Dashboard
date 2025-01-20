import { Form, redirect, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/http";

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

export async function action({ request }) {
  const method = request.method;
  const data = await request.formData();

  const messageData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const user = await registerUser(method, messageData);
  console.log(user);

  return redirect("/");
}
