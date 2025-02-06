import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import PageContent from "../components/PageContent";
import MessagesList from "../components/MessageList";
import { fetchMessages } from "../utils/http-messages";

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

export async function loader() {
  const messages = await fetchMessages();
  return { messages };
}
