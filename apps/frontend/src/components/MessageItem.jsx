import { useContext } from "react";
import { Link, useSubmit } from "react-router-dom";
import { AuthContext } from "../store/user-context";

export default function MessageItem({ message }) {
  const submit = useSubmit();

  const {
    title,
    mood,
    username,
    date,
    message: content,
    _id: messageId,
    userId,
  } = message;

  const { user } = useContext(AuthContext);
  let isUser = false;

  if (user) {
    isUser = user.username === username;
  }

  function handleDeleteMessage() {
    const procced = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!procced) {
      return;
    }

    submit(
      { userId, messageId },
      { method: "delete", action: "/", encType: "application/json" }
    );
  }

  return (
    <li>
      <div>
        <p>{username}</p>
        <p>{mood}</p>
        <p>{content}</p>
        <p>{date}</p>
      </div>
      <div>
        <Link to={`message/${userId}/${messageId}`}>See All</Link>
        {isUser && (
          <>
            <Link to={`message/${userId}/${messageId}/edit`}>Edit</Link>
            <button onClick={handleDeleteMessage}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}
