import { Form } from "react-router-dom";

export default function UserForm() {
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
    </Form>
  );
}
