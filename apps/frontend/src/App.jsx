import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage, { loader as messagesLoader } from "./pages/HomePage";
import MessagePage, { loader as messageLoader } from "./pages/MessagePage";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage />, loader: messagesLoader },
      { path: "register", children: [{ index: true, element: <p>Form</p> }] },
      {
        path: "message/:userId/:messageId",
        id: "message-details",
        loader: messageLoader,
        children: [{ index: true, element: <MessagePage /> }],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
