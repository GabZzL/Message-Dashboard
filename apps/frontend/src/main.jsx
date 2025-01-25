import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthContextProvider from "./store/user-context.jsx";
import { AuthContextInitializer } from "./utils/authContextHelper.js";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <AuthContextInitializer>
        <App />
      </AuthContextInitializer>
    </AuthContextProvider>
  </StrictMode>
);
