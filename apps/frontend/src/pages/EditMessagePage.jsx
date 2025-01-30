import { useRouteLoaderData } from "react-router-dom";
import MessageForm from "../components/MessageForm";

export default function EditMessagePage() {
  const data = useRouteLoaderData("message-details");
  const { messages } = data.message;
  const [message] = messages;

  return <MessageForm text="Update" method="put" event={message} />;
}
