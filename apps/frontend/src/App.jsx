import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import RegisterUserPage from "./pages/RegisterUserPage";
import LoginUserPage from "./pages/LoginUserPage";
import { loader as userLoader } from "./pages/RootLayout";
import HomePage, { loader as messagesLoader } from "./pages/HomePage";
import MessagePage, {
  loader as messageLoader,
  action as deleteMessageAction,
} from "./pages/MessagePage";
import LogOutPage, { loader as logoutLoader } from "./pages/LogOutPage";
import { registerAction, loginAction } from "./components/UserForm";
import NewMessagePage from "./pages/NewMessagePage";
import { manipulateMessageAction } from "./components/MessageForm";
import EditMessagePage from "./pages/EditMessagePage";
import ProtectedRoute from "./pages/ProtectecRoute";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    id: "main-page",
    element: <RootLayout />,
    loader: userLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: messagesLoader,
      },
      {
        path: "register",
        children: [
          {
            index: true,
            element: <RegisterUserPage />,
            action: registerAction,
          },
        ],
      },
      {
        path: "login",
        children: [
          { index: true, element: <LoginUserPage />, action: loginAction },
        ],
      },
      {
        path: "logout",
        children: [
          { index: true, element: <LogOutPage />, loader: logoutLoader },
        ],
      },
      {
        path: "message/:userId/:messageId",
        id: "message-details",
        element: <ProtectedRoute />,
        loader: messageLoader,
        children: [
          {
            index: true,
            element: <MessagePage />,
            action: deleteMessageAction,
          },
          {
            path: "edit",
            element: <EditMessagePage />,
            action: manipulateMessageAction,
          },
        ],
      },
      {
        path: "new-message/:userId",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <NewMessagePage />,
            action: manipulateMessageAction,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
