import { useContext, useEffect, Suspense } from "react";
import { Outlet, useLoaderData, Await } from "react-router-dom";

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
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={user}>
        {() => (
          <>
            <MainNavigation />
            <UserMenu />
            <main>
              <Outlet />
            </main>
          </>
        )}
      </Await>
    </Suspense>
  );
}

export async function loader() {
  const data = await fetchUser();
  const user = data.user;

  return user;
}
