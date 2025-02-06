import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/user-context";
import { formatDate } from "../utils/dateFormat";

import classes from "../styles/MessageItem.module.css";

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
    <li className={classes.messageCard}>
      <div className={classes.metaData}>
        <p className={classes.userName}>{username}</p>
        <p className={classes.sentiment}>{mood}</p>
        <p>{content}</p>
        <p className={classes.timestamp}>{formattedDate}</p>
      </div>
      <div>
        {isUser && (
          <Link to={`message/${userId}/${messageId}`}>See Details</Link>
        )}
      </div>
    </li>
  );
}
