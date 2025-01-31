import { Form, useNavigate, redirect, useNavigation } from "react-router-dom";
import { manipulateMessage } from "../utils/http-messages";

export default function MessageForm({ text, method, event }) {
  const nativation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = nativation.state === "submitting";

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
          defaultValue={event?.message}
        ></textarea>
      </div>
      <div>
        <button
          type="button"
          onClick={handleCancelAction}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : text}
        </button>
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
