import MessageItem from "./MessageItem";

export default function MessagesList({ messages }) {
  console.log(messages);

  return (
    <ul>
      {messages.map((message) => (
        <MessageItem key={message._id} message={message} />
      ))}
    </ul>
  );
}
