import { Link } from "react-router-dom";

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
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </li>
  );
}
