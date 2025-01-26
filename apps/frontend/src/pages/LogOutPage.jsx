import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { logoutLoader } from "../utils/http-user";
import { AuthContext } from "../store/user-context";

export default function LogOutPage() {
  const { logoutUser } = useContext(AuthContext);

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Navigate to="/" replace />;
}

export async function loader() {
  await logoutLoader("post");
}
