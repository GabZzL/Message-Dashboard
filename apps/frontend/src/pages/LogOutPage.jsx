import { redirect } from "react-router-dom";
import { logoutLoader } from "../utils/http";

export default function LogOutPage() {
  return <></>;
}

export async function loader() {
  await logoutLoader("post");

  return redirect("/");
}
