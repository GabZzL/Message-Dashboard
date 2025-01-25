import { createContext, useReducer, useCallback, useMemo } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  authenticateUser: () => {},
  logoutUser: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "AUTHENTICATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

export default function AuthContextProvider({ children }) {
  const [userState, authDispatch] = useReducer(authReducer, {
    user: null,
  });

  const handleAuthenticateUser = useCallback((user) => {
    authDispatch({ type: "AUTHENTICATE_USER", payload: user });
  }, []);

  const handleLogOutUser = useCallback(() => {
    authDispatch({ type: "LOGOUT_USER" });
  }, []);

  const ctxValue = useMemo(
    () => ({
      user: userState.user,
      isAuthenticated: !!userState.user,
      authenticateUser: handleAuthenticateUser,
      logoutUser: handleLogOutUser,
    }),
    [userState.user, handleAuthenticateUser, handleLogOutUser]
  );

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}
