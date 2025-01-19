import { useRouteLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import MessageDetails from "../components/MessageDetails";

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

async function loadMessage(userId, messageId) {
  const res = await fetch(
    `http://localhost:3000/messages/${userId}/${messageId}`
  );

  if (!res) {
    throw new Response(
      JSON.stringify(
        { message: "Could not fetch the message." },
        { status: 500 }
      )
    );
  } else {
    const data = await res.json();
    return data.message;
  }
}

export async function loader({ params }) {
  const userId = params.userId;
  const messageId = params.messageId;

  return { message: loadMessage(userId, messageId) };
}
