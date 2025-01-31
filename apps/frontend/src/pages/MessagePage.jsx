import { useRouteLoaderData, Await, redirect } from "react-router-dom";
import { Suspense } from "react";

import MessageDetails from "../components/MessageDetails";
import { fetchSingleMessage, deleteMessage } from "../utils/http-messages";

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

export async function action({ request, params }) {
  const { userId, messageId } = params;
  await deleteMessage(userId, messageId);

  return redirect("/");
}
