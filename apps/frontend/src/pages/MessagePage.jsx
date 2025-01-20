import { useRouteLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import MessageDetails from "../components/MessageDetails";
import { fetchSingleMessage } from "../utils/http";

export default function MessagePage() {
  const { message } = useRouteLoaderData("message-details");

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={message}>
        {(loadedMessage) => <MessageDetails messageInfo={loadedMessage} />}
      </Await>
    </Suspense>
  );
}

export async function loader({ params }) {
  const { userId, messageId } = params;
  const message = await fetchSingleMessage(userId, messageId);

  return { message };
}
