import { useLoaderData } from "react-router-dom";
import MessageForm from "../components/MessageForm";

export default function EditMessagePage() {
  const { message } = useLoaderData("message-details");

  return <MessageForm text="Update" method="put" event={message} />;
}
