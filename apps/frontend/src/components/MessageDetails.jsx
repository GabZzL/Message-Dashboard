import PageContent from "./PageContent";

export default function MessageDetails({ messageInfo }) {
  const { username, messages, _id: userId } = messageInfo;
  const { mood, date, message, _id: messageId } = messages[0];

  return (
    <PageContent title={username}>
      <article>
        <p>{mood}</p>
        <time>{date}</time>
        <p>{message}</p>
      </article>
    </PageContent>
  );
}
