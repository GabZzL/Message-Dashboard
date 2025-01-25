import { useContext, useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import UserMenu from "../components/UserMenu";
import { fetchUser } from "../utils/http-user";
import { AuthContext } from "../store/user-context";

export default function RootLayout() {
  const user = useLoaderData();
  const { authenticateUser } = useContext(AuthContext);

  useEffect(() => {
    if (user) authenticateUser(user);
  }, [user, authenticateUser]);

  return (
    <>
      <MainNavigation />
      <UserMenu />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export async function loader() {
  const data = await fetchUser();
  const user = data.user;

  console.log(user);

  return user;
}
