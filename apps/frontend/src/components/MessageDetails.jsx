import PageContent from "./PageContent";

export default function MessageDetails({ messageInfo }) {
  const { username, messages } = messageInfo;
  const { mood, date, message } = messages[0];

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
