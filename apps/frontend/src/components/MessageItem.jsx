import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/user-context";
import { formatDate } from "../utils/dateFormat";

export default function MessageItem({ message }) {
  const {
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

  const formattedDate = formatDate(date);

  return (
    <li>
      <div>
        <p>{username}</p>
        <p>{mood}</p>
        <p>{content}</p>
        <p>{formattedDate}</p>
      </div>
      <div>
        {isUser && (
          <Link to={`message/${userId}/${messageId}`}>See Details</Link>
        )}
      </div>
    </li>
  );
}
