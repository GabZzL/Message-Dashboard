import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import PageContent from "../components/PageContent";
import MessagesList from "../components/MessageList";

export default function HomePage() {
  const { messages } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={messages}>
        {(loadedMessages) => (
          <PageContent title="Messages">
            <MessagesList messages={loadedMessages} />
          </PageContent>
        )}
      </Await>
    </Suspense>
  );
}

async function loadMessages() {
  const res = await fetch("http://localhost:3000/messages");

  if (!res.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not fetch messages." }, { status: 500 })
    );
  } else {
    const data = await res.json();
    return data.messages;
  }
}

export function loader() {
  return { messages: loadMessages() };
}
