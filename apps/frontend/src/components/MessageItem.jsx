export default function MessageItem({ message }) {
  const { title, mood, username, date, _id: messageId, userId } = message;

  console.log(messageId, userId);

  return (
    <li>
      <div>
        <p>{username}</p>
        <p>{title}</p>
        <p>{mood}</p>
        <p>{date}</p>
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </li>
  );
}
