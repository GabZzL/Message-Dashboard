import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../store/user-context";

export default function MainNavigation() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <header>
      <h1>Dashboard Message</h1>
      <nav>
        <ul>
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="register">Register</NavLink>
              </li>
              <li>
                <NavLink to="login">Log In</NavLink>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <NavLink to="Logout">Log Out</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
