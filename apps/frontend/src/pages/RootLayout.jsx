import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import UserMenu from "../components/UserMenu";

export default function RootLayout() {
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
