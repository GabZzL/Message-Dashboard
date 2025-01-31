import { useRouteLoaderData } from "react-router-dom";
import MessageForm from "../components/MessageForm";
import PageContent from "../components/PageContent";

export default function EditMessagePage() {
  const data = useRouteLoaderData("message-details");
  const { messages } = data.message;
  const [message] = messages;

  return (
    <PageContent title="Edit Message">
      <MessageForm text="Update" method="put" event={message} />
    </PageContent>
  );
}
