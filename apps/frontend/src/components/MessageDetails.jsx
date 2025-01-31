import { useContext } from "react";
import { useSubmit, Link } from "react-router-dom";
import PageContent from "./PageContent";
import { AuthContext } from "../store/user-context";
import { formatDate } from "../utils/dateFormat";

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

  console.log("this is the user", user);

  return (
    <PageContent title={username}>
      <article>
        <p>{mood}</p>
        <time>{formattedDate}</time>
        <p>{message}</p>
        {isUser && (
          <div>
            <Link to="edit">Edit</Link>
            <button onClick={handleDeleteMessage}>Delete</button>
          </div>
        )}
      </article>
    </PageContent>
  );
}

export default MessageDetails;
