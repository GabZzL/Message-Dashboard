import MessageForm from "../components/MessageForm";
import PageContent from "../components/PageContent";

export default function NewMessagePage() {
  return (
    <PageContent title="New Message">
      <MessageForm text="Create" method="post" />;
    </PageContent>
  );
}
