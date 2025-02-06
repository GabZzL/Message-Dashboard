import MessageItem from "./MessageItem";

import classes from "../styles/MessageList.module.css";

export default function MessagesList({ messages }) {
  console.log(messages);

  return (
    <ul className={classes.messageList}>
      {messages.map((message) => (
        <MessageItem key={message._id} message={message} />
      ))}
    </ul>
  );
}
