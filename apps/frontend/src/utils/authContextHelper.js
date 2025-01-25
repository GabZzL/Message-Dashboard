import { useContext } from "react";
import { AuthContext } from "../store/user-context";

let authContextRef;

export function setAuthContext(context) {
  authContextRef = context;
}

export function getAuthContext() {
  return authContextRef;
}

export function AuthContextInitializer({ children }) {
  const context = useContext(AuthContext);
  setAuthContext(context);
  
  return children;
}
