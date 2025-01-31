import UserForm from "../components/UserForm";
import PageContent from "../components/PageContent";

export default function LoginUserPage() {
  return (
    <PageContent title="Login">
      <UserForm text="Login" />
    </PageContent>
  );
}
