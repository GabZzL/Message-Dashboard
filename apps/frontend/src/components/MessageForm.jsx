import { Form, useNavigate, redirect, useNavigation } from "react-router-dom";
import { manipulateMessage } from "../utils/http-messages";
import Button from "../UI/Button";

import classes from "../styles/MessageForm.module.css";

export default function MessageForm({ text, method, event }) {
  const nativation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = nativation.state === "submitting";

  function handleCancelAction() {
    navigate("..");
  }

  return (
    <Form className={classes.formGroup} method={method}>
      <div>
        <label className={classes.label} htmlFor="mood">
          Select a Mood:
        </label>
        <select className={classes.select} name="mood" id="mood">
          <option value="happy">happy</option>
          <option value="sad">sad</option>
          <option value="neutral">neutral</option>
          <option value="angry">angry</option>
          <option value="excited">excited</option>
        </select>
      </div>
      <div>
        <label className={classes.label} htmlFor="message">
          Message:{" "}
        </label>
        <textarea
          className={classes.textarea}
          name="message"
          id="message"
          maxLength="140"
          rows="3"
          placeholder="write your text..."
          required
          defaultValue={event?.message}
        ></textarea>
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
          {isSubmitting ? "submitting" : text}
        </Button>
      </div>
    </Form>
  );
}

export async function manipulateMessageAction({ request, params }) {
  const method = request.method.toLowerCase();
  const userId = params.userId;
  const data = await request.formData();

  const userData = {
    mood: data.get("mood"),
    message: data.get("message"),
  };

  let url = `http://localhost:3000/messages/create/${userId}`;

  if (method === "put") {
    const messageId = params.messageId;

    url = `http://localhost:3000/messages/update/${userId}/${messageId}`;
  }

  await manipulateMessage(method, url, userData);

  return redirect("/");
}
