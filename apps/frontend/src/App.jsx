import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage, { loader as messagesLoader } from "./pages/HomePage";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [{ index: true, element: <HomePage />, loader: messagesLoader }],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
