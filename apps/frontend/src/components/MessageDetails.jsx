import { useContext } from "react";
import { useSubmit, Link } from "react-router-dom";
import PageContent from "./PageContent";
import { AuthContext } from "../store/user-context";
import { formatDate } from "../utils/dateFormat";

import classes from "../styles/MessageDetails.module.css";

function MessageDetails({ messageInfo }) {
  const { user } = useContext(AuthContext);
  const submit = useSubmit();

  const { username, messages } = messageInfo;
  const { mood, date, message } = messages[0];

  let isUser = false;

  if (user) {
    isUser = user.username === username;
  }

  const formattedDate = formatDate(date);

  function handleDeleteMessage() {
    const procced = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!procced) {
      return;
    }

    submit(null, { method: "delete" });
  }

  return (
    <PageContent title={`By ${username}`}>
      <article className={classes.article}>
        <p className={classes.moodTag}>{mood}</p>
        <time className={classes.date}>{formattedDate}</time>
        <p className={classes.messageText}>{message}</p>
        {isUser && (
          <div className={classes.actions}>
            <Link className={classes.editLink} to="edit">
              Edit
            </Link>
            <button
              className={classes.deleteButton}
              onClick={handleDeleteMessage}
            >
              Delete
            </button>
          </div>
        )}
      </article>
    </PageContent>
  );
}

export default MessageDetails;
