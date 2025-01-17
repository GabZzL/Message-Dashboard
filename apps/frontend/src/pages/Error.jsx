import PageContent from "../components/PageContent";

export default function Error() {
  let title = "An error occurred!";
  let message = "Something went wrong!";

  <PageContent title={title}>
    <p>{message}</p>
  </PageContent>;
}
