import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/user-context";

export default function MessageItem({ message }) {
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
            <button>Edit</button>
            <button>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}
