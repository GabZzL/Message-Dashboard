import { Form, useNavigate, redirect } from "react-router-dom";
import { manipulateMessage } from "../utils/http-messages";

export default function MessageForm({ text, method, event }) {
  const navigate = useNavigate();

  function handleCancelAction() {
    navigate("..");
  }

  return (
    <Form method={method}>
      <div>
        <label htmlFor="mood">Select a Mood:</label>
        <select name="mood" id="mood">
          <option value="happy">happy</option>
          <option value="sad">sad</option>
          <option value="neutral">neutral</option>
          <option value="angry">angry</option>
          <option value="excited">excited</option>
        </select>
        <label htmlFor="message">Message: </label>
        <textarea
          name="message"
          id="message"
          maxLength="140"
          rows="3"
          placeholder="write your text..."
          required
          defaultValue={event ? event.messages[0].message : ""}
        ></textarea>
      </div>
      <div>
        <button type="button" onClick={handleCancelAction}>
          Cancel
        </button>
        <button>{text}</button>
      </div>
    </Form>
  );
}

export async function manipulateMessageAction({ request, params }) {
  const method = request.method;
  const userId = params.userId;
  const data = await request.formData();

  const userData = {
    mood: data.get("mood"),
    message: data.get("message"),
  };

  if (method === "put") {
    const messageId = params.messageId;
    await manipulateMessage(method, userId, messageId, userData);
  }

  await manipulateMessage(method, userId, null, userData);

  return redirect("/");
}
